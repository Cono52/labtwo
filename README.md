# labtwo
CS4032 Lab for creating a server that spins a thread from a pool for each new client.
By using Node this is done under the hood usually allocating 4 threads per I/O process 
while the event loop handles the actual execution of code (implemented in libuv).
This is oppose to a thread being created to execute the code specially for each client.


| Name             | StudentID  |
| ---------------- |:----------:|
| Conor O'Flanagan | 13323109   |

####Setup/Install

**THIS WILL ONLY WORK ON DEBIAN BASED SYSTEMS**


In order to run the `./compile.sh` you need `sudo`. 
Some debian machines don't come installed with `sudo` so install it via `apt-get install sudo`.


If you dont have Node.js on your machine run the command `$ ./compile.sh`
This will install node.js and any dependencies.
	
If you've already installed node, then just run the command `$ ./start.sh portnumber`.

This set-up procedure follows the exact requirments outline by the module lab instructions:
(https://www.scss.tcd.ie/~ebarrett/lectures/cs4032/lab2.html).
