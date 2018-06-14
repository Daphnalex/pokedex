var express = require('express');
var mongoose = require("mongoose");
var nunjucks = require('nunjucks');
var multer = require('multer');

var upload = multer({
  dest: __dirname + "/upload"
})
mongoose.connect('mongodb://localhost/pokedex');

require('./models/Pokemons');
require('./models/Types');

var app = express();

app.use(upload.single('file'));//quand tu as un champ qui s'appelle file tu sauvegarde dans le dossier upload

// app.get('/', (req,res) => {
//   res.send('Salut');
// }); //on définit une nouvelle route. Résultat de ce qui est envoyé au client sur cette route via la fonction send()

app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css'));

app.use('/', require('./routes/pokemons'));
app.use('/types', require('./routes/types'));

app.use('/upload', express.static(__dirname + '/upload'));

nunjucks.configure('views', { //dossier ou se trouve nos vues
  autoescape: true,//échapper automatiquement tout caractère html de nos variables
  express: app//instance de notre application
});

console.log('Pokédex lancé sur le port 3000');

app.listen(3000);//on écoute notre application sur le port 3000
