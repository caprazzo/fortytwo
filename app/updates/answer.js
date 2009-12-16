function(doc, req) {

	// !code vendor/couchapp/date.js	
	// the existing doc must be a question
	if (doc) {
		var answer = eval('('+req.body+')');
		answer.created = new Date().toJSON();
		
		// BEWARE THIS ID IS NOT REPLICATION-SAFE
		answer._id = doc._id + '-' + new Date().getTime();
		
		var reply = {
			ok: 'answer accepted',
			answer: answer
		}
		
		return [answer, toJSON(answer)];
	}
	throw('question must exist');
}