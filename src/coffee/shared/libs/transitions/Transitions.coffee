class Transitions

	@INITIALIZE = 'initialize'
	@CALLSTART = 'callstart'
	@CALLEND = 'callend'
	@CALLMIDDLE = 'callmiddle'

	@CLICK = 'click'

	constructor: () ->

		@container = $('.ajaxContainer')
		@blackMask = $('.black_mask')

		@router = new Router()
		$(@router).on(Router.CLICK, @_onRouterClick)

		$(@router).on(Router.CALLSTART, @start)
		$(@router).on(Router.CALLEND, @end)

		@sectionId = @router.pages.current

		@data = {}

	_onRouterClick: () =>

		$(@).trigger(Transitions.CLICK)

	start: () =>
		
		$('#loading').css('display', 'block')
		setTimeout () =>
			$('#loading').css('opacity', 1)
		, 10


	end: () =>

		@launchOut()
	

	launchOut:() =>

		$(@).trigger(Transitions.CALLSTART)

		@container = {
			prev: $('.ajaxContainer')
			current: @router.content
		}

		if @[@router.pages.prev+'Out']
			@[@router.pages.prev+'Out']()
		else
			@defaultOut()


	launchIn:() =>


		@sectionId = @router.pages.current

		if @[@router.pages.current+'In']
			@[@router.pages.current+'In']()
		else
			@defaultIn()

		$(@).trigger(Transitions.CALLEND)



	defaultIn: () ->

		@sectionId = @router.pages.current

		@currentContainer = $('.ajaxContainer')
		@newContainer = @router.content

		@newContainer.css {
			'width': @currentContainer.width()
			'height': @currentContainer.height()
		}

		@currentContainer.before(@newContainer)
		@newContainer.addClass('new')
		@currentContainer.addClass('old')

		setTimeout () =>
			@newContainer.removeClass('new')
		, 100

		setTimeout () =>
			@currentContainer.remove()
			@router.processing = false
		, 1100



	defaultOut: () =>

		@launchIn()
		


