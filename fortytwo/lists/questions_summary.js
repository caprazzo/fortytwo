function(head, req) {
	
// !json templates
// !code lib/mustache.js

	start({"headers":{"Content-Type" : "text/html; charset=utf-8"}}); 
	var question = null;
	while (row = getRow()) {
		if (row.value.question) {
			if (question) {
				send(Mustache.to_html(templates.question_list_item, question));
			}
			question = row.value;
			question.answers = 0;
		}
		else if (row.value.answer && question) {
			question.answers++;
		}		
	}
	if (question) {
		send(Mustache.to_html(templates.question_list_item, question));
	}
		
}