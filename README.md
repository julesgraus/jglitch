# Introduction
Add glitch effects to your project

Notice that I just started this project. More info will be reflected here soon. Project is not ready for use in production environments.

## Requirements
- Vue 3.0+
- Sass

## Installation
Install it via ```npm install jglitch```

## Implementation
Import it and let vue use it like this:
```js
import jglitch from "jglitch"; //Add this
const app = createApp(App); //You should have a line like this already
app.use(jglitch); // Add this.
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
Shows a glitch text with a controller to help you find the correct values for the properties. Only for development purposes
![Text glitch controller](./readme_assets/controller.png)

```js
<glitch-text-controller/>
```
