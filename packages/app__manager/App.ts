'use strict';

/**
 * imports of packages/modules
 */
import * as BODY_PARSER from 'body-parser';
import * as EXPRESS from 'express';
import * as MORGAN from 'morgan';

// import * as I18NEXT_MIDDLEWARE from 'i18next-express-middleware';

export default class App {

	public app: EXPRESS.Application;

	constructor() {
		this.app = EXPRESS();
		this.config();
	}

	private config(): void {
		// support application/json type post data
		this.app.use(BODY_PARSER.json());

		// support application/x-www-form-urlencoded post data
		this.app.use(BODY_PARSER.urlencoded({ extended: true }));
		this.app.use(EXPRESS.json());

		this.app.use(MORGAN('dev'));
	}

}
