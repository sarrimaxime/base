class App

	constructor: () ->

		console.log '%c# --------------------o Running Desktop', 'background: #42e34d; color: #F0F0F0;'

		W.init()

		@router = new Router()
		#@transitions = new Transitions()

		@_initEvents()
		@_initSection()



	# -----------------------------------------------------------------------------o private

	_initEvents: () =>

		W.body
			.on(Event.MOUSEDOWN, @_onMouseDown)
			.on(Event.MOUSEMOVE, @_onMouseMove)
			.on(Event.MOUSEUP, @_onMouseUp)
			.on(Event.WHEEL, @_onMouseWheel)
			.on(Event.KEYDOWN, @_onKeyDown);

		W.window.on('resize', @_onResize)


	_initSection: () =>

		@_destroySection()

		@sectionId = @router.pages.current

		switch @sectionId

			when 'home' then @section = new Home()
			when 'journal' then @section = new Journal()

		@_onResize()


	_destroySection: () ->

		if @section && @section.destroy
			@section.destroy()


	# -----------------------------------------------------------------------------o listeners

	_onMouseDown: (event) =>

		e = if event.type == 'touchstart' then event.originalEvent.touches[0] else event

		if event.which in [0, 1]
			if @section && @section.mouseDown
				@section.mouseDown(e)

		event.preventDefault()

		
	_onMouseMove: (event) =>

		e = if event.type == 'touchmove' then event.originalEvent.touches[0] else event

		if event.which in [0, 1]
			if @section && @section.mouseMove
				@section.mouseMove(e)

		event.preventDefault()


	_onMouseUp: (event) =>
		
		e = if event.type == 'touchend' then event.originalEvent.touches[0] else event

		if event.which in [0, 1]
			if @section && @section.mouseUp
				@section.mouseUp(e)

		event.preventDefault()


	_onMouseWheel: (e) =>

		deltaY = e.originalEvent.deltaY || - e.originalEvent.wheelDeltaY || e.deltaY
		deltaX = e.originalEvent.deltaX || - e.originalEvent.wheelDeltaX || e.deltaX

		if @section && @section.mouseWheel
			@section.mouseWheel(deltaX, deltaY)
			e.preventDefault()


	_onKeyDown: (e) =>


	_onResize: () =>

		W.sw = screen.width
		W.sh = screen.height
		W.ww = W.window.width()
		W.wh = W.window.height()

		###
		W.body.css {
			'height': W.wh
			'width': W.ww
		}
		###

		if @section && @section.resize
			@section.resize()


	


	# -----------------------------------------------------------------------------o public

	update: () =>

		if @section && @section.update
			@section.update()



$ ->
	
	app = new App()

	(tick = () ->
		app.update()
		window.requestAnimationFrame(tick)
	)()