function(head, req) {

// !json templates
// !code lib/mustache.js	

	start({"headers":{"Content-Type" : "text/html; charset=utf-8"}});
	
	var question_doc;
	while(row = getRow()) {
		if (row.value.question) {
			question_doc = row.value;
			send(Mustache.to_html(templates.head, {title:question_doc.question}));
			send(Mustache.to_html(templates.question_detail, question_doc));
			send(Mustache.to_html(templates.answers.list_head));
		}
		else {
			send(Mustache.to_html(templates.answers.list_item, row.value));
		}
	}	
	send(Mustache.to_html(templates.answers.list_foot));
	send(Mustache.to_html(templates.answer_form, question_doc));
	send(Mustache.to_html(templates.foot));
}