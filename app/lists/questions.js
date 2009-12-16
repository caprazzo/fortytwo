function(head, req) {
	
// !json templates
// !code lib/mustache.js

	start({"headers":{"Content-Type" : "text/html; charset=utf-8"}});

	
	send(Mustache.to_html(templates.head, {title:"questions"}));
	send(Mustache.to_html(templates.questions.list_head));
	answers = 0;
	while (row = getRow()) {
		if (row.value.answer) {
			answers++;
		}	
		else if (row.value) {
			var question = row.value;
			question.answers = answers;
			send(Mustache.to_html(templates.questions.list_item, question));
			answers = 0;
		} 	
	}
	/*
	if (question) {
		question.relative_date = '300s ago';
		question.answers = ans
		send(Mustache.to_html(templates.question_list_item, question));
	}
	*/
	send(Mustache.to_html(templates.questions.list_foot));
	send(Mustache.to_html(templates.foot),{});
		
}