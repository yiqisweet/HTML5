// JavaScript Document
//onmessage �¼����������մ��͹��������ݡ�
/*importScripts('s.js');����js�ű���ͬʱ�ɵ������ű���importScripts('s.js','a,js');
self.onmessage = function(event){
	var result = sum(event.data);
    postMessage(result);//���̴߳���Դ�ͻ���Ϣ
}*/



self.onmessage = function(event){
	var result = 0;
	for (var i = 0; i <= event.data; i++) 
		result += i;
    postMessage(result);//���̴߳���Դ�ͻ���Ϣ
}