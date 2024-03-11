const cheerio = require('cheerio');
const axios = require('axios');

const mystery = "https://books.toscrape.com/catalogue/category/books/mystery_3/index.html";

const book_data = [];

async function getBooks(url){
    try{
        const response = await axios.get(url);
        const $ = cheerio.load(response.data);
        const books = $("article");
        books.each(function(){
            title = $(this).find("h3 a").text();
            price = $(this).find(".price_color").text();
            stock = $(this).find(".availability").text();
            book_data.push({title,price,stock});
        })
        console.log(book_data);

    }catch(error){
        console.log(error);
    }
}

getBooks(mystery);