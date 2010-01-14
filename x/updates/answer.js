/**
	Handler for a newly submitted answer
	<strong>must be invoked for an existing question</strong>	

	@name updates.answer
*/
function(doc, req) {
	// !code _attachments/lib/fortytwo.js
	// !code vendor/couchapp/date.js	
	// the existing doc must be a question
	if (doc) {
		var answer = eval('('+req.body+')');
		
		// store servertime...
		answer.created = (new Date()).toJSON();
		
		// copy question creation date
		answer.question_created = doc.created;
		answer.votes = 0;
		answer.question_id = doc._id;
		
		var reply = {
			ok: 'answer accepted',
			answer: answer
		}
		
		return [answer, toJSON(reply)];
	}
	throw('question must exist');
}