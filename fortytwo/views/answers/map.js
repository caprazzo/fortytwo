function(doc) {
	if (doc.answer) {
		emit(doc.question_id, doc);
	}
}