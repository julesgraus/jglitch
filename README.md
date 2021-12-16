# Introduction
Add glitch effects to your project

Notice that I just started this project. More info will be reflected here soon. Project is not ready for use in production environments.

## installation
For now use ```npm install https://github.com/julesgraus/jglitch```.
Soon you will be able to install it via ```npm install jglitch```

## Configuration
Import it and let vue use it like this:
```js
import jglitch from "jglitch"; //Add this

const app = createApp(App); //You should have a line like this already

app.use(jglitch); // Add this.
```

## Usage
### Text glitch
Add this to your vue component's templates to show a glitching text:

```js
<glitch-text value="glitch"/>
```
The value will be the text that is shown.
