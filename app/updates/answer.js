function(doc, req) {
	// !code _attachments/lib/fortytwo.js
	// !code vendor/couchapp/date.js	
	// the existing doc must be a question
	if (doc) {
		var answer = eval('('+req.body+')');
		var now = new Date();
		answer.created = now.toJSON();
		
		answer._id = doc._id + '--answer--' + FortyTwo.make_timestamp_from_date(now);
		
		var reply = {
			ok: 'answer accepted',
			answer: answer
		}
		
		return [answer, toJSON(answer)];
	}
	throw('question must exist');
}