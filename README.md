# Introduction
Add glitch effects to your project

Notice that I just started this project. More info will be reflected here soon. Project is not ready for use in production environments.

## Requirements
- vue ^3.2.26
- node-sass" ^4.12.0 
- typescript ^4.5.4

## Installation
Install it via ```npm install jglitch```

## Implementation
Import it and let vue use it like this:
```js
import jglitch from "jglitch"; //Add this
const app = createApp(App); //You should have a line like this already
app.use(jglitch); // Add this.
```
In your sass files you can choose to load all styles for all components like this:
```sass
@import "~jglitch/src/style";
```
Or just for a specific vue component only like this:
```sass
@import "~jglitch/src/style/text/text";
```

## Usage
### Text glitch
Shows a text that has a broken, shaky look.\
![Text glitch](./readme_assets/glitch_text.gif)

Add this to your vue component's template to show a glitching text:

```js
<glitch-text value="glitch"/>
```
The value will be the text that is shown.

#### Properties
You can pass in props to the component. Here is a list of them:

| Property                 | Decription                                                                                                      | Type     | Required | Default           |
|--------------------------|-----------------------------------------------------------------------------------------------------------------|----------|----------|-------------------|
| value                    | The text to display                                                                                             | String   | yes      | n/a               |
| enabled                  | Enables the glitch effect or not                                                                                | Boolean  | no       | true              |
| intensity                | How intense the glitch shakes in em's. Overrides css variable "--intensity" Recommended range: 0.001 - 0.05     | Number   | no       | n/a               |
| hover-intensity          | How intense the glitch shakes in em's when hovering over it. Overrides css variable "--hover-intensity"         | Number   | no       | n/a               |
| block-name               | Them block part of the BEM class names that will be used.                                                       | String   | no       | "jgt"             |
| element-name             | The element part of the BEM class names that will be used.                                                      | String   | no       | "word"            |
| glitch-modifier-name     | The modifier part that of the BEM class names that will be used, when "enabled" property is true                | String   | no       | "glitch"          |
| glitch-element-modifiers | The modifier parts that of the BEM class names that will be used on the span elements that emphasize the glitch | String[] | no       | ["bottom", "top"] |

### Text glitch controller
Shows a glitch text with a controller to help you find the correct code to implement it. it is meant only for development purposes:\
![Text glitch controller](./readme_assets/controller.png)

Add this to your vue component's template to show the controller:
```js
<glitch-text-controller/>
```

## Customisation
You can customize the components to your likings by importing specific sass files and override others. 
Just open one of the pre-made ones to see what's imported, and what you want to override. You'll find them in the directory
```~jglitch/src/style/```. Remember, the tilde `~`refers to the ```node_modules``` folder.\
\
Say you want to edit the default glitching red and blue colors of the [Glitch text component](#text-glitch). For that you need to
have a look at its sass file ```~jglitch/src/style/text/text``` to discover that it imports a ```variables``` sass file in which
the colors are configured. So to customize them you'll could do it like this:
1. In your projects sass file, you'll first need to configure the variables you'd want to override.
2. Then you'll need to import the components sass file ```~jglitch/src/style/text/text```. It could look like this.

```sass
//Your projects other sass code here
$jgt-top-glitch-color: #5157dc;
$jgt-bottom-glitch-color: #3ea630;
@import "~jglitch/src/style/text/text";
```
Feel free to import stuff or leave it out if you want to customize it yourself. It's up to you.
