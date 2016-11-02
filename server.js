const net = require('net')
const os = require('os')
const toobusy = require('toobusy-js')


/*Default port*/
let port = 3000

/*Try get specified port*/
if(!process.argv[2]){
	console.log("You didnt enter a port...using port 3000")
}
else{
	port = process.argv[2];
}

/*Get IP address*/
let interfaces = os.networkInterfaces()
let addresses = []
for (let k in interfaces) {
	for (let k2 in interfaces[k]) {
		let address = interfaces[k][k2]
		if (address.family === 'IPv4' && !address.internal) {
			addresses.push(address.address)
		}
	}
}

console.log(addresses)

const requestHandler = (sock) => {
	if(toobusy()){
		sock.destroy();
	}
	else
	{
		console.log('CONNECTED: ' + sock.remoteAddress +':'+ sock.remotePort)
		sock.on('data', function(data) {
			if(data.includes("HELO")){
				sock.write(data
					+"IP:"+addresses+"\n"
					+"Port:"+port+"\n"
					+"StudentID:13323109\n")

			}
			else if(data.includes("KILL_SERVICE")){
				sock.destroy();
			}
		})

		sock.on('close', function(data) {
			console.log('CLOSED: ' + sock.remoteAddress +' '+ sock.remotePort)
		})
	}
}


const server = net.createServer(requestHandler)

server.listen(port, (err) => {
	if (err) {
		return console.log('something bad happened', err)
	}
	console.log(`Server is listening on ${port}`)
})
