const http = require('http');
const fs = require('fs')

const server = http.createServer((req, res) => {

    if (req.url === '/' && req.method === "GET") {
        fs.promises.readFile('./index.html', 'utf-8')
            .then((data) => {
                res.writeHead(200, {statusMessage : "OKay", 'Content-Type' : 'text/html'});
                res.write(data);
                res.end()
            })
            .catch((err) => {
                res.writeHead(404, {statusMessage : "html not found", 'Content-Type' : 'text/plain'})
                res.write("html not found");
                res.end()
            })
    }
})


server.listen(3003, () => console.log("server is running!!"))