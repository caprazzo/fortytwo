fortytwo - answers to questions
-------------------------------

fortytwo is a couchdb application that brings together questions and answers.
It's an open source application based on CouchDb and is inspired by the website stackoverflow.com.


Pages breakdown
---------------

Questions list:
	_design/fortytwo/_list/questions/questions?descending=true
	couchdb _list function 'questions' + view 'questions'
	
	all server-side
		display titles
		display answer count
		display summary of question
		more recent questions first
		
Question details (old):
	_design/fortytwo/_show/question/<question_id>
	couchdb _show function question
	and ajax load of list h_design/fortytwo/_list/answers/answers?key=%22<question_id>%22
	
Question details and answers:
	_list/question_and_answers/questions?startkey=[&quot;{{_id}}&quot;,0]&endkey=[&quot;{{_id}}&quot,1]
	
	* answering needs ajax because _update functions want PUT
	
	todo:
		- order answers by most-recent
		- count answers
			
