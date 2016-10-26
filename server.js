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
	if(request.url == "/KILL_SERVICE"){
		response.end("Service Shutdown..\n");
		process.exit();
	}
	else if(request.url == "/blocker")
	{
		for(var i = 0 ; i < 4000000000 ; i++){
			var j = 1;
		}
		response.end("Hello Blocker!\n")
	}
	else {
		response.end("Hello Non-Blocker\n")
	}
}


const server = http.createServer(requestHandler)

server.listen(port, (err) => {
	if (err) {
		return console.log('something bad happened', err)
	}
	console.log(`Server is listening on ${port}`)
})
