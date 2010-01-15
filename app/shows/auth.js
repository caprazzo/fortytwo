function(doc, req) {
	// !json templates
	// !code config/config.js
	// !code lib/mustache.js	
	
	var base = merge(url_info(req), auth_info(req), CFG.path);
	function html(template, mod) {
		return Mustache.to_html(template, mod ? merge(base, mod) : base);
	}
	
	return html(templates.app_head, {title:'login or signup'})
		+ html(templates.auth_page)
	 	+ html(templates.app_foot);
}