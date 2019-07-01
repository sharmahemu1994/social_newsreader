'use strict';

class Validation {
	constructor(value, type) {
		this.value = value;
		this.type = type;
	}

	validate() {
		return this.constructor[this.type](this.value);
	}

	static text(value) {
		const validatedText = value && typeof (value) === 'string' && value.trim().length > 0 ? value : false;
		if (!validatedText) return {
			status: false,
			message: 'Text is required'
		};

		return {
			status: true,
			message: 'Validated'
		};
	}

	static entities(value) {
		const validatedEntities = value && value instanceof Array ? value : false;
		if (!validatedEntities) return {
			status: false,
			message: 'Entities should be array'
		};
		for (let item of value) {
			let start = typeof (item.start) === 'number' ? true : false;
			let end = typeof (item.end) === 'number' ? true : false;
			let type = item.value && typeof (item.value) === 'string' ? true : false;

			if (!start || !end || !type) return {
				status: false,
				message: 'Entities format is not valid'
			};
		}
		return {
			status: true,
			message: 'Validated'
		};
	}
};

module.exports = Validation;
