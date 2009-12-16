function(head, req) {
	
// !json templates
// !code lib/mustache.js

	start({"headers":{"Content-Type" : "text/html; charset=utf-8"}});

	
	send(Mustache.to_html(templates.head, {title:"questions"}));
	
	answers = 0;
	while (row = getRow()) {
		if (row.value.answer) {
			answers++;
		}	
		else if (row.value) {
			var question = row.value;
			question.relative_date = '200s ago';
			question.answers = answers;
			log({question:question});
			send(Mustache.to_html(templates.question_list_item, question));
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
	
	send(Mustache.to_html(templates.foot),{});
		
}