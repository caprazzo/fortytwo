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
	// !code lib/mustache.js
	
	return Mustache.to_html(templates.app_head, {title:'title'})
		+ Mustache.to_html(templates.results, {q:req.query.q})
	 	+ Mustache.to_html(templates.app_foot);
}