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
		log(req.body);
		doc = eval('('+req.body+')');
		doc.created = new Date().toJSON();
		doc._id = FortyTwo.make_id_from_string(req.docId);
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