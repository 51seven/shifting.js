;(function($, window, document, undefined){

	var pluginName = 'shifting',
		defaults = {
			update: 10,
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

		this.init();
	}

	Plugin.prototype = {
		init: function() {
			_self = this;
			_self.prepare();
			setInterval(_self.run, _self.options.update);
		},
		prepare: function() {
			$.each(_self.options.animation, function(e, content) {
				console.log(content.selector);
				$(content.selector).each(function() {
					var properties = {};
					$.each(content.properties, function(property, value) {
						properties[property] = value[0];
					});
					_self.posElement($(this), properties);
				});
			});
		},
		run: function() {
			_self.setProps();
			$.each(_self.options.animation, function(index, value) {
				$(value.selector).each(function() {
					if(elementIsVisible($(this)))
						_self.animate($(this), value.properties, value.duration);
				});
			});
		},
		animate: function($el, properties, duration) {
			var processHeight = (_self.props.windowHeight * percentageToMathExp(duration)) + $el.outerHeight();
			var process = (_self.props.windowHeight + _self.props.scrollTop) - $el.offset().top;
			var newProperties={};
			$.each(properties, function(property, value) {
				var toFix;
				if(property == 'opacity' || property == 'scale')
					toFix = 3;
				else
					toFix = 1;

				newProperties[property] = easeInOutQuad(process, value[0], value[1] - value[0], processHeight).toFixed(toFix);
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

	function easeInOutQuad(t, b, c, d) { // elapsed, start, end, total
		return -c/2 * (Math.cos(Math.PI*t/d) - 1) + b;
		//if ((t/=d/2) < 1) return c/2*t*t + b;
		//return -c/2 * ((--t)*(t-2) - 1) + b;
	}

	function elementIsVisible($el) {
		// Credits go to Steven Wade, a Pretty Awesome Dude, I guess.
		// https://coderwall.com/p/fnvjvg
		var viewport = {
			top: _self.props.scrollTop,
			left: _self.props.scrollLeft,
			right: _self.props.scrollLeft + _self.props.windowWidth,
			bottom: _self.props.scrollTop + _self.props.windowHeight
		};

		var bounds = $el.offset();
		bounds.right = bounds.left + $el.outerWidth();
		bounds.bottom = bounds.top + $el.outerHeight();

		return (!(viewport.right < bounds.left || viewport.left > bounds.right || viewport.bottom < bounds.top || viewport.top > bounds.bottom));
	}

	function percentageToMathExp(perc) {
		return parseInt(perc, 10) / 100;
	}
	
})(jQuery, window, document);

// init: Exec run every x ms
// run: - check window height
//		- loop through all elements
//			- check if element is visible
//			- if visible, start with duration
//				- translate sizes