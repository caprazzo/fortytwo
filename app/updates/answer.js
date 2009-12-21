function(doc, req) {
	// !code _attachments/lib/fortytwo.js
	// !code vendor/couchapp/date.js	
	// the existing doc must be a question
	if (doc) {
		var answer = eval('('+req.body+')');
		
		// store servertime...
		answer.created = (new Date()).toJSON();
		
		// ...but use client-time on the id to ensure double posts don't collide		
		answer._id = doc._id + '--answer--' + answer.time;
		
		var reply = {
			ok: 'answer accepted',
			answer: answer
		}
		
		return [answer, toJSON(answer)];
	}
	throw('question must exist');
}