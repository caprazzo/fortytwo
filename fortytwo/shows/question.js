function(doc, req) {
	// !json templates
	// !code lib/mustache.js
	
	return Mustache.to_html(templates.question_details, doc);
}