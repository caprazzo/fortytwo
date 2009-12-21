function(doc, req) {
	// !json templates
	// !code lib/mustache.js
	
	return Mustache.to_html(templates.head, {title:doc.title})
		+ Mustache.to_html(templates.results, {q:req.query.q})
	 	+ Mustache.to_html(templates.foot);
}