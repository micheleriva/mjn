# ⚡️ MJN

> Simple pseudo-monad to check if a value exists in an object.

[![Build Status](https://img.shields.io/travis-ci/micheleriva/mjn.svg?style=flat-square)](https://travis-ci.org/micheleriva/mjn)
[![Coverage](https://img.shields.io/codecov/c/github/micheleriva/mjn.svg?style=flat-square)](https://codecov.io/gh/micheleriva/mjn)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)
[![blazing fast](https://img.shields.io/badge/speed-blazing%20%F0%9F%94%A5-brightgreen.svg?style=flat-square)](https://img.shields.io/badge/speed-blazing%20%F0%9F%94%A5-brightgreen.svg?style=flat-square)
[![Library size](https://img.shields.io/bundlephobia/minzip/mjn.svg?style=flat-square)](https://bundlephobia.com/result?p=mjn@latest)

<div style="text-align:center">
  <img src="/docs/mjn.png" align="center" style="max-width:80%;" />
</div>

<p>
No `cannot get property x of undefined`. Just returns `void 0` (undefined) if a value or a key does not exist. Highly inspired from Java's Optional Type.
</p>

# Index

- [Installation](#installation)
- [Usage](#usage)
  - [Simple Example](#simple-example)
  - [Real World React Example](#real-world-react-example)
- [License](#license)

# Installation

**yarn**

```sh
yarn add mjn
```

**npm**

```sh
npm install --save mjn
```

**cdn**

```html
<script src="https://cdn.jsdelivr.net/npm/mjn@latest/dist/dist.min.js"></script>
```

# Usage

### Simple Example

```js
import maybe from "mjn"; // Or import the library as you wish using npm or CDN script tag!

const myObject = {
  user: {
    name: "John",
    surname: "Doe",
    birthday: "1995-01-29",
    contacts: {
      email: "foo@bar.com",
      phone: "000 0000000"
    },
    languages: ["english", "italian"]
  }
};

const a = maybe(myObject, "user.name"); // => John
const b = maybe(myObject, "languages[1]"); // => italian
const c = maybe(myObject, "foo.bar.baz"); // => undefined

if (a) {
  console.log(a); // => John
}

if (b) {
  console.log(b); // => italian
}

if (c) {
  console.log(c); // => won't log anything!
}
```

### Real World React Example

```jsx
import React from "react";
import ReactDOM from "react-dom";
import maybe from "mjn";

const user = {
  name: {
    first_name: "John",
    last_name: "Doe"
  },
  contacts: {
    phone: "+00 000 0000000",
    email: "john@doe.do"
  }
};

const App = () => (
  <div className="App">
    <h1>Hello {maybe(user, "name.first_name")}!</h1>
    <h2> {maybe(user, "contacts.email")} </h2>

    <p>
      {maybe(user, "contacts.phone.office") ||
        "You don't have an office phone."}
    </p>
  </div>
);

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
```

# License

[MIT](/LICENSE.md)
