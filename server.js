const http = require('http');
const fs = require('fs')
const usersDB = require('./db/users.json')



const server = http.createServer((req, res) => {

    if (req.url === '/' && req.method === "GET") {
        fs.promises.readFile('./index.html', 'utf-8')
            .then((data) => {
                res.writeHead(200, { statusMessage: "OKay", 'Content-Type': 'text/html' });
                res.write(data);
                res.end()
            })
            .catch((err) => {
                res.writeHead(404, { statusMessage: "html not found", 'Content-Type': 'text/plain' })
                res.write("html not found");
                res.end()
            })
    }
    else if (req.url === '/api/users' && req.method === "GET") {
        fs.promises.readFile('./db/users.json', 'utf-8')
            .then((data) => {
                res.writeHead(200, { statusMessage: "succesful users", 'Content-Type': 'application/json' })
                res.write(data)
                res.end()
            })
            .catch((err) => {
                res.end()
            })
    }
    else if (req.url.match(/\/api\/users\/([0-9]+)/) && req.method === "GET") {

        let id = req.url.split('/')[3]
        let user = usersDB.find((u) => u.id === id)
        if (user) {
            res.writeHead(200, { "Content-Type": "application/json" })
            res.write(JSON.stringify(user))
            res.end()
        } else {
            res.writeHead(404, { "Content-Type": "text/plain" })
            res.write('user not found')
            res.end()
        }


    }
    else if (req.url.includes('?') && req.method === "GET") {
        console.log(req.url);
        let indexParams = req.url.indexOf('?')
        let getParams = req.url.slice(indexParams + 1)
        let value = getParams.split('=')[1]

        let newData =
            usersDB.filter((u) => u.name.toLowerCase().indexOf(value.toLowerCase()) > -1)
        res.writeHead(200, { "Content-Type": "application/json" })
        res.write(JSON.stringify(newData))
        res.end()

    }
    else if(req.url === '/api/users' && req.method === "POST"){
        
        let body = [];
       
        req.on('data', chunk => body.push(chunk));
        
        req.on('end', () => {
            body = JSON.parse(body[0].toString());
            console.log(body); // the actual data
        })
        
        res.end()
    }
    else {
        res.end()
    }
})


server.listen(3003, () => console.log("server is running!!"))



