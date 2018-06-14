var router = require("express").Router();

var Type = require('./../models/Types');

router.get('/:type', (req,res) => {
  console.log(req.params.type)
  Type.findOne({name: req.params.type}).populate('pokemons').then(type =>{
    console.log('type',type);
    if(!type){
      return res.status(404).send('Type introuvable');
    };
    res.render('types/show.html', {
      type: type,
      pokemons: type.pokemons
    })
  })
}, err => console.log(err));

module.exports = router;
