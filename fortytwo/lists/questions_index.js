/**
	Used with {@link views.questions}?<strong>descending=true</strong>
	will show most recent questions first and a count of answers for each question.
	@name lists.questions
*/
function(head, req) {
// !json templates
// !code lib/mustache.js
// !code lib/showdown.js

	start({"headers":{"Content-Type" : "text/html; charset=utf-8"}});

	var preview_length=100;	
	send(Mustache.to_html(templates.app_head, {title:"questions"}));
	send(Mustache.to_html(templates.questions.list_head));
	answers = 0;
	var converter = new Showdown.converter();

	while (row = getRow()) {
		if (row.value==1) {
			answers++;
		}	
		else if (row.value) {
			var question = row.value;
			question.answers = answers;
						
			question.question_preview = (question.question.length > preview_length) 
				? converter.makeHtml(question.question.substring(0,100)) + '...'
				: converter.makeHtml(question.question);
							
			question.url_id = encodeURIComponent(question._id).replace(/%22/g,"%5C%22");	
			
			send(Mustache.to_html(templates.questions.list_item, question));
			answers = 0;
		} 	
	}
	
	send(Mustache.to_html(templates.questions.list_foot));
	send(Mustache.to_html(templates.app_foot),{});
		
}

