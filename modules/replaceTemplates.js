module.exports = (temp, product) => {
    console.log(product);
    let output = temp.replace(/{%img%}/g, product.image);
    output = output.replace(/{%quantity%}/g, product.quantity);
    output = output.replace(/{%productName%}/g, product.productName);
    output = output.replace(/{%price%}/g, product.price);
    output = output.replace(/{%id%}/g, product.id);
    output = output.replace(/{%from%}/g, product.from);
    output = output.replace(/{%nutrients%}/g, product.nutrients);
    output = output.replace(/{%description%}/g, product.description);
    output = output.replace(/{%id%}/g, product.id);
    if (!product.organic) {
      output = output.replace(/{%not_organic%}/g, 'not-organic');
    }
    return output;
};