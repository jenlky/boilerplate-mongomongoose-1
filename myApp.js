require('dotenv').config();
const mongoose = require('mongoose');

try {
  mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
} catch (error) {
  console.error('error', error)
}

const personSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: Number,
  favoriteFoods: [String]
})

const Person = mongoose.model('Person', personSchema)

const createAndSavePerson = (done) => {
  const Jenssen = new Person({ name: "Jenssen", age: 29, favoriteFoods: ["banana", "ramen"] })

  return Jenssen.save((error, data) => {
    if (error) return console.error(error);
    done(null, data);
  })
};

const arrayOfPeople = [
  { name: "Gina Teo", age: 32, favoriteFoods: ["astons", "hotpot"] }, 
  { name: "Wee Huan", age: 35, favoriteFoods: ["pig organ soup", "chuanchuan"] },
  { name: "Terence Tao", age: 40, favoriteFoods: ["idk what he likes", "rd long essay"] }
]

const createManyPeople = (arrayOfPeople, done) => {
  return Person.create(arrayOfPeople, (error, people) => {
    if (error) return console.error(error);
    done(null, people);
  })
};

const findPeopleByName = (personName, done) => {
  return Person.find({ name: personName }, (error, person) => {
    if (error) return console.error(error);
    done(null, person);
  })
};

const findOneByFood = (food, done) => {
  return Person.findOne({ favoriteFoods: food }, (error, person) => {
    if (error) return console.error(error);
    done(null, person);
  })
};

const findPersonById = (personId, done) => {
  return Person.findOne({ _id: personId }, (error, person) => {
    if (error) return console.error(error);
    done(null, person);
  })
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";

  Person.findById(personId, (err, person) => {
    if (err) return console.error(err);
    person.favoriteFoods.push(foodToAdd);

    person.save((err, updatedPerson) => {
      if (err) return console.error(err);
      done(null, updatedPerson);
    })
  })
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;

  return Person.findOneAndUpdate({ name: personName }, { age: ageToSet }, { new: true }, (error, person) => {
    if (error) return console.error(error);
    done(null, person);
  })
};

const removeById = (personId, done) => {
  return Person.findByIdAndRemove(personId, (error, person) => {
    if (error) return console.error(error);
    done(null, person);
  })
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";

  return Person.remove({ name: nameToRemove }, (error, person) => {
    if (error) return console.error(error);
    done(null, person);
  })
};

const queryChain = (done) => {
  const foodToSearch = "burrito";

  done(null /*, data*/);
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
