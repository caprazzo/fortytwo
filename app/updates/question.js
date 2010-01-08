/**
	Handler for a newly submitted question
	@name question
	@class
	@memberOf updates
*/
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
		// trunk uses req.id, 0.10 req.docId
		if (!req.id) req.id = req.docId;
		var now = new Date();
		doc = eval('('+req.body+')');
		doc.created = now.toJSON();
		doc._id = req.id;
		doc.votes = 1;
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