# Node Express demo

## Branches:

- hello-world
- counters-apis
- counters-database
- counters-database-cloud
- ES6-syntax

## ES6 syntax

Node 14 supports ES6 syntax so that we can use the same syntax for the backend and for the frontend.

To activate "import" keyword, we need this settings:
- package.json:
```javascript
 "type": "module",
```

Now we can use import and export statements:
```javascript
import express from "express";
import cors from "cors";
import db from "./models/index.js";
```

```javascript
export default db;
```

```javascript
export default (sequelize, Sequelize) => {
  return sequelize.define(
    "counter",
    {
      value: {
        type: Sequelize.INTEGER,
      },
      liked: {
        type: Sequelize.BOOLEAN,
      },
    },
    { createdAt: false, updatedAt: false }
  );
};
```