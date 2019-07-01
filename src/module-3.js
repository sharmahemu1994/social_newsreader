'use strict';

const Validation = require('./validation');
const Parser = require('./parser');

class Parse {
	constructor(text, entities) {
		this.text = text;
		this.entities = entities;
	}

	getParsedText() {
		try {
			this.constructor.getValidation(this.text, this.entities);
		} catch (err) {
			throw err;
		}
		const parser = new Parser(this.text, this.entities);
		return parser.parseText();
	}

	static getValidation(text, entities) {
		const textValidation = new Validation(text, 'text');
		const textValidateData = textValidation.validate();
		if (!textValidateData.status) throw new Error(textValidateData.message);

		const entitiesValidation = new Validation(entities, 'entities');
		const entitiesValidateData = entitiesValidation.validate();
		if (!entitiesValidateData.status) throw new Error(entitiesValidateData.message);
	}
};

module.exports = Parse;
