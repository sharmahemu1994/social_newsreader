const getText = require('./getText');
const getEntity = require('./getEntity');

const parsetext = (text, entities) => {
	let newEntityData = entities.sort((a, b) => { return b.end - a.end });
	for (const item of newEntityData) {
		text = parseEntity(text, item);
	}
	return text;
}

// function parseEntity(text, item) {
// 	var entityType;
// 	function entity() {
// 		let selected = text.substring(item.start, item.end);
// 		text = text.replace(selected, `<strong>${selected}</strong>`);
// 		return text;
// 	}
// 	function username() {
// 		let selected = text.substring(item.start + 1, item.end);
// 		text = text.replace(selected, `<a href='http://twitter.com/${selected}'>${selected}</a>`);
// 		return text;
// 	}
// 	function link() {
// 		let selected = text.substring(item.start, item.end);
// 		text = text.replace(selected, `@<a href='${selected}'>${selected}</a>`);
// 		return text;
// 	}
// 	var entityType = {
// 		'entity': entity,
// 		'twitter_username': username,
// 		'link': link,
// 	};
// 	return entityType[item.value]();
// }

const cases = {
	'entity': entity,
	'twitter_username': username,
	'link': link,
}

function entity(text, item) {
	let selected = text.substring(item.start, item.end);
	text = text.replace(selected, `<strong>${selected}</strong>`);
	return text;
}
function username(text, item) {
	let selected = text.substring(item.start + 1, item.end);
	text = text.replace(selected, `<a href="http://twitter.com/${selected}">${selected}</a>`);
	return text;
}
function link(text, item) {
	let selected = text.substring(item.start, item.end);
	text = text.replace(selected, `<a href="${selected}">${selected}</a>`);
	return text;
}

function parseEntity(text, item) {
	return cases[item.value](text, item);
}

console.log(parsetext(getText.getText(), getEntity.getEntities()));
