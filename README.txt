fortytwo - answers for questions
================================

fortytwo is an ask-and-answer web application much like stackoverflow.com.

It is also an experiment in building a couchdb application serverside-only, with no javascript dependencies on the client.

Setup
=====

git clone git://github.com/mcaprari/fortytwo.git
cd fortytwo
couchapp push app http://localhost:5984/fortytwo


TODO
====
- figure out how to unit test couchapps
- post new question without javascript (need to POST an _update handler)
- add votes
- automate generation of docs
- add a compile step

Pages breakdown
===============

Questions list/Entry page
-------------------------

	_list/questions/questions?descending=true
	couchdb _list function 'questions' + view 'questions'
	
	all server-side
		display titles
		display answer count
		display summary of question
		more recent questions first
	
Ask question
------------
	_show/ask/
	
Question details with list of answers
-------------------------------------
	_list/question_and_answers/questions?startkey=[&quot;{{_id}}&quot;,0]&endkey=[&quot;{{_id}}&quot,1]
	
	NOTES:
	 - answering needs ajax because _update functions want PUT
	 - it is not possible to know how many answers this question has, before they are 
	   all rendered. A solution would be to cache and count the answers while walking
	   the iterator, but that would consume much more memory than just sending output
	   as the iterator unrolls. A perhaps better solution is to use a little javascript
	   at the end of the stream.
	
	TODO:
	 - count answers
	 - order answers by most-recent
	 	
Search results
--------------
	_show/search/foo?q=ahaah
	
	results are fetched from _fti using ajax and rendered with string concatenation,
	hardly a good thing.
	
	todo:
		- display 'no results' when query returns empty
		- use templates for rendering
		- display answer count
		- order by relevance and answer count		
		- include summary of question
			
