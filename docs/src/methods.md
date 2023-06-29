# Methods

## `_.isBotAgent (boolean)`

Analyze the user agent value to determine if it's a bot for a search engine. Returns `true` if it's a bot.

- `userAgent::string`

```javascript
_.isBotAgent('Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)'); // Returns true
```

## `_.license (string)`

Returns text in a specific license format based on the author information of the given argument. The argument uses the Object type.

- `options::LicenseOption{ author: string, email: string?, yearStart: string|number, yearEnd: string?, htmlBr: boolean?, type: 'mit' | 'apache20' }`

```javascript
_.license({
	holder: 'example',
	email: 'example@example.com',
	yearStart: 2020,
	yearEnd: 2021,
	htmlBr: true
});
```
