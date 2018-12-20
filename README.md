<h1 align="center"> ⚡️ MJN ⚡️ </h1>

<h6 align="center">
Simple pseudo-monad to check if a key or a value exists in an object.
</h6>

<p align="center">
  <a href="https://travis-ci.org/micheleriva/mjn">
    <img src="https://img.shields.io/travis-ci/micheleriva/mjn.svg?style=for-the-badge" alt="Build Status" />
  </a>
  <a href="https://codecov.io/gh/micheleriva/mjn">
    <img src="https://img.shields.io/codecov/c/github/micheleriva/mjn.svg?style=for-the-badge" alt="Coverage" />
  </a>
  <a href="https://github.com/prettier/prettier">
     <img src="https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=for-the-badge" />
  </a>
  <a href="https://img.shields.io/badge/speed-blazing%20%F0%9F%94%A5-brightgreen.svg?style=for-the-badge">
    <img src="https://img.shields.io/badge/speed-blazing%20%F0%9F%94%A5-brightgreen.svg?style=for-the-badge" alt="Blazing Fast" />
  </a>
  <a href="https://bundlephobia.com/result?p=mjn@latest">
    <img src="https://img.shields.io/bundlephobia/minzip/mjn.svg?style=for-the-badge" />
  </a>
</p>

<div align="center">
  <img src="/docs/mjn.png" align="center" style="max-width:80%;" />
</div>

<br /><br />

> No `cannot get property x of undefined`. Just returns `void 0` (undefined) if a value or a key does not exist. Highly inspired from Java's Optional Type.

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

const a = maybe(myObject, "user.name"); // => "John"
const b = maybe(myObject, "user.languages[1]"); // => "italian"
const c = maybe(myObject, "foo.bar.baz"); // => undefined
const d = maybe(myObject, "foo.bar.baz", "no value!") // => "no value!"
condt e = maybe(myObject, "foo.bar.baz", () => "I can be a function!") // "I can be a function!"

if (a) {
  console.log(a); // => John
}

if (b) {
  console.log(b); // => italian
}

if (c) {
  console.log(c); // => won't log anything!
}

if (d) {
  console.log(d); // => "no value!"
}

if (e) {
  console.log(e); // => "I can be a function!"
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
      {maybe(user, "contacts.phone.office", "You don't have an office phone.")}
    </p>
  </div>
);

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
```

# License

[MIT](/LICENSE.md)
