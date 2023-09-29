# -*- coding: utf-8 -*-
import urllib.request
import xmltodict
import json
import sys
import io
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')
podcasts = ["https://anchor.fm/s/38d99c9c/podcast/rss","https://anchor.fm/s/472bd300/podcast/rss"]

result = []

for podcast in podcasts:
	result.append(xmltodict.parse(urllib.request.urlopen(podcast).read().decode('utf-8'))['rss']['channel'])
json_object = json.dumps(result,ensure_ascii=False, indent=2) 

print ('Content-Type: application/json;charset=utf-8')
print ('\n')
print(json_object)
