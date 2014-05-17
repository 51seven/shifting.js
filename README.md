shifting.js
=========

### Simple and performant scroll animations

> Shift it, shit it in Forward
> 
> Shift it, shift it in Reverse
>
> Domestic or Foreign
>
> I believe you need my service
>
> – _[Goorgen](https://www.youtube.com/watch?v=1gYE5TyijxE)_

shifting.js is a jQuery Plugin which makes it easy to animate elements based on your scroll position. It uses the performant CSS3 `transform` Property to guarantee a stable and high FPS even on Retina-Screens. With a simple JSON Object you can define all your animations without spamming data-attributes all over your HTML.

## Background Knowledge

The duration and process of an animation is based on the window height and scroll position. Every animation starts not until a pixel of the element is visible and the animation will be stopped when it's not visible anymore. The window height is equal to a duration of 100% (of course you can change the duration). Read more to find out how.

## First Steps

Be sure to include jQuery before including shifting.js. You can initialize the Plugin with:
```js
$.shifting();
```

All Your settings will be passed in an object to shifting.js.

## Animations

All animation definitions are are in an array with the key `animation`. In this array every element is an animation for one element. Look at this example:
```js
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

This will bind an animation to the element with the ID of `scroll` in your HTML. It will smoothly animate the Y-Position starting with `0` end ending with `100px`. (The unit is omitted.)

Defining a second animation to this is looks like this:
```js
$.shifting({
    animation: [
        {
            selector: '#scroll',
            properties: {
                translateY: [0, 100]
            }
        },
        {
            selector: '#fadeout',
            properties: {
                translateY: [-10, 10],
                opacity: [100, 0]
            }
        }
    ]
});
```

### Properties

As you can see in the previous example you can set more properties to your animation. Every property expects an array as value with the start value and the end value: `[startValue, endValue]`. All values are specified without units.

#### translateX

Default: `[0, 0]`

Unit: `px`

Range: `-∞ to ∞`

Rouded decimal places: `1`

Moves the element along the x-axis. Use `transform-origin` in your CSS to change its origin.

#### translateY

Default: `[0, 0]`

Unit: `px`

Range: `-∞ to ∞`

Rouded decimal places: `1`

Moves the element along the y-asix. Use `transform-origin` in your CSS to change its origin.

#### scale

Default: `[1, 1]`

Unit: `none`

Range: `0 to ∞`

Rouded decimal places: `3`

Scales the element up and down. Use `transform-origin` in your CSS to change its origin.

#### rotate

Default: `[0, 0]`

Unit: `deg`

Range: `-∞ to ∞`

Rouded decimal places: `1`

Rotates the element. Use `transform-origin` in your CSS to change its origin.

#### opacity

Default: `[1, 1]`

Unit: `none`

Range: `0 to 1`

Rouded decimal places: `3`

Changes the opacity of the element.

### Options

There are a few more options besides `selector` and `properties` you can access.

#### selector

Type: `String`

Default: `''`

The selector of your element. Selector syntax is basic CSS syntax.

#### properties

Type: `Object`

Default: `{}`

The properties you want to animate.

#### duration

Type: `String`

Default: `100%`

The duration of the animation in percent. `100%` is equals to the window height.

#### delay
Type: `String`

Default: `0%`

The delay of the animation in percent. `100%` is equals to the window height. `50%` will start the animation when you have scrolled half the window height – when without the `delay` the animation will be at `50%`, with the `delay` it will be at `0%`.

#### easing
Type: `String`

Default: `linear`

Values: `linear`, `easeInQuad`, `easeOutQuad`, `easeInOutQuad`

The easing function of the animation.

### Example

Here's an example of a more complex animation

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
				opacity: [1, 0]
			}
		},
	]
});
```

## Advanced

shifting.js allows you to define more options on your own for a much better experience*.

\* Advanced options are not really a big thing and aren't very useful at the moment.

### Options

Besides `animation` you can define more options in shifting.js

#### animation

Type: `Array`

Default: `[]`

Definitions of all animations.

#### update

Type: `Integer`

Default: `10`

The interval in `ms` when shifting.js refreshes all element properties. Because of performance optimization shifting.js doesn't update on scroll events.

#### prepare

Type: `Boolean`

Default: `true`

By default shifting.js loops first through all elements you want to animate and set them to their start value. If set to `false` it will skip this step.

### Example

With your special advanced settings initializing shifting.js could look like this:

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

Dear User, this plugin is in a very early alpha state. I didn't test this as much and there are a few things on my TODO list. For example at the moment it only tracks vertical scrolling. If you have a fancy site where you want to scroll horizontal, I'm sorry for you. Rotating more than 100deg will eventually lead the element to spazz out. The JSON structure of the passed object isn't very sophisticated. I'm looking forward to make this thing useful for more cases. KTHXBYE.

## Animation counter

I used 25x `animation` in this documentation. Duh.