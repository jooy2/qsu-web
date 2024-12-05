import assert from 'assert';
import { describe, it } from 'node:test';
import { isBotAgent, isMatchPathname, license, removeLocalePrefix } from '../dist';

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

	it('removeLocalePrefix', () => {
		assert.strictEqual(removeLocalePrefix('user/login', ['ko', 'en']), 'user/login');
		assert.strictEqual(removeLocalePrefix('/user/login', ['ko', 'en']), '/user/login');
		assert.strictEqual(removeLocalePrefix('/ko/user/login', 'ko'), '/user/login');
		assert.strictEqual(removeLocalePrefix('/ko/user/login', ['ko', 'en']), '/user/login');
		assert.strictEqual(removeLocalePrefix('/en/user/login', ['ko', 'en']), '/user/login');
		assert.strictEqual(removeLocalePrefix('/cn/user/login', ['ko', 'en']), '/cn/user/login');
		assert.strictEqual(removeLocalePrefix('ko/user/login', ['ko', 'en']), '/user/login');
		assert.strictEqual(
			removeLocalePrefix('https://qsu.cdget.com/user/login', ['ko', 'en']),
			'https://qsu.cdget.com/user/login'
		);
		assert.strictEqual(
			removeLocalePrefix('https://qsu.cdget.com/ko/user/login', ['ko', 'en']),
			'https://qsu.cdget.com/user/login'
		);
		assert.strictEqual(
			removeLocalePrefix('https://qsu.cdget.com/ko/en/user/login', ['ko', 'en']),
			'https://qsu.cdget.com/en/user/login'
		);
	});

	it('license', () => {
		assert(license({ type: 'mit', author: 'example', yearStart: 2021 }));
		assert(license({ type: 'apache20', author: 'example', yearStart: 2021 }));
	});
});
