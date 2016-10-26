const http = require('http')
const port = 3000
const  os = require('os');


let interfaces = os.networkInterfaces();
let addresses = [];
for (let k in interfaces) {
	for (let k2 in interfaces[k]) {
		let address = interfaces[k][k2];
		if (address.family === 'IPv4' && !address.internal) {
			addresses.push(address.address);
		}
	}
}

console.log(addresses);

const requestHandler = (request, response) => {
	console.log(request.url)
	if(request.url.includes("KILL_SERVICE")){
		response.end("Service Shutdown..\n");
		process.exit();
	}
	else if(request.url.includes("HELO"))
	{
		response.end(request.url.slice(1,request.url.length)+"\n"
			     +"IP:"+addresses+"\n"
			     +"PORT:"+port+"\n"
			     +"StudentID:13323109\n")
	}
	else {
		response.end("Please type 'HELO \\n' to get a valid response.\n")
	}
}


const server = http.createServer(requestHandler)

server.listen(port, (err) => {
	if (err) {
		return console.log('something bad happened', err)
	}
	console.log(`Server is listening on ${port}`)
})
