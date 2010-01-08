/**
	<p>Handler for adding or subtracting votes from questions.</p>
	
	<p>A query parameter vote=[up|down] must be supplied.</p>
	
	@name updates.question_vote
*/
function(doc, req) {
	if (!doc || !req.query || !req.query.vote) {
		return [null, '{"error":"invalid request"}'];
	}
	
	if (typeof doc.votes != 'number') doc.votes = 1;	
	if (req.query.vote == 'up') {
		doc.votes++;
	}
	else if (req.query.vote == 'down') {
		doc.votes--;	
	}
	return [doc, toJSON({
		ok: "voted " + req.query.vote,
		votes: doc.votes
	})];
	
}