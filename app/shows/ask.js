function(doc, req) {
	// !json templates
	// !code lib/mustache.js
	
	return Mustache.to_html(templates.head, {title:'ask question'})
		+ Mustache.to_html(templates.ask)
	 	+ Mustache.to_html(templates.foot);
}