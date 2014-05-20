// TODO
// - horizontal scrolling
// - easing functions
// - two animation on one element simultaneously -> only animate single properties at once
// - rotation miscalculations
// - opacity sometimes get stuck on 0.01

;(function($, window, document, undefined){

	var pluginName = 'shifting',
		defaults = {
			update: 10,
			prepare: true,
			animation: {}
		},
		_self = {};

	function Plugin(options) {
		this.options = $.extend({}, defaults, options);

		this._defaults = defaults;
		this._name = pluginName;
		this.props = {
			windowHeight: 0,
			windowWidth:  0,
			scrollTop:    0,
			scrollLeft:   0
		};
		this.elDefault = {
			selector: '',
			duration: '100%',
			delay: '0%',
			easing: 'linear'
		};

		this.init();
	}

	Plugin.prototype = {
		init: function() {
			_self = this;
			if(_self.options.prepare)
				_self.prepare();
			setInterval(_self.run, _self.options.update);
		},
		prepare: function() {
			$.each(_self.options.animation, function(e, content) {
				$(content.selector).each(function() {
					var properties = {};
					$.each(content.properties, function(property, value) {
						properties[property] = value[0];
					});
					if(!$(this).data(_self._name+'_prepared'))
						_self.posElement($(this), properties);
					$(this).data(_self._name+'_prepared', 'true');
				});
			});
		},
		run: function() {
			_self.setProps();
			$.each(_self.options.animation, function(index, value) {
				$(value.selector).each(function() {
					$this = $(this);
					$(this).elementIsVisible(function() {
						var newValue = $.extend(_self.elDefault, value);
						var processDelay = _self.props.windowHeight * percentageToMathExp(newValue.delay);
						var processHeight = _self.props.windowHeight * percentageToMathExp(newValue.duration);
						var process = (_self.props.windowHeight + _self.props.scrollTop) - $this.offset().top;
						console.log('total: '+processHeight+' – progress: '+process+' – delay: '+processDelay);
						if(processHeight + processDelay > process && process > processDelay)
							_self.animate($this, newValue.easing, newValue.properties, processHeight, process - processDelay);
					});
				});
			});
		},
		animate: function($el, easing, properties, total, process) {
			var newProperties = {};
			$.each(properties, function(property, value) {
				var toFix;
				if(property == 'opacity' || property == 'scale')
					toFix = 3;
				else
					toFix = 1;
				newProperties[property] = calcEase(easing, process, value[0], value[1] - value[0], total).toFixed(toFix);
			});
			_self.posElement($el, newProperties);
		},
		posElement: function($el, properties) {
			var allProperties = $.extend(
				{
					translateX: 0,
					translateY: 0,
					scale: 1,
					rotate: 0,
					opacity: 1
				},
				properties
			);
			$el.css({
				'transform': 'translate3d(' + allProperties.translateX + 'px, ' + allProperties.translateY + 'px, 0) scale(' + allProperties.scale + ') rotate(' + allProperties.rotate + 'deg)',
				'opacity': allProperties.opacity
			});
		},
		setProps: function() {
			_self.props.windowHeight = window.innerHeight;
			_self.props.windowWidth  = window.innerWidth;
			_self.props.scrollTop    = $(document).scrollTop();
			_self.props.scrollLeft   = $(document).scrollLeft();
		}
	};
	
	$[pluginName] = function(options) {
		return new Plugin(options);
	};

	function calcEase(type, t, b, c, d) { // type, elapsed, start, end, total
		switch (type) {
			case 'linear':
				return c * t/d + b;
			case 'easeInQuad':
				t = t / d;
				return -c * t*(t-2) + b;
			case 'easeOutQuad':
				t = t / d;
				return -c * t*(t-2) + b;
			case 'easeInOutQuad':
				t = t / (d/2);
				if(t < 1) return c/2*t*t + b;
				t--;
				return -c/2 * (t*(t-2) -1) + b;
			default:
				return c * t/d + b;
		}
	}

	$.fn.elementIsVisible = function(callback) {
		// Credits go to Steven Wade, a Pretty Awesome Dude, I guess.
		// https://coderwall.com/p/fnvjvg
		var viewport = {
			top: _self.props.scrollTop,
			left: _self.props.scrollLeft,
			right: _self.props.scrollLeft + _self.props.windowWidth,
			bottom: _self.props.scrollTop + _self.props.windowHeight
		};

		var bounds = $(this).offset();
		bounds.right = bounds.left + $(this).outerWidth();
		bounds.bottom = bounds.top + $(this).outerHeight();

		if(!(viewport.right < bounds.left || viewport.left > bounds.right || viewport.bottom < bounds.top || viewport.top > bounds.bottom))
			callback();
	};

	function percentageToMathExp(perc) {
		return parseInt(perc, 10) / 100;
	}
	
})(jQuery, window, document);