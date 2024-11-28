import assert from 'assert';
import { describe, it } from 'node:test';
import { isBotAgent, isMatchPathname, license } from '../dist';

describe('Qsu web test', () => {
	it('isBotAgent', () => {
		assert.strictEqual(
			isBotAgent('Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html'),
			true
		);
		assert.strictEqual(
			isBotAgent(
				'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
			),
			false
		);
	});

	it('isMatchPathname', () => {
		assert.strictEqual(isMatchPathname('/user/login', '/admin'), false);
		assert.strictEqual(isMatchPathname('/user/login', '/user'), false);
		assert.strictEqual(isMatchPathname('/user/login', '/user/*'), true);
		assert.strictEqual(isMatchPathname('/user/login', '/user/login/*'), false);
		assert.strictEqual(isMatchPathname('/user/login', '/user/login*'), true);
		assert.strictEqual(isMatchPathname('/user/login/hello', '/user/login*'), true);
		assert.strictEqual(isMatchPathname('/user/login', ['/test', '/home/hello', '/user/*']), true);
		assert.strictEqual(
			isMatchPathname('/user/login', ['/test', '/home/hello', '/user/login']),
			true
		);
		assert.strictEqual(isMatchPathname('/admin/hello/world', ['/admin/hello/']), false);
		assert.strictEqual(isMatchPathname('/admin/hello/world', ['/admin/hello/world']), true);
		assert.strictEqual(isMatchPathname('/admin/hello/world', ['/admin/*']), true);
		assert.strictEqual(isMatchPathname('/admin/hello/world', ['*']), true);
	});

	it('license', () => {
		assert(license({ type: 'mit', author: 'example', yearStart: 2021 }));
		assert(license({ type: 'apache20', author: 'example', yearStart: 2021 }));
	});
});
