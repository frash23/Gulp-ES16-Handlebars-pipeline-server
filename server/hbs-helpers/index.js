"use strict";

var fs = require('fs');

/* A reference to the express server (set later) */
var app;

/* Namespace for express-handlebars helpers */
var h = {};

h.faq = function() {

	/* handlebars don't support async operations, so we're caching the value of the file */
	if(!h.faq.faqCache) {
		h.faq.faqCache = JSON.parse( fs.readFileSync('faq.json', { encoding: 'utf-8' }) );
		setTimeout( ()=> h.faq.faqCache = null, 2000 );
	}

	var faq = h.faq.faqCache.map(v=> `<br><b>${v.q}</b><br>${v.a}<br>`).join('');
	
	return faq;
};

/* We want to be able to reference some variables from the main script, which are passed as an
 * argument here and set so the above functions can use them */
module.exports = function(_app) {
	app = _app;

	return h;
};
