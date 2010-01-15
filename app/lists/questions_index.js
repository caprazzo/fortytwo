/**
	Used with {@link views.questions}?<strong>descending=true</strong>
	will show most recent questions first and a count of answers for each question.
	@name lists.questions
*/
function(head, req) {
	
	// !json templates
	// !code config/config.js
	// !code lib/mustache.js	
	// !code lib/showdown.js
	// !code _attachments/lib/fortytwo.js

	var base = merge(url_info(req), auth_info(req), CFG.path);
	function out(template, mod) {
		send(Mustache.to_html(template, mod ? merge(base, mod) : base));
	}
	var converter = new Showdown.converter();
	
	start({"headers":{"Content-Type" : "text/html; charset=utf-8"}});

	answers = 0;
	out(templates.app_head, {title: 'questions'});
	out(templates.questions.list_head);
	while (row = getRow()) {
		if (row.value==1) {
			answers++;
		}	
		else if (row.value) {
			var question = row.value;
			question.answers = answers;

			question.question_preview = (question.question.length > CFG.preview_length) 
				? converter.makeHtml(question.question.substring(0,CFG.preview_length)) + '...'
				: converter.makeHtml(question.question);	
			
			question.url_id = encodeURIComponent(question._id).replace(/%22/g,"%5C%22");	
			
			out(templates.questions.list_item, question);
			answers = 0;
		} 	
	}
	
	out(templates.questions.list_foot);
	out(templates.app_foot);

}

