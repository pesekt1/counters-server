# Node Express demo

## Hello world
running on a specified localhost port and showing "hello world"

- run locally
- deploy to Heroku cloud

#

- Create the app folder
- generate package.json:
```
npm init --yes
```

- instal express dependency:

```
npm i express
```

- index.js:
```javascript
const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("Hello World!");
});

const port = process.env.PORT || 3001;

app.listen(port, () => {
  console.log(`Example app listening at ${port}`);
});
```

- to run on Heroku we need to define scripts: because Heroku is starting our app by default with "npm start"

package.json:
```javascript
  "scripts": {
    "start": "node index.js"
  },
```
