/**
	Used with {@link views.questions}?<strong>descending=true</strong>
	will show most recent questions first and a count of answers for each question.
	@name lists.questions
*/
function(head, req) {
// !json templates
// !code lib/mustache.js

	start({"headers":{"Content-Type" : "text/html; charset=utf-8"}});

	var preview_length=100;	
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
			
			question.question_preview = (question.question.length > preview_length) 
				? question.question.substring(0,100) + '...'
				: question.question;
				
			send(Mustache.to_html(templates.questions.list_item, question));
			answers = 0;
		} 	
	}
	
	send(Mustache.to_html(templates.questions.list_foot));
	send(Mustache.to_html(templates.foot),{});
		
}

