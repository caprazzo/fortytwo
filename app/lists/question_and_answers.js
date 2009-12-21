function(head, req) {

// !json templates
// !code lib/mustache.js	

	start({"headers":{"Content-Type" : "text/html; charset=utf-8"}});
	send('<pre>');
	
	while(row = getRow()) {
		if (row.value.question) {
			send(row.value.title + '\n');
			//send(Mustache.to_html(templates.head, {title:row.value.question}));
			//send(Mustache.to_html(templates.question_detail, row.value));
		}
		else {
			send('\t'+row.value.answer + '\n');
		}
	}		
}