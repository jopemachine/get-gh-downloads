# get-gh-downloads

[![NPM download total](https://img.shields.io/npm/dt/get-gh-downloads)](http://badge.fury.io/js/get-gh-downloads)
[![NPM version](https://badge.fury.io/js/get-gh-downloads.svg)](http://badge.fury.io/js/get-gh-downloads)
[![MIT license](https://img.shields.io/badge/License-MIT-blue.svg)](https://lbesson.mit-license.org/)

Display github release download count in console (also include lib)

![](./media/demo.png)

## Usage

```js
const getDownloadCount = require('get-gh-downloads');

const data = getDownloadCount({
  userId,
  repository,
  tagName: 'v0.0.1'
});
```

## Usage-cli

```
  Usage

    $ get-gh-downloads [user_id] [repository_name] options

  Options

    $ name
    $ tag
    $ latest

  Example:

    $ get-gh-downloads jopemachine some-lib
    $ get-gh-downloads jopemachine some-lib --name=0.0.1
    $ get-gh-downloads jopemachine some-lib --tag=v0.0.1
    $ get-gh-downloads jopemachine some-lib --latest

  ✔ Works done!

    ╔════════════════════════════════════════════╗
    ║                                            ║
    ║   Name: 0.0.1, Tag: v0.0.1                 ║
    ║   Assets:                                  ║
    ║       some_file.app: 1                     ║
    ║                                            ║
    ║   Total: 1                                 ║
    ║                                            ║
    ╚════════════════════════════════════════════╝

  Total: 1
```
