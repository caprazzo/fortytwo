/**
	Displays the "ask question form", <strong>remember to invoke with a document id, even bogus</strong>
	@name ask
	@class
	@memberOf shows
*/
function(doc, req) {
	// !json templates
	// !code lib/mustache.js
	
	return Mustache.to_html(templates.head, {title:'ask question'})
		+ Mustache.to_html(templates.ask)
	 	+ Mustache.to_html(templates.foot);
}