/**
	Emits <strong>[question.id, 0]</strong> when the document is a question
	and <strong>[answer.question.id,1]</strong> when it's an answer.
		
	Question ids begin with a date, so a sample key sequence is:
	<ul>
		<li>[2009-01-01-question-y, <strong>0] // question</strong></li>
		<li>[2009-01-01-question-y, 1] // answer</li>
		<li>[2009-01-01-question-y, 1] // answer</li>		
		<li>[2010-01-01-question-x, <strong>0] // question</strong></li>
		<li>[2010-01-01-question-x, 1] // answer</li>
		<li>[2010-01-01-question-x, 1] // answer</li>
	</ul>

	The second numeric key forces the answers to follow the question,
	see http://www.cmlenz.net/archives/2007/10/couchdb-joins for more about "joins".
	
	@name views.questions.map
*/
function(doc) {
	if (doc.question) {
		emit([doc._id, 0], doc);
	}
	if (doc.answer) {
		emit([doc.question_id, 1], doc);
	}
}