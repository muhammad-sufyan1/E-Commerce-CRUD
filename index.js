import http from "http"
import fs from 'fs';

const server= http.createServer(function (req, res) {
    res.writeHead(200,{'Content-Type':'text/plain'}); 
    res.end("server created"); 
  });
  server.listen(5000, ()=>{
    console.log("seerver is runnimg in the port")
  })

