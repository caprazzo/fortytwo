function(doc, req) {
	// !json templates
	// !code lib/mustache.js
	
	return Mustache.to_html(templates.app_head, {title:'ask question'})
		+ Mustache.to_html(templates.login_form)
	 	+ Mustache.to_html(templates.app_foot);
}