/**
	Displays the "ask question form", <strong>remember to invoke with an existing document id</strong>
	@name ask
	@class
	@memberOf shows
*/
function(doc, req) {
	// !json templates
	// !code lib/mustache.js
	
	return Mustache.to_html(templates.app_head, {title:'ask question'})
		+ Mustache.to_html(templates.question_form)
	 	+ Mustache.to_html(templates.app_foot);
}