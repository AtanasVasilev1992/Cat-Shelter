const http = require("http");
const homeTemplateHTHL = require("./views/home.html");
const siteCss = require("./views/site.css");
const addCatTemplateHTML = require("./views/addCat.html");
const addBreadTemplateHTML = require("./views/addBreed.html")
const PORT = "5000";

const cats = [
    {
        id: 1,
        imageUrl: 'https://ichef.bbci.co.uk/news/976/cpsprodpb/12A9B/production/_111434467_gettyimages-1143489763.jpg',
        name: 'KittynchO',
        breed: 'Bombay cat',
        description: 'Dominant and aggressive to other cats. Will probably eat you in your sleep. Very cute tho.',

    },
    {
        id: 2,
        imageUrl: 'https://cdn.pixabay.com/photo/2015/06/19/14/20/cat-814952_1280.jpg',
        name: 'Tommy',
        breed: 'Bombay cat',
        description: 'Dominant and aggressive to other cats. Will probably eat you in your sleep. Very cute tho.',

    },
    {
        id: 3,
        imageUrl: 'https://cdn.pixabay.com/photo/2017/02/20/18/03/cat-2083492_1280.jpg',
        name: 'Timmy',
        breed: 'Bombay cat',
        description: 'Dominant and aggressive to other cats. Will probably eat you in your sleep. Very cute tho.',

    },
    {
        id: 4,
        imageUrl: 'https://cdn.pixabay.com/photo/2014/04/13/20/49/cat-323262_1280.jpg',
        name: 'Savoy',
        breed: 'Bombay cat',
        description: 'Dominant and aggressive to other cats. Will probably eat you in your sleep. Very cute tho.',

    },
    {
        id: 5,
        imageUrl: 'data:image/jpeg;base64,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',
        name: 'Orange',
        breed: 'Bombay cat',
        description: 'Dominant and aggressive to other cats. Will probably eat you in your sleep. Very cute tho.',

    },
    {
        id: 6,
        imageUrl: 'https://ichef.bbci.co.uk/news/976/cpsprodpb/12A9B/production/_111434467_gettyimages-1143489763.jpg',
        name: 'Little kitty II',
        breed: 'Bombay cat',
        description: 'The best!',

    }
];

const server = http.createServer((req,res)=>{
    if(req.url === '/'){
        res.writeHead(200, {
            "content-type": "text/html"
        })
        res.write(homeTemplateHTHL(cats));
        res.end();
    } else if(req.url === "/styles/site.css"){
        res.writeHead(200, {
            "content-type": "text/css"
        });
        res.write(siteCss);
        res.end()
    } else if(req.url === "/cats/add-cat"){
        res.writeHead(200, {
            "content-type": "text/html"
        })
        res.write(addCatTemplateHTML);
        res.end();
    } else if(req.url === "/cats/add-breed") {
        res.writeHead(200, {
            "content-type": "text/html"
        })
        res.write(addBreadTemplateHTML);
        res.end();
    } else {
        res.writeHead(200, {
            "content-type": "text/html"
        })
        res.write('<h1>Page is missing! Wrong URL! :(<h1/>');
        res.end();
    }

});


server.listen(PORT);
console.log(`Server is listennig on port: ${PORT}`);