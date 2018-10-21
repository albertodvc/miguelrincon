
# requestAnimationFrame POLYFILL

# adjustToScreen = ->
# 	viewportHeight = window.innerHeight or document.documentElement.clientHeight or document.body.clientHeight
# 	headers = document.getElementsByTagName('header')
# 	arrayLength = headers.length
# 	i = 0
# 	while i < arrayLength
# 		headers[i].style.height = viewportHeight + 'px'
# 		i++
# 	return

# if document.documentElement.clientWidth > 1024
# 	adjustToScreen()

# Animation Frame polyfill
# lastTime = 0
# vendors = [
# 	'webkit'
# 	'moz'
# ]
# x = 0
# while x < vendors.length and !window.requestAnimationFrame
# 	window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame']
# 	window.cancelAnimationFrame = window[vendors[x] + 'CancelAnimationFrame'] or window[vendors[x] + 'CancelRequestAnimationFrame']
# 	++x
# if !window.requestAnimationFrame

# 	window.requestAnimationFrame = (callback, element) ->
# 		currTime = (new Date).getTime()
# 		timeToCall = Math.max(0, 16 - (currTime - lastTime))
# 		id = window.setTimeout((->
# 			callback currTime + timeToCall
# 			return
# 		), timeToCall)
# 		lastTime = currTime + timeToCall
# 		id

# if !window.cancelAnimationFrame

# 	window.cancelAnimationFrame = (id) ->
# 		clearTimeout id
# 		return



# nowFn = Date.now or ->
# 	(new Date).getTime()

onYouTubeIframeAPIReady = ->
	window.videoPlayer = new (YT.Player)('player',
		height: '100%'
		width: '100%'
		videoId: 'vJPVS_uZitI'
		playerVars:
			playsinline: 1
			suggestedQuality: 'large'
			rel: 0
			showinfo: 0
			autohide: 1
		events:
			'onReady': onPlayerReady
			'onStateChange': onPlayerStateChange)
	return

onPlayerReady = (event) ->
	$('#front-page').addClass 'video-ready'
	return

onPlayerStateChange = (event) ->
	switch event.data
		when 2, 0
			$('#front-page .video-wrapper').removeClass 'active'
			$('#front-page').removeClass 'video-active'
		when 3
			$('#front-page').addClass 'video-active'
			console.log 'buffering'
		when 1
			$('#front-page').addClass 'video-active'
			$('#front-page .video-wrapper').addClass 'active played-once'
			console.log 'playing'
	return

# throttleFn = (func, wait, options) ->
# 	timeout = undefined
# 	context = undefined
# 	args = undefined
# 	result = undefined
# 	previous = 0
# 	if !options
# 		options = {}

# 	later = ->
# 		previous = if options.leading == false then 0 else nowFn()
# 		timeout = null
# 		result = func.apply(context, args)
# 		if !timeout
# 			context = args = null
# 		return

# 	throttled = ->
# 		now = nowFn()
# 		if !previous and options.leading == false
# 			previous = now
# 		remaining = wait - (now - previous)
# 		context = this
# 		args = arguments
# 		if remaining <= 0 or remaining > wait
# 			if timeout
# 				clearTimeout timeout
# 				timeout = null
# 			previous = now
# 			result = func.apply(context, args)
# 			if !timeout
# 				context = args = null
# 		else if !timeout and options.trailing != false
# 			timeout = setTimeout(later, remaining)
# 		result

# 	throttled.cancel = ->
# 		clearTimeout timeout
# 		previous = 0
# 		timeout = context = args = null
# 		return

# 	throttled

#Player code
tag = document.createElement('script')
tag.src = 'https://www.youtube.com/iframe_api'
firstScriptTag = document.getElementsByTagName('script')[0]
firstScriptTag.parentNode.insertBefore tag, firstScriptTag
window.videoPlayer = null
$(document).ready ->
	is_touch_device = 'ontouchstart' of document.documentElement
	# $sections = $('section')
	# $headers = $('section header')

	# centerTitles = ->

	# 	getCssProperties = (opacity, translate) ->
	# 		style = {}
	# 		if typeof opacity != 'undefined' and opacity != null
	# 			style['opacity'] = opacity
	# 		if typeof translate != 'undefined' and translate != null
	# 			value = 'translate3d(0px, ' + translate + 'px, 0px)'
	# 			style['-ms-transform'] = value
	# 			style['-webkit-transform'] = value
	# 			style['transform'] = value
	# 		style

	# 	$headers.each ->
	# 		viewportHeight = $(window).height()
	# 		scrollPosition = $(window).scrollTop()
	# 		offset = $(this).parent().offset().top - scrollPosition
	# 		$title = $(this).children('h2')
	# 		margin = $title.css('margin-top')
	# 		parallaxRatio = 1.8
	# 		if scrollPosition <= viewportHeight
	# 			if $title.css('opacity') <= 0
	# 				$title.addClass 'hidden'
	# 			else
	# 				$title.removeClass 'hidden'
	# 			$title.css getCssProperties(1 - (scrollPosition / viewportHeight * 1.2), -scrollPosition / parallaxRatio)
	# 			if $(this).children('.video-wrapper').hasClass('active')
	# 				$(this).children('.video-wrapper').css getCssProperties(1 - (scrollPosition / viewportHeight * 1.2))
	# 		else
	# 			if $title.css('opacity') <= 0
	# 				$title.addClass 'hidden'
	# 			else
	# 				$title.removeClass 'hidden'
	# 			if -80 - (offset / parallaxRatio) >= -80
	# 				$title.css getCssProperties(1 + offset / viewportHeight * 1.2, -offset / parallaxRatio)
	# 			else
	# 				$title.css getCssProperties(1, 0)
	# 		return
		return
	# menuIsOpen = false
	# openMenu = ->
	# 	$menuToggle.addClass 'is-open'
	# 	$menuToggle.removeClass 'is-closed'
	# 	$menu.addClass 'is-open'
	# 	$sections.addClass 'menu-opened'
	# 	menuIsOpen = true
	# 	return

	# closeMenu = ->
	# 	$menuToggle.removeClass 'is-open'
	# 	$menuToggle.addClass 'is-closed'
	# 	$menu.removeClass 'is-open'
	# 	$sections.removeClass 'menu-opened'
	# 	menuIsOpen = false
	# 	return

	# $('nav').on 'click', 'li .nav_link', (event) ->
	# 	event.preventDefault()
	# 	id = $(this).attr('href')
	# 	article = $(id).find('article')
	# 	$('html, body').animate({ scrollTop: $(id).offset().top - 50 }, 500).delay(500).animate { scrollTop: article.offset().top - 50 }, 1000
	# 	return
	# $headers.on 'click', 'h2', (event) ->
	# 	article = $(this).parents('section').find('article')
	# 	$('html, body').animate { scrollTop: article.offset().top - 50 }, 500
	# 	return
	# console.log(player);
	# var _player = player;
	$('#front-page .play-video-button').on 'click', (event) ->
		window.videoPlayer.playVideo()
		event.stopPropagation()
		return

  # if document.documentElement.clientWidth > 1024
	# 	$(window).resize adjustToScreen


  # if document.documentElement.clientWidth > 1024 and !is_touch_device
	# 	$sections.addClass 'parallax'
	# 	#$(window).scroll(debounceFn(function(){
	# 	$(window).on 'scroll', throttleFn((->
	# 		window.requestAnimationFrame centerTitles
	# 		return
	# 	), 10)
	# $(".navigation").on('click', function(event){
	#  $(this).toggleClass('active');
	# });
	# $menuToggle = $('#hamburger')
	# $menu = $('#navigator')
	# menuIsOpen = false
	# $menuToggle.click ->
	# 	if menuIsOpen
	# 		closeMenu()
	# 	else
	# 		openMenu()
	# 	return
	# $('#navigator, section').click closeMenu
	# return

