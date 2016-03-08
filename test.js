var ws = require("nodejs-websocket")
 var connections = [];
// Scream server example: "hi" -> "HI!!!" 
var server = ws.createServer(function (conn) {
	console.log("New connection")
	conn.on("text", function (str) {
		console.log("Received "+str)
		for (var i = 0; i < connections.length; i++){
			connections[i].sendText(str.toUpperCase()+"!!!")
		
		}
	})
	conn.on("close", function (code, reason) {
		console.log("Connection closed")
	})
	connections.push(conn);
}).listen(8001)