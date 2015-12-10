var http = require('http');
var url = require("url");
var querystring = require('querystring');
var EventEmitter = require('events').EventEmitter;

var jeu = new EventEmitter();

var port = process.env.port || 1337;

var helloWorldFunc = function (req, res) {
    var page = url.parse(req.url).pathname;
    var params = querystring.parse(url.parse(req.url).query);
    console.log(page);
    //    res.writeHead(200, { 'Content-Type': 'text/html' });
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
    if (page == '/') {
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        if ('prenom' in params && 'nom' in params) {
            res.write('Vous êtes à l\'accueil ' + params['prenom'] + ' ' + params['nom']+ ' que puis-je pour vous ?');
        }
        else {
            res.write('Vous êtes à l\'accueil ' + 'Mr ? Mdm ? ...Je suis confus. Vous devez bien avoir un prénom et un nom, non ?');
        }
    }
    else if (page == '/sous-sol') {
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.write('Vous êtes dans la cave à vins, ces bouteilles sont à moi !');
    }
    else if (page == '/salon') {
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.write('assied toi et detend toi, tiens des chips :)');
        jeu.emit('nouveaujoueur', 'Mario', 35); // Envoie le nom d'un nouveau joueur qui arrive et son âge
    }
    else if (page == '/etage/1/chambre') {
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.write('Hé ho, c\'est privé ici !');
    }
    else if (page == '/etage/1/WC') {
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.write('Tire bien la chasse hein!');
    }
    else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.write('Vous vous etes perdu non ? un peu d\'aide ?');
        jeu.emit('gameover', 'Vous avez perdu !');
    }
    res.end();
}

//var server = http.createServer(helloWorldFunc).listen(port);;
var server = http.createServer();
server.on('request', helloWorldFunc);
server.listen(port);
//server.close();

server.on('close', function () { // On écoute l'évènement close
    console.log('Bye bye !');
});

jeu.on('gameover', function (message) {
    console.log(message);
});

jeu.on('nouveaujoueur', function (nom, age) {
    console.log("Bienvenue " + nom + " vous avez " + age);
});

