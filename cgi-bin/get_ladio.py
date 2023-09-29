# -*- coding: utf-8 -*-
#ladio.netから情報を取得
import urllib.request
import json

url = 'http://yp.ladio.net/stats/list.v2.dat'

with urllib.request.urlopen(url) as response:
	data = response.read()
	data_string = data.decode('shift-jis').split("\n")


tmp_data=[]
tmp_dict={}
for i in data_string:
	i=(i.split("="))
	if(len(i)==2):
		tmp_dict[i[0]]=i[1]
	if("CHS" in i[0]):
		tmp_data.append(tmp_dict)
		tmp_dict={}
		
print ('Content-Type: application/json;charset=shift-jis')
print ('\n')
print(json.dumps(tmp_data, indent=2, ensure_ascii=False))
