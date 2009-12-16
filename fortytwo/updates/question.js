function(doc, req) {
	// !code _attachments/lib/questions.js
	// !code vendor/couchapp/date.js
	// update
	if (doc) {
		doc.updated = new Date().toJSON();
		return [doc, '{"ok":"updated"}'];
	}
	// new question
	else {
		log(req.body);
		doc = eval('('+req.body+')');
		doc.created = new Date().toJSON();
		doc._id = Q.make_id_from_string(req.docId);
		return [doc, '{"ok":"question accepted"}'];
	}
}