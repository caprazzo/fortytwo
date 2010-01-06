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
}