/**
	Displays the "ask question form", <strong>remember to invoke with a document id, even bogus</strong>
	@name ask
	@class
	@memberOf shows
*/
function(doc, req) {
	// !json templates
	// !code lib/mustache.js
	// !code lib/pages.js
	
	return Mustache.to_html(templates.app_head, pages(req, {title:'ask question'}))
		+ Mustache.to_html(templates.question_form, pages(req))
	 	+ Mustache.to_html(templates.app_foot, pages(req));
}