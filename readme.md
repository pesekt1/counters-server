# Node Express demo

## Branches:

- hello-world
- counters-apis
- counters-database
- counters-database-cloud
- ES6-syntax

CORS improved:

Add origin variable to config for both default and custom environment variables:

For Heroku:
```javascript
"origin": "ORIGIN"
```
For localhost:
```javascript
"origin": "http://localhost:3000"
```

index.js: dynamically set CORS of the frontend app:
```javascript
//cross origin allowed
app.use(cors({ origin: config.get("origin") }));
```

```javascript

```

```javascript

```