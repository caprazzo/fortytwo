/**
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
		if (!doc.votes) doc.votes = 1;
		emit([doc.created, doc._id, 0], doc);
	}
	else if (doc.answer) {
		emit([doc.question_created, doc.question_id, 1], 1);
	}
}