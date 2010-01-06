import json
import sys

# curl 'http://localhost:5984/fortytwo/_design/fortytwo/_view/resync_timestamps?include_docs=true'
# | python resync.py | curl -v -d @- -X POST http://localhost:5984/fortytwo/_bulk_docs

updates = [ (row['value']['answer_doc'], row['doc']['created'])
	for row in json.loads(sys.stdin.read())['rows'] ]

result = {'docs':[]}
for (answer_doc, created) in updates:
	answer_doc['question_created'] = created
	result['docs'].append(answer_doc)

print json.dumps(result)
	


