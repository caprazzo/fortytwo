/**
	Index question title and body
	@name fulltext.questions.index
*/
function(doc) {
	if (doc.question) {
	    var ret = new Document();
	    ret.add(doc.title);
	    ret.add(doc.question);
    	return ret;		
	}
}