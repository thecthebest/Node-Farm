const http = require("http");
const fs = require("fs");
const url = require("url");
const replaceTemplate = require("./modules/replaceTemplates");
const tempOverview = fs.readFileSync(`${__dirname}/overview.html`, 'utf-8');
const tempCard = fs.readFileSync(`${__dirname}/template-card.html`, 'utf-8');
const tempProduct = fs.readFileSync(`${__dirname}/template-product.html`, 'utf-8');

const data = fs.readFileSync(`${__dirname}/data.json`);
const dataObj = JSON.parse(data);


const server = http.createServer((req, res) => {
  const {query, pathname} = url.parse(req.url, true);

  if (pathname === "/" || pathname === "/overview") {
    res.writeHead(200, {'Content-type':'text/html'});
    const cardsHtml = dataObj
      .map(ele => replaceTemplate(tempCard, ele))
      .join('');
    const output = tempOverview.replace(/{%product_cards%}/, cardsHtml);
    res.end(output);
  } else if (pathname === "/product") {
    res.writeHead(200, {'Content-type':'text/html'});
    const output = replaceTemplate(tempProduct, (dataObj[query.id]));
    res.end(output);
  } else {
    res.writeHead(404, {
        'Content-type':'text/html'
    });
    res.end('<h1>Page not found!</h1>');
  }
});

server.listen(3000);