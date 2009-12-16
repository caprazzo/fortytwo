function(head, req) {
	
// !json templates
// !code lib/mustache.js
	
	start({"headers":{"Content-Type" : "text/html; charset=utf-8"}}); 
	log(head);
	log(req);
	send(Mustache.to_html(templates.answers.list_head, head));
	while (row = getRow()) {
		send(Mustache.to_html(templates.answers.list_item, row.value));
	}
	send(Mustache.to_html(templates.answers.list_foot));
}