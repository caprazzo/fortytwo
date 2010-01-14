function(doc, req) {
	// !json templates
	// !code lib/pages.js
	// !code lib/mustache.js
	
	return Mustache.to_html(templates.app_head, pages(req, {title:'login or signup'}))
		+ Mustache.to_html(templates.auth_page, pages(req))
	 	+ Mustache.to_html(templates.app_foot, pages(req));
}