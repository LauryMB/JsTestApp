var http = require('http');
var url = require("url");

var port = process.env.port || 1337;

var helloWorldFunc = function (req, res) {
    var page = url.parse(req.url).pathname;
    console.log(page);
    //    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    //res.end('<h1>Hello World</h1>');
    //res.write('<!DOCTYPE html>' +
    //                '<html>' +
    //                '    <head>' +
    //                '        <meta charset="utf-8" />' +
    //                '        <title>Ma page Node.js !</title>' +
    //                '    </head>' + 
    //                '    <body>' +
    //                '     	<p>Voici un paragraphe <strong>HTML</strong> !</p>' +
    //                '    </body>' +
    //                '</html>');
    if (page == '/')
        res.write('Vous êtes à l\'accueil, que puis-je pour vous ?');
    else if (page == '/sous-sol')
        res.write('Vous êtes dans la cave à vins, ces bouteilles sont à moi !');
    else if (page == '/etage/1/chambre')
        res.write('Hé ho, c\'est privé ici !');
    else
        res.write('Vous vous etes perdu non ? un peu d\'aide ?');
    res.end();
}


http.createServer(helloWorldFunc).listen(port);