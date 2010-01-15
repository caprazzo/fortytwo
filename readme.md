fortytwo - answers and questions
================================

fortytwo is an ask-and-answer web application much like stackoverflow.com.

Demo: http://couch.caprazzi.net/fortytwo/_design/fortytwo/index.html
Docs: http://couch.caprazzi.net/fortytwo/_design/fortytwo/docs/index.html

This is also an experiment in building a tutorial couchdb application.
As of couchdb 0.11(trunk) and couchdb-lucene 0.5(trunk) the app needs client-side javascript because _update functions only accept PUT (and html doesn't) and couchdb-lucene is not integrated with couchdb _list functions.


Docs have been created using jsDoc and the provided jsdoc-template. 

Setup
=====

git clone git://github.com/mcaprari/fortytwo.git
cd fortytwo
couchapp push app http://localhost:5984/fortytwo
create a document with id 'search' in database fortytwo

install, configure and run couchdb-lucene

Pages breakdown
===============

Questions list/Entry page
_list/questions/questions?descending=true

Ask Question
_show/ask/

Question details with list of answers
_list/question_and_answers/questions?startkey=["{{_id}}",0]&endkey=["{{_id}}",1]

Search results
_show/search/foo?q=ahaah

NOTES
=====

- answering needs javascript because _update functions mandate PUT and html
forms don't have it

- it is not possible to know how many answers this question has, before they are all rendered. A solution would be to cache and count the answers while walking the iterator, but that would consume much more memory than just sending output as the iterator unrolls. A different solution is to output the count at the end of the list and reposition it with some javascript.

TODO
====
- fix urls so that app is database and design name independent
- figure out how to unit test
- add votes
- add paging
- automate generation of docs with jsDoc
- add a compile/compress step

- in question details view, count answers 
- in question details view, order answers by most-recent

