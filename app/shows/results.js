/**
	Displays the search results templates, which in short is some clientside javascript code
	that executes the _fti (couchdb-lucene) handler and renders the results. This is needed because
	couchdb-lucene can't be rendered with a list function.
	@name results
	@class
	@memberOf shows
*/
function(doc, req) {
	
	// !json templates
	// !code config/config.js
	// !code lib/mustache.js	
	// !code lib/showdown.js
	
	var base = merge(url_info(req), CFG.path);
	function html(template, mod) {
		return Mustache.to_html(template, mod ? merge(base, mod) : base);
	}
	
	return html(templates.app_head, {title:'search results'})
		+ html(templates.results, {q:req.query.q})
	 	+ html(templates.app_foot);
}