import json

#	 1103  curl 'http://localhost:5984/fortytwo/_design/fortytwo/_view/resync_timestamps?include_docs=true' > questions.js 
#	 1104  python resync.py > bulk.js 
#	 1105  curl -v -d @bulk.js -X POST http://localhost:5984/fortytwo/_bulk_docs
#	 1106  history 

updates = [ (row['id'], row['value']['answer_doc'], row['doc']['created']) for row in json.loads(open('questions.js').read())['rows'] ]

result = {'docs':[]}
for (id, answer_doc, created) in updates:
	answer_doc['question_created'] = created
	result['docs'].append(answer_doc)

print json.dumps(result)
	


