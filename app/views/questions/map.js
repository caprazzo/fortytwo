/**
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
}