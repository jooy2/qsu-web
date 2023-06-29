import assert from 'assert';
import { isBotAgent, license } from '../dist';

describe('Qsu web test', () => {
	it('isBotAgent', (done) => {
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
		done();
	});

	it('license', (done) => {
		assert(license({ type: 'mit', author: 'example', yearStart: 2021 }));
		assert(license({ type: 'apache20', author: 'example', yearStart: 2021 }));
		done();
	});
});
