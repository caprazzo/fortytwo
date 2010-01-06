import json, sys
print json.dumps(json.loads(sys.stdin.read()), indent=4)