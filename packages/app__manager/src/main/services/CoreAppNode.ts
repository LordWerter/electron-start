/**
 * imports of packages/modules
 */
import BODY_PARSER from 'body-parser';
import EXPRESS from 'express';
import MORGAN from 'morgan';

export default class CoreAppNode {

	public app: EXPRESS.Application;

	constructor() {
		this.app = EXPRESS();
		this.configAppNode(this.app);
	}

	public configAppNode(AppNode: EXPRESS.Application): void {
		// support application/json type post data
		AppNode.use(BODY_PARSER.json());

		// support application/x-www-form-urlencoded post data
		AppNode.use(BODY_PARSER.urlencoded({ extended: true }));
		AppNode.use(EXPRESS.json());

		AppNode.use(MORGAN('dev'));
	}

}
