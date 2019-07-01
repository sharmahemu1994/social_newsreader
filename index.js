'use strict';

const Module1 = require('./module-1');
const Module2 = require('./module-2');
const Module3 = require('./src/module-3');

const module3 = new Module3(Module1.getText(), Module2.getEntities());

try {
	const parsedText = module3.getParsedText();
	console.log('RESULT:::  ', parsedText);
} catch (error) {
	console.log('ERROR OCCORUED:::   ', error.message);
}
