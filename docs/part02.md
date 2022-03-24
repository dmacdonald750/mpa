# Part 2


## Adding dotenv

DotEnv is a lightweight npm package that automatically loads environment variables from a .env file into the process.env object. Storing configuration in the environment separate from code is based on [The Twelve-Factor App](http://12factor.net/config) methodology.

Install the package

```
npm install dotenv
```

Create a `.env` file in the project root directory

```
PORT=5000
DB=books.json
```

Add `.env` to the `.gitignore` file.

In `server.js` import and configure dotenv

```js
require('dotenv').config();
```

Now in `server.js` make use of the PORT

```js
let port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`App is listening on port ${port}`);
});
```

and DB environment variables.

```js
  const filename = process.env.DB || 'docs.json';
  const datafile = path.join(__dirname, filename);
```

## Validation and Sanitization

## Pagination

```
npm install jw-paginate
```

`bookController.js`

```js
const paginate = require('jw-paginate');
```

## Search