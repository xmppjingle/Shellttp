function cmd_exec(cmd, args, cb_stdout, cb_end) {
  var spawn = require('child_process').spawn;
    child = spawn(cmd, args);
    me = this;

  me.exit = 0;  // Send a cb to set 1 when cmd exits
  child.stdout.on('data', function (data) { cb_stdout(me, data) });
  child.stdout.on('end', function () { cb_end(me) });
}

var stun_check;
var result = 'Pending...';

function update(){
 stun_check = new cmd_exec(process.argv[2], [process.argv[3]], 
  function (me, data) {var line = data.toString(); me.stdout = line;},
  function (me) {result=me.stdout; me.exit = 1;}
);
}

var http = require('http');
var fs = require('fs');

if(process.argv.length==6){

  http.createServer(function (req, res) {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end(result);
  }).listen(parseInt(process.argv[4]));

  setInterval(update, parseInt(process.argv[5]));

}else{

  console.log("Usage: node shellttp.js COMMAND PARAM LISTEN_PORT PERIOD\n");

}