/**
	Used with {@link views.questions}?<strong>startkey=["{{question_id}}",0]&endkey=["{{question_id}}",1]</strong>
	will show a question and all its answers.
	@name lists.question_and_answers
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
	var question_doc;
	
	start({"headers":{"Content-Type" : "text/html; charset=utf-8"}});
	
	while(row = getRow()) {
		if (row.value.question) {
			question_doc = row.value;
			question_doc.question_html
				= converter.makeHtml(FortyTwo.escape(question_doc.question));
			out(templates.app_head, {title: question_doc.title});
			out(templates.question_detail, question_doc);
			out(templates.answers.list_head);
		}
		else {
			row.value.answer_html = converter.makeHtml(FortyTwo.escape(row.value.answer));
			out(templates.answers.list_item, row.value);
		}
	}	
	out(templates.answers.list_foot);
	out(templates.answer_form, question_doc);
	out(templates.app_foot);
}