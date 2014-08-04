class Utils

	@getCoverSizeImage: (picWidth, picHeight, containerWidth, containerHeight) =>

		pw = picWidth
		ph = picHeight
		cw = containerWidth || W.ww
		ch = containerHeight || W.wh

		pr = pw / ph
		cr = cw / ch

		if cr < pr
			return {
				'width': ch * pr
				'height': ch
				'top': 0
				'left': - ((ch * pr) - cw) * 0.5
			}

		else
			return {
				'width': cw
				'height': cw / pr
				'top': - ((cw / pr) - ch) * 0.5
				'left': 0
			}


	@clearTimers: (timers) =>	
		$.each timers, (key, timer) =>
			clearTimeout(timer)


	@playSound: (file, looping, volume) =>
		audio = new Audio(file)
		if looping
			$(audio).on('ended', () =>
				audio.currentTime = 0
				audio.play()
			)
		if volume
			audio.volume = volume

		#audio.volume = 0
		audio.play()

		return audio