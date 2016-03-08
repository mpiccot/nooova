var ws = require("nodejs-websocket")
 var connections = [];
 var currentID = 0;

 
 function removeConnection(id){
	for (var i = 0; i < connections.length; i++){
		if (connections[i].id == id)
			connections.splice(i,i);		
	} 
 }
 
 function sendMessage(message){
	for (var i = 0; i < connections.length; i++){
		connections[i].sendText(message)		
	} 
 }
// Scream server example: "hi" -> "HI!!!" 
var server = ws.createServer(function (conn) {
	console.log("New connection")
	conn.on("text", function (str) {
		console.log("Received "+str)
		var json = {id : conn.id, event: 'Message Recieved', x: str.split(":")[0], y: str.split(":")[1]}
		sendMessage(JSON.stringify(json));
	})
	conn.on("close", function (code, reason) {
		removeConnection(conn.id);		
	})
	conn.on('uncaughtException', function (code, reason) {
		removeConnection(conn.id);		
	})
	conn.on('error', function (err) {
		console.log(err);
		conn.close();				
	})
	conn.id = currentID;
	currentID++;
	connections.push(conn);
}).listen(8001)