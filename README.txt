fortytwo - answers to questions
-------------------------------

fortytwo is a couchdb application that brings together questions and answers.
It's an open source application based on CouchDb and is inspired by the website stackoverflow.com.

It is also an experiment in building a couchdb application serverside-only, with 
no javascript dependencies on the client.


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
	
Ask question:
	_show/ask/
	
Question details with list of answers:
	_list/question_and_answers/questions?startkey=[&quot;{{_id}}&quot;,0]&endkey=[&quot;{{_id}}&quot,1]
	
	* answering needs ajax because _update functions want PUT
	
	todo:
		- order answers by most-recent
		- count answers
		
Search results:
	_show/search/foo?q=ahaah
	
	results are fetched from _fti using ajax and rendered with string concatenation,
	hardly a good thing.
	
	todo:
		- display 'no results' when query returns empty
		- use templates for rendering
		- display answer count
		- order by relevance and answer count		
		- include summary of question
			
