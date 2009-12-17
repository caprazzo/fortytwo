function(doc) {
	if (doc.question) {
	    var ret = new Document();
	    ret.add(doc.title);
	    ret.add(doc.question);
    	return ret;		
	}
}