function(doc, req) {
	// !json templates
	// !code lib/mustache.js
	if (!doc) {
		return 'no-doc' + toJSON(req);
	}
	return Mustache.to_html(templates.head, {title:doc.title})
		+ Mustache.to_html(templates.question_details, doc)
	 	+ Mustache.to_html(templates.foot);
}