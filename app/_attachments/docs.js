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
			question_doc.url_id = encodeURIComponent(question_doc._id).replace(/%22/g,"%5C%22");

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
}/**
	Used with {@link views.questions}?<strong>descending=true</strong>
	will show most recent questions first and a count of answers for each question.
	@name lists.questions
*/
function(head, req) {
// !json templates
// !code lib/mustache.js
// !code lib/showdown.js
// !
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

/**
	<p>If invoked with include_docs=true, this view returns a full answer doc and the full question for each
	answer. It's another way to see linked documents together in the client.</p>
	
	<p>I used this view, along with some python to copy question.created into answer.question_created for
	each (question, answer) where question._id == answer.question_id
	
	python code is in resync.py in the root of the project
	
	@name views.all_answers.map
*/
function(doc) {
	if(doc.answer) {
		emit(null, {_id:doc.question_id, answer_doc:doc});
	}
}/**
	<p>Emits <strong>[question.id, 0]</strong> when the document is a question
	and <strong>[answer.question_id,answer.created]</strong> when it's an answer.</p>
	
	<p>
		The first key level keeps questions and answers adjacent, the second keeps them in date order.
		As questions are always created before answers, this also makes questions always appear before answers.
	</p>
	
	<p>
		If queried with startkey=["<question_id>"]&endkey=["<question_id>","Z"] it will return one question
		followed by all its answers. The "Z" in the endkey is always higher 
		than a date as stored in this application
	</p>	
	
	<p>A sample key sequence is</p>
	<ul>
		<li>[question-y, <strong>'2010/01/01 12:12:37 +0000'] // question</strong></li>
		<li>[question-y, '2010/01/03 12:12:37 +0000'] // answer</li>
		<li>[question-y, '2010/01/03 12:12:38 +0000'] // answer</li>
		<li>[question-x, <strong>'2010/12/01 12:12:37 +0000'] // question</strong></li>
		<li>[question-x, '2010/12/04 12:12:37 +0000'] // answer</li>
		<li>[question-x, '2010/12/04 12:12:37 +0000'] // answer</li>
	</ul>
	
	

	<p>For more about joins, see
	see http://www.cmlenz.net/archives/2007/10/couchdb-joins</p>
	
	@name views.questions.map
*/
function(doc) {
	if (doc.question) {
		emit([doc._id, doc.created], doc);
	}
	if (doc.answer) {
		emit([doc.question_id, doc.created], doc);
	}
}/**
	Emits <strong>[question.created, question.id, 0]</strong> when the document is a question
	and <strong>[answer.question_created, answer.question.id,1]</strong> when it's an answer.
		
	answer.question_created is always equal to question.created, so a sample key sequence is:
	<ul>
		<li>[2009-01-01, question-y, <strong>0] // question</strong></li>
		<li>[2009-01-01, question-y, 1] // answer</li>
		<li>[2009-01-01, question-y, 1] // answer</li>		
		<li>[2010-01-02, question-x, <strong>0] // question</strong></li>
		<li>[2010-01-02, question-x, 1] // answer</li>
		<li>[2010-01-02, question-x, 1] // answer</li>
	</ul>

	The second numeric key forces the answers to follow the question,
	see http://www.cmlenz.net/archives/2007/10/couchdb-joins for more about "joins".
	
	@name views.questions_index.map
*/
function(doc) {
	if (doc.question) {
		emit([doc.created, doc._id, 0], doc);
	}
	else if (doc.answer) {
		emit([doc.question_created, doc.question_id, 1], 1);
	}
}/**
	Displays the "ask question form", <strong>remember to invoke with a document id, even bogus</strong>
	@name ask
	@class
	@memberOf shows
*/
function(doc, req) {
	// !json templates
	// !code lib/mustache.js
	
	return Mustache.to_html(templates.app_head, {title:'ask question'})
		+ Mustache.to_html(templates.question_form)
	 	+ Mustache.to_html(templates.app_foot);
}/**
	Displays the search results templates, which in short is some clientside javascript code
	that executes the _fti (couchdb-lucene) handler and renders the results. This is needed because
	couchdb-lucene can't be rendered with a list function.
	@name results
	@class
	@memberOf shows
*/
function(doc, req) {
	// !json templates
	// !code lib/mustache.js
	
	return Mustache.to_html(templates.app_head, {title:'title'})
		+ Mustache.to_html(templates.results, {q:req.query.q})
	 	+ Mustache.to_html(templates.app_foot);
}/**
	Handler for a newly submitted answer
	<strong>must be invoked for an existing question</strong>	
	@name answer
	@class
	@memberOf updates
*/
function(doc, req) {
	// !code _attachments/lib/fortytwo.js
	// !code vendor/couchapp/date.js	
	// the existing doc must be a question
	if (doc) {
		var answer = eval('('+req.body+')');
		
		// store servertime...
		answer.created = (new Date()).toJSON();
		
		// copy question creation date
		answer.question_created = doc.created;
		
		answer.question_id = doc._id;
		
		var reply = {
			ok: 'answer accepted',
			answer: answer
		}
		
		return [answer, toJSON(reply)];
	}
	throw('question must exist');
}/**
	Handler for a newly submitted question
	@name question
	@class
	@memberOf updates
*/
function(doc, req) {
	// !code _attachments/lib/fortytwo.js
	// !code vendor/couchapp/date.js
	// update
	if (doc) {
		doc.updated = new Date().toJSON();
		return [doc, '{"ok":"updated"}'];
	}
	// new question
	else {
		// trunk uses req.id, 0.10 req.docId
		if (!req.id) req.id = req.docId;
		var now = new Date();
		doc = eval('('+req.body+')');
		doc.created = now.toJSON();
		doc._id = req.id;
		if (doc.tags) {
			var tags = []
			doc.tags.split(',').forEach(function(tag) {
				tags.push(tag.replace(/^\s*/,'').replace(/\s*$/,''));
			});
			doc.tags = tags;
		}
		return [doc, '{"ok":true, "id":"'+doc._id+'"}'];
	}
}