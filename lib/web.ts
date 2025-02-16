import type { LicenseOption } from './types.js';

export function isMatchPathname(pathname: string, matcher: string | string[]): boolean {
	if (!pathname || !matcher || matcher?.length < 1) {
		throw new Error('`url` and `matcher` must be set');
	}

	const matcherSet = typeof matcher === 'string' ? [matcher] : matcher;
	const realPathname = pathname.split('?')[0].replace(/\/$/, '');

	return matcherSet.some((m) => {
		if (m === '*' || m === '/*') {
			return true;
		}

		const realMatcher = m.replace(/\*$/, '');

		return m.endsWith('*') ? realPathname.startsWith(realMatcher) : realMatcher === realPathname;
	});
}

export function isBotAgent(userAgent: string): boolean {
	return /bot|naverbot|google|Googlebot|Googlebot-Mobile|Googlebot-Image|Google favicon|Chrome-Lighthouse|Mediapartners-Google|bingbot|slurp|java|wget|curl|Commons-HttpClient|Python-urllib|libwww|httpunit|nutch|phpcrawl|msnbot|jyxobot|FAST-WebCrawler|FAST Enterprise Crawler|biglotron|teoma|convera|seekbot|gigablast|exabot|ngbot|ia_archiver|GingerCrawler|webmon |httrack|webcrawler|grub.org|UsineNouvelleCrawler|antibot|netresearchserver|speedy|fluffy|bibnum.bnf|findlink|msrbot|panscient|yacybot|AISearchBot|IOI|ips-agent|tagoobot|MJ12bot|dotbot|woriobot|yanga|buzzbot|mlbot|yandexbot|purebot|Linguee Bot|Voyager|CyberPatrol|voilabot|baiduspider|citeseerxbot|spbot|twengabot|postrank|turnitinbot|scribdbot|page2rss|sitebot|linkdex|Adidxbot|blekkobot|ezooms|Mail.RU_Bot|discobot|heritrix|findthatfile|europarchive.org|NerdByNature.Bot|sistrix crawler|ahrefsbot|Aboundex|domaincrawler|wbsearchbot|summify|ccbot|edisterbot|seznambot|ec2linkfinder|gslfbot|aihitbot|intelium_bot|facebookexternalhit|yeti|RetrevoPageAnalyzer|lb-spider|sogou|lssbot|careerbot|wotbox|wocbot|ichiro|DuckDuckBot|lssrocketcrawler|drupact|webcompanycrawler|acoonbot|openindexspider|gnam gnam spider|web-archive-net.com.bot|backlinkcrawler|coccoc|integromedb|content crawler spider|toplistbot|seokicks-robot|it2media-domain-crawler|ip-web-crawler.com|siteexplorer.info|elisabot|proximic|changedetection|blexbot|arabot|WeSEE:Search|niki-bot|CrystalSemanticsBot|rogerbot|360Spider|psbot|InterfaxScanBot|Lipperhey SEO Service|CC Metadata Scaper|g00g1e.net|GrapeshotCrawler|urlappendbot|brainobot|fr-crawler|binlar|SimpleCrawler|Livelapbot|Twitterbot|cXensebot|smtbot|bnf.fr_bot|A6-Indexer|ADmantX|Facebot|OrangeBot|memorybot|AdvBot|MegaIndex|SemanticScholarBot|ltx71|nerdybot|xovibot|BUbiNG|Qwantify|archive.org_bot|Applebot|TweetmemeBot|crawler4j|findxbot|SemrushBot|yoozBot|lipperhey|y!j-asr|Domain Re-Animator Bot|AddThis/i.test(
		userAgent
	);
}

export function removeLocalePrefix(urlOrPathname: string, locales: string | string[]): string {
	const localeLists = Array.isArray(locales) ? locales : [locales];

	if (localeLists.includes(urlOrPathname.replace(/^\//, ''))) {
		return '';
	}

	if (urlOrPathname === '/') {
		return '/';
	}

	const joinLocaleLists = localeLists.join('|');

	try {
		const urlObj = new URL(urlOrPathname);

		if (urlObj.pathname === '/' || localeLists.includes(urlObj.pathname.replace(/^\//, ''))) {
			return urlObj.origin;
		}

		return `${urlObj.origin}${urlObj.pathname.replace(new RegExp(`^/(${joinLocaleLists})/`), '/')}`.replace(
			/\/$/,
			''
		);
	} catch {
		let realPathname = urlOrPathname;

		if (!realPathname.startsWith('/')) {
			realPathname = `/${realPathname}`;
		}

		if (realPathname.endsWith('/')) {
			realPathname = realPathname.replace(/\/$/, '');
		}

		if (new RegExp(`^/(${joinLocaleLists})$`).test(realPathname)) {
			return '/';
		}

		return realPathname.replace(new RegExp(`^/(${joinLocaleLists})/`), '/');
	}
}

export function license(options: LicenseOption): string {
	const br = options.htmlBr ? '<br/>' : '\n';
	const yearString = `${options.yearStart}${options.yearEnd ? `-${options.yearEnd}` : ''}`;
	const authorString = `${options.author}${options.email ? ` <${options.email}>` : ''}`;

	switch (options.type.replace(/\.-_,\s/g, '').toLowerCase()) {
		case 'apache20':
			return `Copyright ${yearString} ${authorString}${br}${br}Licensed under the Apache License, Version 2.0 (the "License");${br}you may not use this file except in compliance with the License.${br}You may obtain a copy of the License at${br}${br}    http://www.apache.org/licenses/LICENSE-2.0${br}${br}Unless required by applicable law or agreed to in writing, software${br}distributed under the License is distributed on an "AS IS" BASIS,${br}WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.${br}See the License for the specific language governing permissions and${br}limitations under the License.`;
		case 'mit':
		default:
			return `Copyright (c) ${yearString} ${authorString}${br}${br}Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:${br}${br}The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.${br}${br}THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.`;
	}
}
