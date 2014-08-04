class Scroll

	constructor: (options) ->

		{@direction, @transformOrigin} = options

		@viewport = $('.scroll-viewport')
		@overview = $('.scroll-overview')

		@scrollbarContainer = $('.scrollbar-container')
		@scrollbarTrack = @scrollbarContainer.children('.scrollbar-track')
		@scrollbarThumb = @scrollbarTrack.children('.scrollbar-thumb')

		@pos = {
			real: 0
			calc: 0
			limit: 0
			perc: 0
			prev: 0
		}
		@scale = {
			real: 1
			calc: 1
			prev: 1
		}

		@scrollbar = {
			real: 0
			calc: 0
			perc: 0
			trackSize: if @direction == 'horizontal' then @scrollbarTrack.width() else @scrollbarTrack.height()
			thumbSize: if @direction == 'horizontal' then @scrollbarThumb.width() else @scrollbarThumb.height()
		}

		@overviewSize = 1

		@isMouseDown = false
		@isScrollbar = false
		@isMouseMoving = false

		@ease = 0.7
		@i = 0
		@prevPos = @movePos = @initPos = 0


	mouseDown: (e) =>

		target = $(e.target)
		klass = target.attr('class') || ''
		pagePos = if @direction == 'horizontal' then e.pageX else e.pageY

		if klass.match('scrollbar')
			@isScrollbar = true
			@initScrollY = (@pos.perc * (@scrollbar.trackSize - @scrollbar.thumbSize))
			@initPos = pagePos - @initScrollY
		else
			@isScrollbar = false
			@ease = 1
			@initScrollY = @pos.perc * @pos.limit
			@initPos = pagePos

		@isMouseDown = true


	mouseMove: (e) =>

		if @isMouseDown

			pagePos = if @direction == 'horizontal' then e.pageX else e.pageY

			@isMouseMoving = true
			if @isScrollbar == true
				@movePos = pagePos - @initPos
				@pos.perc = @movePos / (@scrollbar.trackSize - @scrollbar.thumbSize)
			else
				@prevPos = @movePos
				@movePos = - @initScrollY + pagePos - @initPos
				@pos.perc = - @movePos / @pos.limit
			

	mouseUp: () =>

		if @isMouseMoving == true && @isScrollbar == false
			@pos.perc = -(@movePos + (@movePos - @prevPos) * 10) / @pos.limit

		@ease = 0.1
		@isScrollbar = @isMouseDown = @isMouseMoving = false




	mouseWheel: (deltaX, deltaY) ->

		if @direction == 'horizontal'
			if Math.max(Math.abs(deltaX), Math.abs(deltaY)) == Math.abs(deltaX)
				scrollInc = deltaX
			else
				scrollInc = deltaY
		else
			scrollInc = deltaY

		#@pos.perc += deltaY / 20000
		initScrollY = @pos.perc * @pos.limit
		movePos = - initScrollY - scrollInc
		@pos.perc = - movePos / @pos.limit


	keyDown: (e) =>

		###
			32: space
			40: down
			38: up
			16: shift
			91: cmd
			18: alt
		###

		initScrollY = @pos.perc * @pos.limit

		movePos = - initScrollY
		spaceInc = if @direction == 'horizontal' then W.ww else W.wh

		switch (e.keyCode)
			when 32 then movePos -= spaceInc
			when 40 then movePos -= 40
			when 38 then movePos += 40 

		@pos.perc = - movePos / @pos.limit


	goTo: (pos) =>

		@pos.perc = pos / @pos.limit


	setScale: (scale) =>

		@scale.real = scale

	setTransformOriginX: (val) =>

		@transformOrigin.x = val
		Normalize.transformOrigin(@overview[0], @transformOrigin.x + ' ' + @transformOrigin.y)


	setTransformOriginY: (val) =>

		@transformOrigin.y = val
		Normalize.transformOrigin(@overview[0], @transformOrigin.x + ' ' + @transformOrigin.y)


	resize: () ->

		@overviewSize = if @direction == 'horizontal' then @overview.outerWidth() else @overview.outerHeight()
		@viewportSize = if @direction == 'horizontal' then @viewport.outerWidth() else @viewport.outerHeight()
		@pos.limit = @overviewSize - @viewportSize

		contChange = if @direction == 'horizontal' then {'width': W.ww} else {'height': W.wh}
		@scrollbarContainer.css(contChange)
		@scrollbar.trackSize = if @direction == 'horizontal' then @scrollbarTrack.width() else @scrollbarTrack.height()


	update: () ->

		if @pos.perc < 0
			@pos.perc = 0
		else if @pos.perc > 1
			@pos.perc = 1

		@pos.prev = @pos.calc
		@pos.real = @pos.perc * @pos.limit
		@pos.calc += (@pos.real - @pos.calc) * @ease

		@scale.prev = @scale.calc
		@scale.calc += (@scale.real - @scale.calc) * @ease

		@transformOrigin.x = (@pos.calc + W.ww * 0.5) + 'px'

		if @pos.prev != @pos.calc || @scale.prev != @scale.calc
			if @direction == 'horizontal'
				Normalize.transform(@overview[0], 'translate3d(' +  (-@pos.calc) + 'px, 0, 0) scale(' + @scale.calc + ')')
				Normalize.transform(@scrollbarThumb[0], 'translate3d(' + (@pos.perc * (@scrollbar.trackSize - @scrollbar.thumbSize)) + 'px, 0, 0)')
				@transformOrigin.x = (@pos.calc + W.ww * 0.5) + 'px'
			else
				Normalize.transform(@overview[0], 'translate3d(0, ' +  (-@pos.calc) + 'px, 0) scale(' + @scale.calc + ')')
				Normalize.transform(@scrollbarThumb[0], 'translate3d(0, ' + (@pos.perc * (@scrollbar.trackSize - @scrollbar.thumbSize)) + 'px, 0)')
				@transformOrigin.x = (@pos.calc + W.wh * 0.5) + 'px'

			Normalize.transformOrigin(@overview[0], @transformOrigin.x + ' ' + @transformOrigin.y)









