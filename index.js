const http = require("http");
const fs = require("fs");

const tempOverview = fs.readFileSync(`${__dirname}/overview.html`, 'utf-8');
const tempCard = fs.readFileSync(`${__dirname}/template-card.html`, 'utf-8');
const tempProduct = fs.readFileSync(`${__dirname}/template-product.html`, 'utf-8');
const server = http.createServer((req, res) => {
  const pathName = req.url;

  if (pathName === "/" || pathName === "/overview") {
    res.end("This is the overview");
  } else if (pathName === "/product") {
    res.end("This is the product");
  } else {
    res.writeHead(404, {
        'Content-type':'text/html'
    });
    res.end('<h1>Page not found!</h1>');
  }
});

server.listen(8080);