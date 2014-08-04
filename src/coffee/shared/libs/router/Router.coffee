class Router

	@CALLSTART = 'callstart'
	@CALLEND = 'callend'
	@CALLERROR = 'callerror'
	@INITIALIZE = 'initialize'

	@CLICK = 'click'

	constructor: () ->

		@cache = {}
		@container = $('.ajaxContainer')
		@current = @container.attr('id')
		@headTitle = $('title')

		@pages = {
			'prev': '',
			'current': @container.attr('id')
		}

		@processing = false
		@fromCache = false

		@events()
		@initCache()


	initCache: () ->

		@href = document.location.pathname
		@content = @container
		@caching()


	events: () ->

		$(document).on('click', 'a', (e) =>

			@elm = $(e.currentTarget)
			@href = @elm.attr('href')

			@checkRequestAvailability()

			if @isRequestAvailable
				@getContent()

			if !@isTargetSet
				e.preventDefault()

			$(@).trigger(Router.CLICK)
		)

		$(window).on('popstate', (event) =>
			@backCall()
			event.preventDefault();
		)


	checkRequestAvailability: () ->

		@isRequestAvailable = true
		@isTargetSet = false

		if @areUrlsMatching()
			@isRequestAvailable = false

		if @processing
			@isRequestAvailable = false

		if @elm.attr('target')
			@isTargetSet = true
			@isRequestAvailable = false



	areUrlsMatching: () ->

		urlToCheck = @href
		currentPath = document.location.pathname
		currentUrl = document.location.href

		if urlToCheck.substr(-1) == '/'
			urlToCheck = urlToCheck.substr(0, urlToCheck.length - 1)

		if currentUrl.substr(-1) == '/'
			currentUrl = currentUrl.substr(0, currentUrl.length - 1)
			currentPath = currentPath.substr(0, currentPath.length - 1)

		if urlToCheck == currentPath || urlToCheck == currentUrl
			return true

		return false


	backCall: () =>

		if @canBack

			if document.location.pathname == @href
				window.history.go(-1)
			else
				#window.history.go(-1)
				@href = document.location.pathname
				@getContent()

		@canBack = true



	getContent: () ->

		@pages.prev = @pages.current
		@processing = true

		if @cache[@href]
			@fromCache = true
			@content = @cache[@href].clone()
			@requestSucceeded()
		else
			@fromCache = false
			@request()



	request: () ->

		$(@).trigger(Router.CALLSTART)

		if @ajaxRequest && @ajaxRequest != 4
			@ajaxRequest.abort()

		@ajaxRequest = $.ajax {
			url: @href,
			success: (response) =>

				@ajaxResponse = response
				@content = $(response).filter('.ajaxContainer')
				if @content.length == 0
					@content = $(response).find('.ajaxContainer')
				@title = $(response).filter('title').text()

				@requestSucceeded()


			complete: (request, status) =>



			error: (response) =>

				$(@).trigger(Router.CALLERROR)

		}

	requestSucceeded: (response) ->

		@pages.current = @content.attr('id')

		@changeTitle()
		@caching()
		@changeUrl()

		$(@).trigger(Router.CALLEND)


	changeTitle: () ->

		@headTitle.text(@title)


	caching: () ->

		@cache[@href] = @content.clone()


	changeUrl: (href) ->

		if href then @href = href

		state = {}
		pathname = @href.split(window.location.host)[1]

		if pathname
	    	pathname = pathname.substr(4)

    	if window.history.pushState
    		if @pages.current == @pages.prev
    			window.history.replaceState(state, null, @href);
    		else
    			window.history.pushState(state, null, @href)
    	else
    		window.location.hash = pathname







