
var http = require('http'),
    exec = require('child_process').exec;

if(process.argv.length==4){

  http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  var cmd = process.argv[2];
  var child = exec(cmd, function (error, stdout, stderr) {
  var result = '{"stdout":' + stdout + ',"stderr":"' + stderr + '"}';
  res.end(result + '\n');
  });
  }).listen(parseInt(process.argv[3]));

}else{

  console.log("Usage: node blocking.js COMMAND_PARAM LISTEN_PORT\n");

}