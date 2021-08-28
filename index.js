const http = require("http");
const fs = require("fs");

const tempOverview = fs.readFileSync(`${__dirname}/overview.html`, 'utf-8');
const tempCard = fs.readFileSync(`${__dirname}/template-card.html`, 'utf-8');
const tempProduct = fs.readFileSync(`${__dirname}/template-product.html`, 'utf-8');

const data = fs.readFileSync(`${__dirname}/data.json`);
const dataObj = JSON.parse(data);

const replaceTemplate = (temp, product) => {
  let output = temp.replace(/{%img%}/g, product.image);
  output = output.replace(/{%qunatity%}/g, product.qunatity);
  output = output.replace(/{%productName%}/g, product.productName);
  output = output.replace(/{%price%}/g, product.price);
  output = output.replace(/{%id%}/g, product.id);
  if (!product.organic) {
    output = output.replace(/{%not_organic%}/g, 'not-organic');
  }
  return output;
};

const server = http.createServer((req, res) => {
  const pathName = req.url;

  if (pathName === "/" || pathName === "/overview") {
    res.writeHead(200, {'Content-type':'text/html'});
    const cardsHtml = dataObj
      .map(ele => replaceTemplate(tempCard, ele))
      .join('');
    res.end(tempOverview);
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