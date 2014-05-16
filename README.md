jquery.shifting.js
===========

### Simple and performant animations based on scroll position

As [Goorgen](https://www.youtube.com/watch?v=1gYE5TyijxE) said
> Shift it, shift it in Forward
> Shift it, shift it in Reverse
> _[...]_
> I believe you need my service

This Plugin makes it easy to animate elements when scrolling through your page. It uses performant CSS `transform()` to guarantee a stable and high FPS even on Highres-Screens. With a simple JSON Syntax you can define the animation properties for every element you want to animate.

No spamming your HTML with data-attributes.


## Background Knowledge

The duration of an animation is not calculated in Milliseconds. It's relative to your scroll position. An animation starts when the first pixel of the element is visible and ends when it's not visible anymore. So the window height is equal to a duration of 100%. You can change this duration for each animation, e.g. a duration of 50% will be finished if the element passed half the window.

## First Steps

shifting.js is a plugin for jQuery. That said you need to include jQuery first. After that you can initialize the plugin with

``` js	
$.shifting()
```

All your setting will be passed as an object to shifting.js.


## Animations

The animation syntax looks like this:

``` js
$.shifting({
	animation: [
		{
			selector: '#scroll',
			properties: {
				translateY: [0, 100]
			}
		}
	]
});
```

This will animate the element with the ID `scroll`, starting with a y-position of 0 and animate it to a y-position of 100. You can animate the following properties:
`translateX`, `translateY`, `scale`, `rotate`, `opacity`.

You can animate more elements with more properties like this:

``` js
$.shifting({
	animation: [
		{
			selector: '#scrollFade',
			properties: {
				translateY: [0, 100],
				opacity: [1, 0]
			}
		},
		{
			selector: '#zoom',
			properties: {
				zoom: [1, 1.5],
				translateX: [-100, 100],
				opacity: [1, .5]
			}
		},
		{
			selector: '.teaser > h1',
			properties: {
				rotate: [-5, 5],
				translateY: [0, -200]
			}
		},
	]
});
```

There are a few more options besides `selector` and `properties`.

`duration`
percentage (String) like `50%` to change the duration of the animation.
Default: `100%`

`delay`
percentage (String) like `50%` to change when the animation starts
Default: `0%`

`easing`
easing Name (String) to change the easing of the animation.
Values: `linear`, `easeInQuad`, `easeOutQuad`, `easeInOutQuad`
Default: `linear`

An example:

``` js
$.shifting({
	animation: [
		{
			selector: '.scrollUpDown',
			easing: 'easeInQuad',
			duration: '50%',
			properties: {
				translateY: [0, -100]
			}
		},
		{
			selector: '.scrollUpDown',
			easing: 'easeOutQuad'
			duration: '50%',
			delay: '50%',
			properties: {
				translateY: [-100, 0]
			}
		},
	]
});
```

## Options

You can change the updateInterval and the preparing of the elements.

`update`
time (Integer) in ms when the plugin refreshes all values.
Default: `10`
_Note: The Plugin won't react to a scrollEvent. Instead it refreshes all values every XXms.

`prepare`
boolean – If set to `true` the plugin loops first through every animation and sets all properties of all elements to the first value.
Default: `true`

Setting options looks like this:
``` js
$.shifting({
	update: 20,
	prepare: false,
	animation: [
		...
	]
});
```

## Epilogue

I didn't test this as much, there are a few things to do. For example at the moment it only tracks vertical scrolling. Rotating more than 100deg seems to spazz out the element and the JSON structure of the passed object isn't the best. I'm looking forward to make this very useful. KTHXBYE.