function(doc) {
	if(doc.answer) {
		emit(null, {_id:doc.question_id, answer_doc:doc});
	}
}