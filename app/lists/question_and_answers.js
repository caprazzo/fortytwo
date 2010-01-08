/**
	Used with {@link views.questions}?<strong>startkey=["{{question_id}}",0]&endkey=["{{question_id}}",1]</strong>
	will show a question and all its answers.
	@name lists.question_and_answers
*/
function(head, req) {

// !json templates
// !code lib/mustache.js	
// !code lib/showdown.js
// !code _attachments/lib/fortytwo.js

	start({"headers":{"Content-Type" : "text/html; charset=utf-8"}});
	var converter = new Showdown.converter();	
	var question_doc;
	while(row = getRow()) {
		if (row.value.question) {
			question_doc = row.value;

			question_doc.question_html = converter.makeHtml(FortyTwo.escape(question_doc.question));
			send(Mustache.to_html(templates.app_head, {title:question_doc.title}));
			send(Mustache.to_html(templates.question_detail, question_doc));
			send(Mustache.to_html(templates.answers.list_head));
		}
		else {
			row.value.answer_html = converter.makeHtml(FortyTwo.escape(row.value.answer));
			send(Mustache.to_html(templates.answers.list_item, row.value));
		}
	}	
	send(Mustache.to_html(templates.answers.list_foot));
	send(Mustache.to_html(templates.answer_form, question_doc));
	send(Mustache.to_html(templates.app_foot));
}