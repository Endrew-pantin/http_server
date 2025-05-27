const http = require("http");
const fs = require("fs");
const Busboy = require('busboy');

const server = http.createServer(async (req, res)=>{
    if(req.url === "/traffic_light"){
        fs.readFile("traffic_light.html", (err, data)=>{
            res.end(data);
        });
    }else if(req.url === "/login" && req.method==="GET"){
        fs.readFile("login.html", (err, data)=>{
            res.end(data);
        });
    }else if(req.url === "/login" && req.method==="POST"){
        console.log(req);
        const busboy = Busboy({headers: req.headers});
        const fields  = {};
        busboy.on('field', (name, value)=>{
            fields[name] = value;
        });
        busboy.on('finish', ()=>{
            console.log(fields);
            res.end(`Привет ${fields.sname} ${fields.name}\nВаш логин: ${fields.login}\nПароль: ${fields.pass}`);
        });
        req.pipe(busboy);
    }else{
        res.end("404");
    }
})

server.listen(3000, ()=>console.log("Сервер запущен, http://localhost:3000"));