;(function($, window, document, undefined){
	var pluginName = 'shifting',
		defaults = {
			fade: false
		};

	function Plugin(element, options) {
		this.element = element;
		this.options = $.extend({}, defaults, options);

		this._defaults = defaults;
		this._name = pluginName;

		this.init();
	}

	Plugin.prototype = {
		init: function() {
			self = this,
			get = this._getter();

			if($.inArray(get.el.css('position'), ['absolute', 'relative']) < 0)
				get.el.css('position', 'relative');

			this._scroll();
			get.el.find('[data-parallax-fade]').each(function() {
				self._fade(this);
			})
		},
		_getter: function() {
			var $el = $(this.element);
			return {
				"el": $el,
				"add": $el.css('top') != 'auto' ? parseInt($el.css('top'), 10) : 0,
				"ratio": $el.data('parallax')
			}
		},
		_scroll: function() {
			$(window).bind('scroll', function() {
				var top = $(window).scrollTop();
				get.el.css('top', get.add + top/(1/get.ratio));
			});
		},
		_fade: function(el) {
			var $el = $(el);
			$el.css('opacity', self._visible(el));

			$(window).bind('scroll', function() {
				$el.css('opacity', self._visible(el));
			});
		},
		_visible: function(el) {
			var $el = $(el);
			if($el.data('parallax-parent'))
				var $parent = $($el.data('parallax-parent'));
			else
				var $parent = $el.parent();
				
			var parentSizes = {
					"height": $parent.outerHeight(),
					"top": $parent.offset().top
				},
				elSizes = {
					"height": $el.outerHeight(),
					"top": $el.offset().top
				},
				offset = $el.data('parallax-fade-offset'),
				fadeOffset = offset ? offset : 0,
				parentBottom = parentSizes.height + parentSizes.top,
				elBottom = elSizes.height + elSizes.top,
				fadeRatio = $el.data('parallax-fade-ratio') ? $el.data('parallax-fade-ratio') : 1;
			
			if(parentBottom < elBottom)
				var visible = Math.pow(((parentBottom - fadeOffset - elSizes.top) / elSizes.height), fadeRatio);
				
			else if(elSizes.top < parentSizes.top)
				var visible = Math.pow(1 - (((parentSizes.top + fadeOffset) - elSizes.top) / elSizes.height), fadeRatio);

			if(visible < 0) visible = 0;
			else if(visible > 1) visible = 1;

			return visible;
		}
	}
	
	$.fn[pluginName] = function(options) {
		return this.find('[data-parallax]').each(function() {
			if(!$.data(this, 'plugin_', + pluginName)) {
				$.data(this, 'plugin_', + pluginName,
				new Plugin(this, options));
			}
		});
	}
	
})(jQuery, window, document);