var App, Event, Home, Loader, Router, Scroll, SocialSharing, Transitions, UI_Slider, Utils, VideoPlayer, VideoPlayer_Controls, VideoPlayer_HTML, VideoPlayer_Templates, W, transitionsFactory, _Journal,
  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Event = (function() {
  function Event() {}

  Event.MOUSEDOWN = $('body').hasClass('tablet') ? 'touchstart' : 'mousedown';

  Event.MOUSEUP = $('body').hasClass('tablet') ? 'touchend' : 'mouseup';

  Event.MOUSEMOVE = $('body').hasClass('tablet') ? 'touchmove' : 'mousemove';

  Event.CLICK = $('body').hasClass('tablet') ? 'touchstart' : 'click';

  Event.ENTER = $('body').hasClass('tablet') ? 'touchstart' : 'mouseenter';

  Event.KEYDOWN = 'keydown';

  Event.WHEEL = 'mousewheel';

  Event.LOADED = 'loaded';

  Event.STEPS = 'steps';

  Event.SUBMIT = 'submit';

  return Event;

})();

Utils = (function() {
  function Utils() {}

  Utils.getCoverSizeImage = function(picWidth, picHeight, containerWidth, containerHeight) {
    var ch, cr, cw, ph, pr, pw;
    pw = picWidth;
    ph = picHeight;
    cw = containerWidth || W.ww;
    ch = containerHeight || W.wh;
    pr = pw / ph;
    cr = cw / ch;
    if (cr < pr) {
      return {
        'width': ch * pr,
        'height': ch,
        'top': 0,
        'left': -((ch * pr) - cw) * 0.5
      };
    } else {
      return {
        'width': cw,
        'height': cw / pr,
        'top': -((cw / pr) - ch) * 0.5,
        'left': 0
      };
    }
  };

  Utils.clearTimers = function(timers) {
    return $.each(timers, function(key, timer) {
      return clearTimeout(timer);
    });
  };

  Utils.playSound = function(file, looping, volume) {
    var audio;
    audio = new Audio(file);
    if (looping) {
      $(audio).on('ended', function() {
        audio.currentTime = 0;
        return audio.play();
      });
    }
    if (volume) {
      audio.volume = volume;
    }
    audio.play();
    return audio;
  };

  return Utils;

})();

W = (function() {
  function W() {}

  W.init = function() {
    W.window = $(window);
    W.body = $('body');
    W.ww = $(window).width();
    W.wh = $(window).height();
    W.sw = screen.width;
    W.sh = screen.height;
    W.scrollTop = {
      real: 0,
      calc: 0
    };
    return W.isTablet = $('body').hasClass('tablet') ? true : false;
  };

  return W;

})();

SocialSharing = (function() {
  function SocialSharing() {
    this._onLinkClick = __bind(this._onLinkClick, this);
    this._initEvents = __bind(this._initEvents, this);
    this.links = $('.social-link');
    this._initEvents();
  }

  SocialSharing.prototype._initEvents = function() {
    return $(document).on(Event.CLICK, '.social-link', this._onLinkClick);
  };

  SocialSharing.prototype._onLinkClick = function(e) {
    var height, leftPosition, link, options, topPosition, width, windowFeatures;
    e.preventDefault();
    link = $(e.currentTarget).attr('href');
    width = 800;
    height = 500;
    leftPosition = (window.screen.width / 2) - ((width / 2) + 10);
    topPosition = (window.screen.height / 2) - ((height / 2) + 50);
    options = windowFeatures = "status=no,height=" + height + ",width=" + width + ",resizable=yes,left=" + leftPosition + ",top=" + topPosition + ",screenX=" + leftPosition + ",screenY=" + topPosition + ",toolbar=no,menubar=no,scrollbars=no,location=no,directories=no";
    return window.open(link, 'Withings Activité', options);
  };

  return SocialSharing;

})();

Loader = (function() {
  function Loader(options) {
    var imgInc, imgLength, pics;
    this.container = options.container, this.elm = options.elm, this.customStep = options.customStep, this.stepback = options.stepback, this.complete = options.complete;
    if (this.elm) {
      pics = this.container.find(this.elm);
    } else {
      pics = this.container.find('.img');
    }
    imgLength = pics.length;
    imgInc = 0;
    this.steps = 0;
    this.empty = false;
    if (!pics.length) {
      this.empty = true;
      if (this.complete) {
        this.complete();
      }
    }
    pics.each((function(_this) {
      return function(key, item) {
        var $this, attrs, img, klass, src;
        $this = $(item);
        klass = $this.attr('class').replace('img ', '');
        src = $this.attr('data-src');
        img = new Image();
        attrs = '';
        $.each(item.attributes, function(key, att) {
          if (att.name === 'class') {
            att.value = att.value.replace('img', '');
          }
          if (att.name !== 'data-src') {
            return attrs += att.name + '="' + att.value + '" ';
          }
        });
        img.src = src;
        return img.onload = function() {
          var _ref;
          imgInc++;
          _this.steps = imgInc / imgLength * 100;
          if (_this.stepback) {
            _this.stepback(key, '<img src="' + src + '" ' + attrs + '/>', $this);
          }
          if ((_ref = _this.customStep) === true || _ref === (void 0)) {
            $this.replaceWith('<img src="' + src + '" ' + attrs + '/>');
          }
          $(_this).trigger(Event.STEPS);
          if (imgInc === imgLength) {
            if (_this.complete) {
              _this.complete();
            }
            return $(_this).trigger(Event.LOADED);
          }
        };
      };
    })(this));
  }

  return Loader;

})();

Router = (function() {
  Router.CALLSTART = 'callstart';

  Router.CALLEND = 'callend';

  Router.CALLERROR = 'callerror';

  Router.INITIALIZE = 'initialize';

  Router.CLICK = 'click';

  function Router() {
    this.backCall = __bind(this.backCall, this);
    this.cache = {};
    this.container = $('.ajaxContainer');
    this.current = this.container.attr('id');
    this.headTitle = $('title');
    this.pages = {
      'prev': '',
      'current': this.container.attr('id')
    };
    this.processing = false;
    this.fromCache = false;
    this.events();
    this.initCache();
  }

  Router.prototype.initCache = function() {
    this.href = document.location.pathname;
    this.content = this.container;
    return this.caching();
  };

  Router.prototype.events = function() {
    $(document).on('click', 'a', (function(_this) {
      return function(e) {
        _this.elm = $(e.currentTarget);
        _this.href = _this.elm.attr('href');
        _this.checkRequestAvailability();
        if (_this.isRequestAvailable) {
          _this.getContent();
        }
        if (!_this.isTargetSet) {
          e.preventDefault();
        }
        return $(_this).trigger(Router.CLICK);
      };
    })(this));
    return $(window).on('popstate', (function(_this) {
      return function(event) {
        _this.backCall();
        return event.preventDefault();
      };
    })(this));
  };

  Router.prototype.checkRequestAvailability = function() {
    this.isRequestAvailable = true;
    this.isTargetSet = false;
    if (this.areUrlsMatching()) {
      this.isRequestAvailable = false;
    }
    if (this.processing) {
      this.isRequestAvailable = false;
    }
    if (this.elm.attr('target')) {
      this.isTargetSet = true;
      return this.isRequestAvailable = false;
    }
  };

  Router.prototype.areUrlsMatching = function() {
    var currentPath, currentUrl, urlToCheck;
    urlToCheck = this.href;
    currentPath = document.location.pathname;
    currentUrl = document.location.href;
    if (urlToCheck.substr(-1) === '/') {
      urlToCheck = urlToCheck.substr(0, urlToCheck.length - 1);
    }
    if (currentUrl.substr(-1) === '/') {
      currentUrl = currentUrl.substr(0, currentUrl.length - 1);
      currentPath = currentPath.substr(0, currentPath.length - 1);
    }
    if (urlToCheck === currentPath || urlToCheck === currentUrl) {
      return true;
    }
    return false;
  };

  Router.prototype.backCall = function() {
    if (this.canBack) {
      if (document.location.pathname === this.href) {
        window.history.go(-1);
      } else {
        this.href = document.location.pathname;
        this.getContent();
      }
    }
    return this.canBack = true;
  };

  Router.prototype.getContent = function() {
    this.pages.prev = this.pages.current;
    this.processing = true;
    if (this.cache[this.href]) {
      this.fromCache = true;
      this.content = this.cache[this.href].clone();
      return this.requestSucceeded();
    } else {
      this.fromCache = false;
      return this.request();
    }
  };

  Router.prototype.request = function() {
    $(this).trigger(Router.CALLSTART);
    if (this.ajaxRequest && this.ajaxRequest !== 4) {
      this.ajaxRequest.abort();
    }
    return this.ajaxRequest = $.ajax({
      url: this.href,
      success: (function(_this) {
        return function(response) {
          _this.ajaxResponse = response;
          _this.content = $(response).filter('.ajaxContainer');
          if (_this.content.length === 0) {
            _this.content = $(response).find('.ajaxContainer');
          }
          _this.title = $(response).filter('title').text();
          return _this.requestSucceeded();
        };
      })(this),
      complete: (function(_this) {
        return function(request, status) {};
      })(this),
      error: (function(_this) {
        return function(response) {
          return $(_this).trigger(Router.CALLERROR);
        };
      })(this)
    });
  };

  Router.prototype.requestSucceeded = function(response) {
    this.pages.current = this.content.attr('id');
    this.changeTitle();
    this.caching();
    this.changeUrl();
    return $(this).trigger(Router.CALLEND);
  };

  Router.prototype.changeTitle = function() {
    return this.headTitle.text(this.title);
  };

  Router.prototype.caching = function() {
    return this.cache[this.href] = this.content.clone();
  };

  Router.prototype.changeUrl = function(href) {
    var pathname, state;
    if (href) {
      this.href = href;
    }
    state = {};
    pathname = this.href.split(window.location.host)[1];
    if (pathname) {
      pathname = pathname.substr(4);
    }
    if (window.history.pushState) {
      if (this.pages.current === this.pages.prev) {
        return window.history.replaceState(state, null, this.href);
      } else {
        return window.history.pushState(state, null, this.href);
      }
    } else {
      return window.location.hash = pathname;
    }
  };

  return Router;

})();

Scroll = (function() {
  function Scroll(options) {
    this.setTransformOriginY = __bind(this.setTransformOriginY, this);
    this.setTransformOriginX = __bind(this.setTransformOriginX, this);
    this.setScale = __bind(this.setScale, this);
    this.goTo = __bind(this.goTo, this);
    this.keyDown = __bind(this.keyDown, this);
    this.mouseUp = __bind(this.mouseUp, this);
    this.mouseMove = __bind(this.mouseMove, this);
    this.mouseDown = __bind(this.mouseDown, this);
    this.direction = options.direction, this.transformOrigin = options.transformOrigin;
    this.viewport = $('.scroll-viewport');
    this.overview = $('.scroll-overview');
    this.scrollbarContainer = $('.scrollbar-container');
    this.scrollbarTrack = this.scrollbarContainer.children('.scrollbar-track');
    this.scrollbarThumb = this.scrollbarTrack.children('.scrollbar-thumb');
    this.pos = {
      real: 0,
      calc: 0,
      limit: 0,
      perc: 0,
      prev: 0
    };
    this.scale = {
      real: 1,
      calc: 1,
      prev: 1
    };
    this.scrollbar = {
      real: 0,
      calc: 0,
      perc: 0,
      trackSize: this.direction === 'horizontal' ? this.scrollbarTrack.width() : this.scrollbarTrack.height(),
      thumbSize: this.direction === 'horizontal' ? this.scrollbarThumb.width() : this.scrollbarThumb.height()
    };
    this.overviewSize = 1;
    this.isMouseDown = false;
    this.isScrollbar = false;
    this.isMouseMoving = false;
    this.ease = 0.7;
    this.i = 0;
    this.prevPos = this.movePos = this.initPos = 0;
  }

  Scroll.prototype.mouseDown = function(e) {
    var klass, pagePos, target;
    target = $(e.target);
    klass = target.attr('class') || '';
    pagePos = this.direction === 'horizontal' ? e.pageX : e.pageY;
    if (klass.match('scrollbar')) {
      this.isScrollbar = true;
      this.initScrollY = this.pos.perc * (this.scrollbar.trackSize - this.scrollbar.thumbSize);
      this.initPos = pagePos - this.initScrollY;
    } else {
      this.isScrollbar = false;
      this.ease = 1;
      this.initScrollY = this.pos.perc * this.pos.limit;
      this.initPos = pagePos;
    }
    return this.isMouseDown = true;
  };

  Scroll.prototype.mouseMove = function(e) {
    var pagePos;
    if (this.isMouseDown) {
      pagePos = this.direction === 'horizontal' ? e.pageX : e.pageY;
      this.isMouseMoving = true;
      if (this.isScrollbar === true) {
        this.movePos = pagePos - this.initPos;
        return this.pos.perc = this.movePos / (this.scrollbar.trackSize - this.scrollbar.thumbSize);
      } else {
        this.prevPos = this.movePos;
        this.movePos = -this.initScrollY + pagePos - this.initPos;
        return this.pos.perc = -this.movePos / this.pos.limit;
      }
    }
  };

  Scroll.prototype.mouseUp = function() {
    if (this.isMouseMoving === true && this.isScrollbar === false) {
      this.pos.perc = -(this.movePos + (this.movePos - this.prevPos) * 10) / this.pos.limit;
    }
    this.ease = 0.1;
    return this.isScrollbar = this.isMouseDown = this.isMouseMoving = false;
  };

  Scroll.prototype.mouseWheel = function(deltaX, deltaY) {
    var initScrollY, movePos, scrollInc;
    if (this.direction === 'horizontal') {
      if (Math.max(Math.abs(deltaX), Math.abs(deltaY)) === Math.abs(deltaX)) {
        scrollInc = deltaX;
      } else {
        scrollInc = deltaY;
      }
    } else {
      scrollInc = deltaY;
    }
    initScrollY = this.pos.perc * this.pos.limit;
    movePos = -initScrollY - scrollInc;
    return this.pos.perc = -movePos / this.pos.limit;
  };

  Scroll.prototype.keyDown = function(e) {

    /*
    			32: space
    			40: down
    			38: up
    			16: shift
    			91: cmd
    			18: alt
     */
    var initScrollY, movePos, spaceInc;
    initScrollY = this.pos.perc * this.pos.limit;
    movePos = -initScrollY;
    spaceInc = this.direction === 'horizontal' ? W.ww : W.wh;
    switch (e.keyCode) {
      case 32:
        movePos -= spaceInc;
        break;
      case 40:
        movePos -= 40;
        break;
      case 38:
        movePos += 40;
    }
    return this.pos.perc = -movePos / this.pos.limit;
  };

  Scroll.prototype.goTo = function(pos) {
    return this.pos.perc = pos / this.pos.limit;
  };

  Scroll.prototype.setScale = function(scale) {
    return this.scale.real = scale;
  };

  Scroll.prototype.setTransformOriginX = function(val) {
    this.transformOrigin.x = val;
    return Normalize.transformOrigin(this.overview[0], this.transformOrigin.x + ' ' + this.transformOrigin.y);
  };

  Scroll.prototype.setTransformOriginY = function(val) {
    this.transformOrigin.y = val;
    return Normalize.transformOrigin(this.overview[0], this.transformOrigin.x + ' ' + this.transformOrigin.y);
  };

  Scroll.prototype.resize = function() {
    var contChange;
    this.overviewSize = this.direction === 'horizontal' ? this.overview.outerWidth() : this.overview.outerHeight();
    this.viewportSize = this.direction === 'horizontal' ? this.viewport.outerWidth() : this.viewport.outerHeight();
    this.pos.limit = this.overviewSize - this.viewportSize;
    contChange = this.direction === 'horizontal' ? {
      'width': W.ww
    } : {
      'height': W.wh
    };
    this.scrollbarContainer.css(contChange);
    return this.scrollbar.trackSize = this.direction === 'horizontal' ? this.scrollbarTrack.width() : this.scrollbarTrack.height();
  };

  Scroll.prototype.update = function() {
    if (this.pos.perc < 0) {
      this.pos.perc = 0;
    } else if (this.pos.perc > 1) {
      this.pos.perc = 1;
    }
    this.pos.prev = this.pos.calc;
    this.pos.real = this.pos.perc * this.pos.limit;
    this.pos.calc += (this.pos.real - this.pos.calc) * this.ease;
    this.scale.prev = this.scale.calc;
    this.scale.calc += (this.scale.real - this.scale.calc) * this.ease;
    this.transformOrigin.x = (this.pos.calc + W.ww * 0.5) + 'px';
    if (this.pos.prev !== this.pos.calc || this.scale.prev !== this.scale.calc) {
      if (this.direction === 'horizontal') {
        Normalize.transform(this.overview[0], 'translate3d(' + (-this.pos.calc) + 'px, 0, 0) scale(' + this.scale.calc + ')');
        Normalize.transform(this.scrollbarThumb[0], 'translate3d(' + (this.pos.perc * (this.scrollbar.trackSize - this.scrollbar.thumbSize)) + 'px, 0, 0)');
        this.transformOrigin.x = (this.pos.calc + W.ww * 0.5) + 'px';
      } else {
        Normalize.transform(this.overview[0], 'translate3d(0, ' + (-this.pos.calc) + 'px, 0) scale(' + this.scale.calc + ')');
        Normalize.transform(this.scrollbarThumb[0], 'translate3d(0, ' + (this.pos.perc * (this.scrollbar.trackSize - this.scrollbar.thumbSize)) + 'px, 0)');
        this.transformOrigin.x = (this.pos.calc + W.wh * 0.5) + 'px';
      }
      return Normalize.transformOrigin(this.overview[0], this.transformOrigin.x + ' ' + this.transformOrigin.y);
    }
  };

  return Scroll;

})();

Transitions = (function() {
  Transitions.INITIALIZE = 'initialize';

  Transitions.CALLSTART = 'callstart';

  Transitions.CALLEND = 'callend';

  Transitions.CALLMIDDLE = 'callmiddle';

  Transitions.CLICK = 'click';

  function Transitions() {
    this.defaultOut = __bind(this.defaultOut, this);
    this.launchIn = __bind(this.launchIn, this);
    this.launchOut = __bind(this.launchOut, this);
    this.end = __bind(this.end, this);
    this.start = __bind(this.start, this);
    this._onRouterClick = __bind(this._onRouterClick, this);
    this.container = $('.ajaxContainer');
    this.blackMask = $('.black_mask');
    this.router = new Router();
    $(this.router).on(Router.CLICK, this._onRouterClick);
    $(this.router).on(Router.CALLSTART, this.start);
    $(this.router).on(Router.CALLEND, this.end);
    this.sectionId = this.router.pages.current;
    this.data = {};
  }

  Transitions.prototype._onRouterClick = function() {
    return $(this).trigger(Transitions.CLICK);
  };

  Transitions.prototype.start = function() {
    $('#loading').css('display', 'block');
    return setTimeout((function(_this) {
      return function() {
        return $('#loading').css('opacity', 1);
      };
    })(this), 10);
  };

  Transitions.prototype.end = function() {
    return this.launchOut();
  };

  Transitions.prototype.launchOut = function() {
    $(this).trigger(Transitions.CALLSTART);
    this.container = {
      prev: $('.ajaxContainer'),
      current: this.router.content
    };
    if (this[this.router.pages.prev + 'Out']) {
      return this[this.router.pages.prev + 'Out']();
    } else {
      return this.defaultOut();
    }
  };

  Transitions.prototype.launchIn = function() {
    this.sectionId = this.router.pages.current;
    if (this[this.router.pages.current + 'In']) {
      this[this.router.pages.current + 'In']();
    } else {
      this.defaultIn();
    }
    return $(this).trigger(Transitions.CALLEND);
  };

  Transitions.prototype.defaultIn = function() {
    this.sectionId = this.router.pages.current;
    this.currentContainer = $('.ajaxContainer');
    this.newContainer = this.router.content;
    this.newContainer.css({
      'width': this.currentContainer.width(),
      'height': this.currentContainer.height()
    });
    this.currentContainer.before(this.newContainer);
    this.newContainer.addClass('new');
    this.currentContainer.addClass('old');
    setTimeout((function(_this) {
      return function() {
        return _this.newContainer.removeClass('new');
      };
    })(this), 100);
    return setTimeout((function(_this) {
      return function() {
        _this.currentContainer.remove();
        return _this.router.processing = false;
      };
    })(this), 1100);
  };

  Transitions.prototype.defaultOut = function() {
    return this.launchIn();
  };

  return Transitions;

})();

UI_Slider = (function() {
  UI_Slider.START = 'start';

  UI_Slider.CHANGE = 'change';

  UI_Slider.END = 'end';

  function UI_Slider(options) {
    this._onMouseUp = __bind(this._onMouseUp, this);
    this._onMouseMove = __bind(this._onMouseMove, this);
    this._onMouseDown = __bind(this._onMouseDown, this);
    this._initSlider = __bind(this._initSlider, this);
    this.container = options.container, this.startValue = options.startValue;
    this.startValue = this.startValue || 0;
    this._initX = 0;
    this._x = 0;
    this._moveX = 0;
    this._initSlider();
  }

  UI_Slider.prototype._initSlider = function() {
    return this.container.on(Event.MOUSEDOWN, this._onMouseDown);
  };

  UI_Slider.prototype._onMouseDown = function(event) {
    var e;
    e = event.type === 'touchstart' ? event.originalEvent.touches[0] : event;
    this.containerWidth = this.container.width();
    this._leftSide = this.container.offset().left;
    this.cursorPos = e.pageX - this._leftSide;
    this.perc = this.cursorPos / this.containerWidth;
    $(document).on(Event.MOUSEMOVE, this._onMouseMove).on(Event.MOUSEUP, this._onMouseUp);
    return $(this).trigger(UI_Slider.START);
  };

  UI_Slider.prototype._onMouseMove = function(event) {
    var e;
    e = event.type === 'touchmove' ? event.originalEvent.touches[0] : event;
    this.cursorPos = e.pageX - this._leftSide;
    this.perc = this.cursorPos / this.containerWidth;
    if (this.perc < 0) {
      this.perc = 0;
    } else if (this.perc > 1) {
      this.perc = 1;
    }
    return $(this).trigger(UI_Slider.CHANGE);
  };

  UI_Slider.prototype._onMouseUp = function() {
    $(document).off(Event.MOUSEMOVE, this._onMouseMove).off(Event.MOUSEUP, this._onMouseUp);
    return $(this).trigger(UI_Slider.END);
  };

  return UI_Slider;

})();

VideoPlayer = (function() {
  function VideoPlayer(options) {
    this._onPlayerPaused = __bind(this._onPlayerPaused, this);
    this._onPlayerEnded = __bind(this._onPlayerEnded, this);
    this._onPlayerPlaying = __bind(this._onPlayerPlaying, this);
    this._onPlayerWaiting = __bind(this._onPlayerWaiting, this);
    this._onPlayerTimeUpdate = __bind(this._onPlayerTimeUpdate, this);
    this._onPlayerProgress = __bind(this._onPlayerProgress, this);
    this._onPlayerCanPlay = __bind(this._onPlayerCanPlay, this);
    this._onControlsSeekEnd = __bind(this._onControlsSeekEnd, this);
    this._onControlsSeekStart = __bind(this._onControlsSeekStart, this);
    this._onControlsVolume = __bind(this._onControlsVolume, this);
    this._onControlsFullscreen = __bind(this._onControlsFullscreen, this);
    this._onControlsStop = __bind(this._onControlsStop, this);
    this._onControlsPause = __bind(this._onControlsPause, this);
    this._onControlsPlay = __bind(this._onControlsPlay, this);
    this._onShieldClick = __bind(this._onShieldClick, this);
    this.hideControls = __bind(this.hideControls, this);
    this.showControls = __bind(this.showControls, this);
    this.setSrc = __bind(this.setSrc, this);
    this.seek = __bind(this.seek, this);
    this.setVolume = __bind(this.setVolume, this);
    this.getSrc = __bind(this.getSrc, this);
    this.getState = __bind(this.getState, this);
    this.getDuration = __bind(this.getDuration, this);
    this.getCurrentTime = __bind(this.getCurrentTime, this);
    this.unmute = __bind(this.unmute, this);
    this.mute = __bind(this.mute, this);
    this.stop = __bind(this.stop, this);
    this.pause = __bind(this.pause, this);
    this.play = __bind(this.play, this);
    this.container = options.container, this.src = options.src, this.poster = options.poster, this.autoplay = options.autoplay, this.loop = options.loop, this.hideControlsAllowed = options.hideControlsAllowed;
    this.isMuted = false;
    this.state = -1;
    this.tempState = null;
    this.canPlay = false;
    this.queueSeek = null;
    this.bufferingInterval = null;
    this.isBuffering = false;
    this.isPaused = false;
    this._initPlayer();
  }

  VideoPlayer.prototype._initPlayer = function() {
    this.container.addClass('stopped');
    this.player = new VideoPlayer_HTML({
      container: this.container,
      src: this.container.attr('data-src') || this.src
    });
    this.video = this.player.$video;
    this.videoContainer = this.player.videoContainer;
    this.controls = new VideoPlayer_Controls({
      container: this.container,
      poster: this.poster,
      autoplay: this.autoplay,
      hideControlsAllowed: this.hideControlsAllowed
    });
    this._initListeners();
    if (this.autoplay) {
      return this.play();
    }
  };

  VideoPlayer.prototype._initListeners = function() {
    $(this.controls).on(VideoPlayer_Controls.SHIELD_CLICK, this._onShieldClick).on(VideoPlayer_Controls.PLAY, this._onControlsPlay).on(VideoPlayer_Controls.PAUSE, this._onControlsPause).on(VideoPlayer_Controls.STOP, this._onControlsStop).on(VideoPlayer_Controls.FULLSCREEN, this._onControlsFullscreen).on(VideoPlayer_Controls.VOLUME, this._onControlsVolume).on(VideoPlayer_Controls.SEEK_START, this._onControlsSeekStart).on(VideoPlayer_Controls.SEEK_END, this._onControlsSeekEnd);
    return $(this.player).on(VideoPlayer.CANPLAY, this._onPlayerCanPlay).on(VideoPlayer.PROGRESS, this._onPlayerProgress).on(VideoPlayer.TIMEUPDATE, this._onPlayerTimeUpdate).on(VideoPlayer.WAITING, this._onPlayerWaiting).on(VideoPlayer.PLAYING, this._onPlayerPlaying).on(VideoPlayer.ENDED, this._onPlayerEnded).on(VideoPlayer.PAUSED, this._onPlayerPaused);
  };

  VideoPlayer.playerState = {
    ENDED: 1,
    PLAYING: 2,
    PAUSED: 3,
    BUFFERING: 4,
    CUED: 5
  };

  VideoPlayer.CANPLAY = 'canplay';

  VideoPlayer.PROGRESS = 'progress';

  VideoPlayer.TIMEUPDATE = 'timeupdate';

  VideoPlayer.WAITING = 'waiting';

  VideoPlayer.PLAYING = 'playing';

  VideoPlayer.SEEKED = 'seeked';

  VideoPlayer.BUFFERING = 'buffering';

  VideoPlayer.ENDED = 'ended';

  VideoPlayer.PAUSED = 'paused';

  VideoPlayer.SHIELD_CLICK = 'shield_click';

  VideoPlayer.MUTE = 'onmute';

  VideoPlayer.UNMUTE = 'onunmute';

  VideoPlayer.prototype.play = function() {
    this.state = VideoPlayer.playerState.PLAYING;
    this.player.play();
    return this.controls.onPlay();
  };

  VideoPlayer.prototype.pause = function() {
    this.state = VideoPlayer.playerState.PAUSED;
    this.player.pause();
    return this.controls.onPause();
  };

  VideoPlayer.prototype.stop = function() {
    this.state = VideoPlayer.playerState.ENDED;
    this.player.stop();
    this.controls.onStop();
    if (this.loop === true) {
      return this.play();
    }
  };

  VideoPlayer.prototype.mute = function() {
    this.isMuted = true;
    this.player.mute();
    this.controls.onMute();
    return $(this).trigger(VideoPlayer.MUTE);
  };

  VideoPlayer.prototype.unmute = function() {
    this.isMuted = false;
    this.player.unmute();
    this.controls.onUnMute();
    return $(this).trigger(VideoPlayer.UNMUTE);
  };

  VideoPlayer.prototype.getCurrentTime = function() {
    return this.player.getCurrentTime();
  };

  VideoPlayer.prototype.getDuration = function() {
    return this.player.getDuration();
  };

  VideoPlayer.prototype.getState = function() {
    return this.state;
  };

  VideoPlayer.prototype.getSrc = function() {
    return this.player.getSrc();
  };

  VideoPlayer.prototype.setVolume = function(val) {
    return this.player.setVolume(val);
  };

  VideoPlayer.prototype.seek = function(val) {
    if (this.canPlay === false) {
      return this.queueSeek = val;
    } else {
      this.player.seek(val);
      this.controls.onSeek(val / this.player.getDuration());
      return $(this).trigger(VideoPlayer.SEEKED);
    }
  };

  VideoPlayer.prototype.setSrc = function(src) {
    this.canPlay = false;
    return this.player.setSrc(src);
  };

  VideoPlayer.prototype.showControls = function() {
    return this.controls.show();
  };

  VideoPlayer.prototype.hideControls = function() {
    return this.controls.hide();
  };

  VideoPlayer.prototype._onShieldClick = function() {
    if (this.state === VideoPlayer.playerState.PLAYING) {
      this.pause();
      return $(this).trigger(VideoPlayer.SHIELD_CLICK);
    } else {
      return this.play();
    }
  };

  VideoPlayer.prototype._onControlsPlay = function() {
    return this.play();
  };

  VideoPlayer.prototype._onControlsPause = function() {
    return this.pause();
  };

  VideoPlayer.prototype._onControlsStop = function() {
    this.pause();
    return this.seek(0);
  };

  VideoPlayer.prototype._onControlsFullscreen = function() {};

  VideoPlayer.prototype._onControlsVolume = function() {
    if (this.isMuted === true) {
      return this.unmute();
    } else {
      return this.mute();
    }
  };

  VideoPlayer.prototype._onControlsSeekStart = function() {
    this.tempState = this.state;
    return this.pause();
  };

  VideoPlayer.prototype._onControlsSeekEnd = function(e, perc) {
    this.seek(perc * this.getDuration());
    if (this.tempState === VideoPlayer.playerState.PLAYING) {
      return this.play();
    }
  };

  VideoPlayer.prototype._onPlayerCanPlay = function() {
    this.canPlay = true;
    if (this.queueSeek !== null) {
      this.seek(this.queueSeek);
      this.queueSeek = null;
    }
    this.controls.setTotalTime(this.getDuration());
    return $(this).trigger(VideoPlayer.CANPLAY);
  };

  VideoPlayer.prototype._onPlayerProgress = function() {
    return $(this).trigger(VideoPlayer.PROGRESS);
  };

  VideoPlayer.prototype._onPlayerTimeUpdate = function() {
    $(this).trigger(VideoPlayer.TIMEUPDATE);
    if (this.state === VideoPlayer.playerState.PLAYING) {
      return this.controls.onUpdate(this.getCurrentTime() / this.getDuration());
    }

    /*clearTimeout(@bufferingInterval)
    		@bufferingInterval = setTimeout () =>
    			if @state != VideoPlayer.playerState.PAUSED
    				@state = VideoPlayer.playerState.BUFFERING
    				@isBuffering = true
    				$(@).trigger(VideoPlayer.BUFFERING)
    		, 500
     */
  };

  VideoPlayer.prototype._onPlayerWaiting = function() {
    return $(this).trigger(VideoPlayer.WAITING);
  };

  VideoPlayer.prototype._onPlayerPlaying = function() {
    this.isBuffering = false;
    return $(this).trigger(VideoPlayer.PLAYING);
  };

  VideoPlayer.prototype._onPlayerEnded = function() {
    this.stop();
    return $(this).trigger(VideoPlayer.ENDED);
  };

  VideoPlayer.prototype._onPlayerPaused = function() {
    return $(this).trigger(VideoPlayer.PAUSED);
  };

  return VideoPlayer;

})();

VideoPlayer_Controls = (function() {
  function VideoPlayer_Controls(options) {
    this.setTotalTime = __bind(this.setTotalTime, this);
    this.show = __bind(this.show, this);
    this.hide = __bind(this.hide, this);
    this.onUnMute = __bind(this.onUnMute, this);
    this.onMute = __bind(this.onMute, this);
    this.onSeek = __bind(this.onSeek, this);
    this.onStop = __bind(this.onStop, this);
    this.onUpdate = __bind(this.onUpdate, this);
    this.onBuffering = __bind(this.onBuffering, this);
    this.onPause = __bind(this.onPause, this);
    this.onPlay = __bind(this.onPlay, this);
    this._sortTime = __bind(this._sortTime, this);
    this._changeTime = __bind(this._changeTime, this);
    this._onMouseMove = __bind(this._onMouseMove, this);
    this._onProgressBarEnd = __bind(this._onProgressBarEnd, this);
    this._onProgressBarChange = __bind(this._onProgressBarChange, this);
    this._onProgressBarStart = __bind(this._onProgressBarStart, this);
    this._onVolumeButtonClick = __bind(this._onVolumeButtonClick, this);
    this._onFullscreenButtonClick = __bind(this._onFullscreenButtonClick, this);
    this._onStopButtonClick = __bind(this._onStopButtonClick, this);
    this._onPauseButtonClick = __bind(this._onPauseButtonClick, this);
    this._onPlayButtonClick = __bind(this._onPlayButtonClick, this);
    this._onShieldClick = __bind(this._onShieldClick, this);
    this.container = options.container, this.poster = options.poster, this.autoplay = options.autoplay, this.hideControlsAllowed = options.hideControlsAllowed;
    this._areControlsHidden = false;
    this._initInterface();
    this._initEvents();
  }

  VideoPlayer_Controls.TEMPLATE = "<div class=\"shield\"></div>\n<div class=\"controls\">\n	<div class=\"timeline-container\">\n		<span class=\"background\"></span>\n		<span class=\"progress\"></span>\n	</div>\n	<span class=\"play-button\"><i></i></span>\n	<span class=\"pause-button\"><i></i></span>\n	<span class=\"volume-button\"></span>\n	<div class=\"time-container\">\n		<span class=\"time-current\"></span>\n		<span class=\"time-separator\">:</span>\n		<span class=\"time-total\"></span>\n	</div>\n</div>\n";

  VideoPlayer_Controls.SHIELD_CLICK = 'shield_click';

  VideoPlayer_Controls.PLAY = 'play';

  VideoPlayer_Controls.PAUSE = 'pause';

  VideoPlayer_Controls.STOP = 'stop';

  VideoPlayer_Controls.FULLSCREEN = 'fullscreen';

  VideoPlayer_Controls.VOLUME = 'volume';

  VideoPlayer_Controls.SEEK_START = 'seek_start';

  VideoPlayer_Controls.SEEK_END = 'seek_end';

  VideoPlayer_Controls.prototype._initInterface = function() {
    this.controls = $(VideoPlayer_Controls.TEMPLATE);
    this.container.append(this.controls);
    if (this.autoplay !== true && this.poster) {
      this.poster = $("<img src=\"" + this.poster + "\" class=\"poster\" />");
      this.container.append(this.poster);
    }
    this.shield = this.container.find('.shield');
    this.playButton = this.container.find('.play-button');
    this.pauseButton = this.container.find('.pause-button');
    this.stopButton = this.container.find('.stop-button');
    this.fullscreenButton = this.container.find('.fullscreen-button');
    this.volumeButton = this.container.find('.volume-button');
    this.timelineContainer = this.container.find('.timeline-container');
    this.timelineProgress = this.timelineContainer.children('.progress');
    this.timeContainer = this.container.find('.time-container');
    this.timeCurrent = this.timeContainer.find('.time-current');
    this.timeTotal = this.timeContainer.find('.time-total');
    return this.progressBar = new UI_Slider({
      container: this.timelineContainer
    });
  };

  VideoPlayer_Controls.prototype._initEvents = function() {
    this.shield.on(Event.CLICK, this._onShieldClick);
    this.playButton.on(Event.CLICK, this._onPlayButtonClick);
    this.pauseButton.on(Event.CLICK, this._onPauseButtonClick);
    this.stopButton.on(Event.CLICK, this._onStopButtonClick);
    this.fullscreenButton.on(Event.CLICK, this._onFullscreenButtonClick);
    this.volumeButton.on(Event.CLICK, this._onVolumeButtonClick);
    $(this.progressBar).on(UI_Slider.START, this._onProgressBarStart);
    $(this.progressBar).on(UI_Slider.CHANGE, this._onProgressBarChange);
    $(this.progressBar).on(UI_Slider.END, this._onProgressBarEnd);
    if (this.hideControlsAllowed) {
      return this.container.on(Event.MOUSEMOVE, this._onMouseMove);
    }
  };

  VideoPlayer_Controls.prototype._onShieldClick = function() {
    return $(this).trigger(VideoPlayer_Controls.SHIELD_CLICK);
  };

  VideoPlayer_Controls.prototype._onPlayButtonClick = function() {
    return $(this).trigger(VideoPlayer_Controls.PLAY);
  };

  VideoPlayer_Controls.prototype._onPauseButtonClick = function() {
    return $(this).trigger(VideoPlayer_Controls.PAUSE);
  };

  VideoPlayer_Controls.prototype._onStopButtonClick = function() {
    return $(this).trigger(VideoPlayer_Controls.STOP);
  };

  VideoPlayer_Controls.prototype._onFullscreenButtonClick = function() {
    return $(this).trigger(VideoPlayer_Controls.FULLSCREEN);
  };

  VideoPlayer_Controls.prototype._onVolumeButtonClick = function() {
    return $(this).trigger(VideoPlayer_Controls.VOLUME);
  };

  VideoPlayer_Controls.prototype._onProgressBarStart = function() {
    $(this).trigger(VideoPlayer_Controls.SEEK_START);
    return this.timelineProgress.css({
      'width': this.progressBar.perc * this.timelineContainer.width()
    });
  };

  VideoPlayer_Controls.prototype._onProgressBarChange = function() {
    return this.timelineProgress.css({
      'width': this.progressBar.perc * this.timelineContainer.width()
    });
  };

  VideoPlayer_Controls.prototype._onProgressBarEnd = function() {
    return $(this).trigger(VideoPlayer_Controls.SEEK_END, [this.progressBar.perc]);
  };

  VideoPlayer_Controls.prototype._onMouseMove = function() {
    this.show();
    clearTimeout(this._moveTimer);
    return this._moveTimer = setTimeout((function(_this) {
      return function() {
        return _this.hide();
      };
    })(this), this._hideControlsDelay);
  };

  VideoPlayer_Controls.prototype._changeTime = function(perc) {
    var newTime;
    newTime = this._sortTime(perc * this.duration);
    if (newTime !== this.timeText) {
      this.timeText = newTime;
      return this.timeCurrent.text(newTime);
    }
  };

  VideoPlayer_Controls.prototype._sortTime = function(time) {
    var m, s;
    m = ~~(time / 60);
    s = ~~(time - m * 60);
    return (m < 10 ? '0' + m : m) + ':' + (s < 10 ? '0' + s : s);
  };

  VideoPlayer_Controls.prototype.onPlay = function() {
    return this.container.addClass('playing').removeClass('paused stopped');
  };

  VideoPlayer_Controls.prototype.onPause = function() {
    return this.container.addClass('paused').removeClass('playing stopped');
  };

  VideoPlayer_Controls.prototype.onBuffering = function() {};

  VideoPlayer_Controls.prototype.onUpdate = function(perc) {
    this.timelineProgress.css({
      'width': perc * this.timelineContainer.width()
    });
    return this._changeTime(perc);
  };

  VideoPlayer_Controls.prototype.onStop = function() {
    this.container.addClass('stopped').removeClass('playing paused');
    return this.timelineProgress.css({
      'width': 0
    });
  };

  VideoPlayer_Controls.prototype.onSeek = function(perc) {
    this.timelineProgress.css({
      'width': perc * this.timelineContainer.width()
    });
    return this._changeTime(perc);
  };

  VideoPlayer_Controls.prototype.onMute = function() {
    return this.container.addClass('muted');
  };

  VideoPlayer_Controls.prototype.onUnMute = function() {
    return this.container.removeClass('muted');
  };

  VideoPlayer_Controls.prototype.hide = function() {
    if (this._areControlsHidden === false) {
      this.controls.addClass('hidden');
      return this._areControlsHidden = true;
    }
  };

  VideoPlayer_Controls.prototype.show = function() {
    if (this._areControlsHidden === true) {
      this.controls.removeClass('hidden');
      return this._areControlsHidden = false;
    }
  };

  VideoPlayer_Controls.prototype.setTotalTime = function(duration) {
    this.duration = duration;
    return this.timeTotal.text(this._sortTime(duration));
  };

  return VideoPlayer_Controls;

})();

VideoPlayer_HTML = (function() {
  function VideoPlayer_HTML(options) {
    this.setSrc = __bind(this.setSrc, this);
    this.seek = __bind(this.seek, this);
    this.setVolume = __bind(this.setVolume, this);
    this.getSrc = __bind(this.getSrc, this);
    this.getState = __bind(this.getState, this);
    this.getDuration = __bind(this.getDuration, this);
    this.getCurrentTime = __bind(this.getCurrentTime, this);
    this.unmute = __bind(this.unmute, this);
    this.mute = __bind(this.mute, this);
    this.stop = __bind(this.stop, this);
    this.pause = __bind(this.pause, this);
    this.play = __bind(this.play, this);
    this._onPause = __bind(this._onPause, this);
    this._onEnded = __bind(this._onEnded, this);
    this._onPlaying = __bind(this._onPlaying, this);
    this._onWaiting = __bind(this._onWaiting, this);
    this._onTimeUpdate = __bind(this._onTimeUpdate, this);
    this._onProgress = __bind(this._onProgress, this);
    this._onLoad = __bind(this._onLoad, this);
    this._onCanPlay = __bind(this._onCanPlay, this);
    this._initEvents = __bind(this._initEvents, this);
    this.container = options.container, this.src = options.src;
    this.html = "<div class=\"video-container\">\n	<video>\n	</video>\n</div>";
    this.videoContainer = $(this.html);
    this.$video = this.videoContainer.children('video');
    this.video = this.$video[0];
    this.volume = 1;
    this.setSrc(this.src);
    this.container.html(this.videoContainer);
    this._initEvents();
  }

  VideoPlayer_HTML.prototype._initEvents = function() {
    return this.$video.on('load', this._onload).on('canplay', this._onCanPlay).on('progress', this._onProgress).on('timeupdate', this._onTimeUpdate).on('waiting', this._onWaiting).on('playing', this._onPlaying).on('ended', this._onEnded).on('pause', this._onPause);
  };

  VideoPlayer_HTML.prototype._onCanPlay = function() {
    return $(this).trigger(VideoPlayer.CANPLAY);
  };

  VideoPlayer_HTML.prototype._onLoad = function() {};

  VideoPlayer_HTML.prototype._onProgress = function() {
    return $(this).trigger(VideoPlayer.PROGRESS);
  };

  VideoPlayer_HTML.prototype._onTimeUpdate = function() {
    return $(this).trigger(VideoPlayer.TIMEUPDATE);
  };

  VideoPlayer_HTML.prototype._onWaiting = function() {
    return $(this).trigger(VideoPlayer.WAITING);
  };

  VideoPlayer_HTML.prototype._onPlaying = function() {
    return $(this).trigger(VideoPlayer.PLAYING);
  };

  VideoPlayer_HTML.prototype._onEnded = function() {
    return $(this).trigger(VideoPlayer.ENDED);
  };

  VideoPlayer_HTML.prototype._onPause = function() {
    return $(this).trigger(VideoPlayer.PAUSED);
  };

  VideoPlayer_HTML.prototype.play = function() {
    return this.video.play();
  };

  VideoPlayer_HTML.prototype.pause = function() {
    return this.video.pause();
  };

  VideoPlayer_HTML.prototype.stop = function() {
    this.video.currentTime = 0;
    return this.video.pause();
  };

  VideoPlayer_HTML.prototype.mute = function() {
    return this.video.volume = 0;
  };

  VideoPlayer_HTML.prototype.unmute = function() {
    return this.video.volume = this.volume;
  };

  VideoPlayer_HTML.prototype.getCurrentTime = function() {
    return this.video.currentTime;
  };

  VideoPlayer_HTML.prototype.getDuration = function() {
    return this.video.duration;
  };

  VideoPlayer_HTML.prototype.getState = function() {
    return null;
  };

  VideoPlayer_HTML.prototype.getSrc = function() {
    return this.video.src;
  };

  VideoPlayer_HTML.prototype.setVolume = function(val) {
    this.volume = val;
    return this.video.volume = val;
  };

  VideoPlayer_HTML.prototype.seek = function(val) {
    return this.video.currentTime = val;
  };

  VideoPlayer_HTML.prototype.setSrc = function(src) {
    var sources;
    if (src) {
      this.srcNoExt = src.substr(0, src.lastIndexOf("."));
    }
    sources = "<source src=\"" + this.srcNoExt + ".webm\" type=\"video/webm\" />\n<source src=\"" + this.srcNoExt + ".mp4\" type=\"video/mp4\" />\n<source src=\"" + this.srcNoExt + ".ogv\" type=\"video/ogg\" />";
    this.$video.html(sources);
    return this.video.load();
  };

  return VideoPlayer_HTML;

})();

VideoPlayer_Templates = (function() {
  function VideoPlayer_Templates() {}

  VideoPlayer_Templates.PLAY_BUTTON = "<span class=\"play-button\"><i></i></span>";

  VideoPlayer_Templates.PAUSE_BUTTON = "<span class=\"pause-button\"><i></i></span>";

  VideoPlayer_Templates.STOP_BUTTON = "<span class=\"stop-button\"></span>";

  VideoPlayer_Templates.FULLSCREEN_BUTTON = "<span class=\"fullscreen-button\"></span>";

  VideoPlayer_Templates.VOLUME_BUTTON = "<span class=\"volume-button\"></span>";

  VideoPlayer_Templates.PROGRESS = "<div class=\"progress-container\">\n	<div class=\"background\"></div>\n	<div class=\"buffering\"></div>\n	<div class=\"progress\"></div>\n</div>";

  return VideoPlayer_Templates;

})();

App = (function() {
  function App() {
    this.update = __bind(this.update, this);
    this._onResize = __bind(this._onResize, this);
    this._onKeyDown = __bind(this._onKeyDown, this);
    this._onMouseWheel = __bind(this._onMouseWheel, this);
    this._onMouseUp = __bind(this._onMouseUp, this);
    this._onMouseMove = __bind(this._onMouseMove, this);
    this._onMouseDown = __bind(this._onMouseDown, this);
    this._initSection = __bind(this._initSection, this);
    this._initEvents = __bind(this._initEvents, this);
    console.log('%c# --------------------o Running Desktop', 'background: #42e34d; color: #F0F0F0;');
    W.init();
    this.router = new Router();
    this._initEvents();
    this._initSection();
  }

  App.prototype._initEvents = function() {
    W.body.on(Event.MOUSEDOWN, this._onMouseDown).on(Event.MOUSEMOVE, this._onMouseMove).on(Event.MOUSEUP, this._onMouseUp).on(Event.WHEEL, this._onMouseWheel).on(Event.KEYDOWN, this._onKeyDown);
    return W.window.on('resize', this._onResize);
  };

  App.prototype._initSection = function() {
    this._destroySection();
    this.sectionId = this.router.pages.current;
    switch (this.sectionId) {
      case 'home':
        this.section = new Home();
        break;
      case 'journal':
        this.section = new Journal();
    }
    return this._onResize();
  };

  App.prototype._destroySection = function() {
    if (this.section && this.section.destroy) {
      return this.section.destroy();
    }
  };

  App.prototype._onMouseDown = function(event) {
    var e, _ref;
    e = event.type === 'touchstart' ? event.originalEvent.touches[0] : event;
    if ((_ref = event.which) === 0 || _ref === 1) {
      if (this.section && this.section.mouseDown) {
        this.section.mouseDown(e);
      }
    }
    return event.preventDefault();
  };

  App.prototype._onMouseMove = function(event) {
    var e, _ref;
    e = event.type === 'touchmove' ? event.originalEvent.touches[0] : event;
    if ((_ref = event.which) === 0 || _ref === 1) {
      if (this.section && this.section.mouseMove) {
        this.section.mouseMove(e);
      }
    }
    return event.preventDefault();
  };

  App.prototype._onMouseUp = function(event) {
    var e, _ref;
    e = event.type === 'touchend' ? event.originalEvent.touches[0] : event;
    if ((_ref = event.which) === 0 || _ref === 1) {
      if (this.section && this.section.mouseUp) {
        this.section.mouseUp(e);
      }
    }
    return event.preventDefault();
  };

  App.prototype._onMouseWheel = function(e) {
    var deltaX, deltaY;
    deltaY = e.originalEvent.deltaY || -e.originalEvent.wheelDeltaY || e.deltaY;
    deltaX = e.originalEvent.deltaX || -e.originalEvent.wheelDeltaX || e.deltaX;
    if (this.section && this.section.mouseWheel) {
      this.section.mouseWheel(deltaX, deltaY);
      return e.preventDefault();
    }
  };

  App.prototype._onKeyDown = function(e) {};

  App.prototype._onResize = function() {
    W.sw = screen.width;
    W.sh = screen.height;
    W.ww = W.window.width();
    W.wh = W.window.height();

    /*
    		W.body.css {
    			'height': W.wh
    			'width': W.ww
    		}
     */
    if (this.section && this.section.resize) {
      return this.section.resize();
    }
  };

  App.prototype.update = function() {
    if (this.section && this.section.update) {
      return this.section.update();
    }
  };

  return App;

})();

$(function() {
  var app, tick;
  app = new App();
  return (tick = function() {
    app.update();
    return window.requestAnimationFrame(tick);
  })();
});

Home = (function() {
  function Home() {
    this._initEvents = __bind(this._initEvents, this);
    this.container = $('#home');
    this._initEvents();
  }

  Home.prototype._initEvents = function() {};

  Home.prototype.mouseDown = function(e) {};

  Home.prototype.mouseMove = function(e) {};

  Home.prototype.mouseUp = function(e) {};

  Home.prototype.mouseWheel = function(deltaX, deltaY) {};

  Home.prototype.resize = function() {};

  Home.prototype.update = function() {};

  return Home;

})();

_Journal = (function() {
  function _Journal() {
    console.log('_Journal');
  }

  return _Journal;

})();

transitionsFactory = (function(_super) {
  __extends(transitionsFactory, _super);

  function transitionsFactory() {
    console.log('TransitionsFactory');
  }

  return transitionsFactory;

})(Transitions);
