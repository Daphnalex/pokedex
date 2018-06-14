var router = require('express').Router();

var Pokemons = require('./../models/Pokemons');
var Types = require('./../models/Types');

router.get('/', (req,res)=>{
  Pokemons.find().populate('types').then(pokemons => {
    res.render('pokemons/index.html', {pokemons: pokemons});
  })//on récupère tous les pokémons mais aussi tous les types associés
});

router.get('/new', (req,res)=>{
  Types.find().then(types =>{
    var pokemon = new Pokemons();
    res.render('pokemons/edit.html', {pokemon: pokemon, types: types, endpoint: '/'});
  })
});

router.get('/edit/:id', (req,res)=>{
  Types.find().then(types =>{
    Pokemons.findById(req.params.id).then(pokemon =>{
      res.render('pokemons/edit.html', {pokemon: pokemon, types: types, endpoint: '/'+ pokemon._id.toString()});
    })
  })
});

router.get('/:id', (req,res) =>{
  Pokemons.findById(req.params.id).populate('types').then(pokemon =>{
    res.render('pokemons/show.html', {pokemon: pokemon});
  },
  err => res.status(500).send(err));//on envoie normalement pas une erreur brut on fait une page erreur
})

router.get('/delete/:id', (req,res)=>{
  Pokemons.findOneAndRemove({_id: req.params.id}).then(()=>{
    res.redirect('/');
  })
})

router.post('/:id?', (req,res) =>{//on peut passer un id si oui on edite si non on créait
  console.log("coucou 1");
  new Promise((resolve, reject) => {
    console.log("coucou 2");
    if(req.params.id){
      console.log('trouvé', req.params.id);
      Pokemons.findById(req.params.id).then(resolve, reject);//il résolve sinon il rejète la promise
    } else {
      console.log("coucou 3");
      resolve(new Pokemons())
    }
  }).then(pokemon =>{
    console.log("coucou 4");
    pokemon.name = req.body.name;
    pokemon.description = req.body.description;
    pokemon.number = req.body.number;
    pokemon.types = req.body.types;
    if(req.file){
      pokemon.picture = req.file.filename;
    }
    return pokemon.save();
  }).then(()=>{
    if (req.params.id){
      res.redirect('/'+req.params.id);
    } else {
      res.redirect('/');
    }

  }, err => console.log(err))
})


module.exports = router;
