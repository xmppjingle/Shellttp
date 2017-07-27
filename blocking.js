
var http = require('http'),
    exec = require('child_process').exec;

if(process.argv.length==5){

  http.createServer(function (req, res) {

  if(req.headers.key == process.argv[3]) {

    res.writeHead(200, {'Content-Type': 'text/plain'});
    var cmd = process.argv[2];
    var child = exec(cmd, function (error, stdout, stderr) {
      var result = '{"stdout":' + stdout + ',"stderr":"' + stderr + '"}';
      res.end(result + '\n');
      });
  }else{
    res.writeHead(403, {'Content-Type': 'text/plain'});
    res.end();
  }

  }
  ).listen(parseInt(process.argv[4]));

}else{

  console.log("Usage: node blocking.js COMMAND_PARAM KEY LISTEN_PORT\n");

}