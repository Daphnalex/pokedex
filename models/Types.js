var mongoose = require('mongoose');

var typeSchema = new mongoose.Schema({
  name: String,
  color: {
    type: String,
    default: 'red'
  }
});

//virtual : champ virtuel -- calculé -- non stocké dans la base mais qu'on peut quand même utilisé
typeSchema.virtual('pokemons', {
  ref: 'Pokemon', //model concerné par la relation
  localField: '_id', //id de mon mondel type
  foreignField: 'types'
});

//si je fais type.pokemons il récupère tous les pokémons du type ayant l'id _id

var Type = mongoose.model('Type', typeSchema);
module.exports = Type;
