function(head, req) {
	
// !json templates
// !code lib/mustache.js

	start({"headers":{"Content-Type" : "text/html; charset=utf-8"}}); 
	while (row = getRow()) {
		send(Mustache.to_html(templates.answer_list_item, row.value));
	}
}