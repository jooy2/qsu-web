export interface LicenseOption {
	author: string;
	email?: string;
	yearStart: string | number;
	yearEnd?: string;
	htmlBr?: boolean;
	type: 'mit' | 'apache20';
}
