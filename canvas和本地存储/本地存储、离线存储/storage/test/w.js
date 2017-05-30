// JavaScript Document
//onmessage 事件监听，接收传送过来的数据。
/*importScripts('s.js');导入js脚本，同时可导入多个脚本如importScripts('s.js','a,js');
self.onmessage = function(event){
	var result = sum(event.data);
    postMessage(result);//向线程创建源送回消息
}*/



self.onmessage = function(event){
	var result = 0;
	for (var i = 0; i <= event.data; i++) 
		result += i;
    postMessage(result);//向线程创建源送回消息
}