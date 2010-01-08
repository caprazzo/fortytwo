function(doc, req) {
	if(doc) {
		if (!doc.votes) doc.votes = 1;
		doc.votes++;
		return [doc, toJSON{
			ok: "added one vote",
			votes: doc.votes
		}];
	}
	return [null, '{"error":"no doc"}']
}