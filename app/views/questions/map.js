function(doc) {
	if (doc.question) {
		emit([doc._id, 0], doc);
	}
	if (doc.answer) {
		emit([doc.question_id, 1], doc);
	}
}