fortytwo - answers to questions
-------------------------------

fortytwo is a couchdb application that brings together questions and answers.
It's an open source application based on CouchDb and is inspired by the website stackoverflow.com.


Pages breakdown
---------------

Questions list/Entry page:

	_list/questions/questions?descending=true
	couchdb _list function 'questions' + view 'questions'
	
	all server-side
		display titles
		display answer count
		display summary of question
		more recent questions first
	
Question details with list of answers:
	_list/question_and_answers/questions?startkey=[&quot;{{_id}}&quot;,0]&endkey=[&quot;{{_id}}&quot,1]
	
	* answering needs ajax because _update functions want PUT
	
	todo:
		- order answers by most-recent
		- count answers
		
Ask question:
	_show/ask/
	
		
Search results:
	_show/search/foo?q=ahaah
	todo:
		- same layout as questions list
		- order by relevance
		- consider number of answers in relevance count
		- include summary of question
			
