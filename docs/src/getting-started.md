# Getting Started

## Installation

**qsu-web** requires `Node.js 14.x` or higher, and the repository is serviced through **[NPM](https://npmjs.com)**.

After configuring the node environment, you can simply run the following command.

```bash
# via npm
$ npm install qsu-web

# via yarn
$ yarn add qsu-web

# via pnpm
$ pnpm install qsu-web
```

## How to use

### Using named import (Multiple utilities in a single require) - Recommend

```javascript
import { isBotAgent } from 'qsu-web';

function main() {
	console.log(
		isBotAgent('Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html')
	); // true
}
```

### Using whole class (multiple utilities simultaneously with one object)

```javascript
import _ from 'qsu-web';

function main() {
	console.log(
		_.isBotAgent('Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html')
	); // true
}
```
