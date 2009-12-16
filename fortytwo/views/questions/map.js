function(doc) {
	if (doc.question) {
		emit([doc._id, 1], doc);
	}
	if (doc.answer) {
		emit([doc.question_id, 0], doc);
	}
}