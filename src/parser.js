'use strict';

class Parser {
	constructor(text, entities) {
		this.text = text;
		this.entities = entities;
		this.entityType = {
			'entity': this.constructor.entity,
			'twitter_username': this.constructor.username,
			'link': this.constructor.link
		};
	}

	parseText() {
		const newEntityData = this.entities.sort((a, b) => { return b.end - a.end });
		for (const item of newEntityData) {
			this.text = this.constructor.parseEntity(this.text, item, this.entityType);
		}
		return this.text;
	}

	static parseEntity(text, item, entityType) {
		return entityType[item.value](text, item);
	}

	static entity(text, item) {
		let selected = text.substring(item.start, item.end);
		text = text.replace(selected, `<strong>${selected}</strong>`);
		return text;
	}

	static username(text, item) {
		let selected = text.substring(item.start + 1, item.end);
		text = text.replace(selected, `<a href="http://twitter.com/${selected}">${selected}</a>`);
		return text;
	}

	static link(text, item) {
		let selected = text.substring(item.start, item.end);
		text = text.replace(selected, `<a href="${selected}">${selected}</a>`);
		return text;
	}
};

module.exports = Parser;
