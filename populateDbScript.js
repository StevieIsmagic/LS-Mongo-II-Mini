const Person = require('./models'); // person schema
const people = require('./people'); // seed data
const mongoose = require('mongoose'); // library that helps node interact w mongodb

mongoose.Promise = global.Promise;
mongoose.connect(                   // connects mongoDB to local host server
  'mongodb://localhost/people',
  { useMongoClient: true }
);
const populate = () => {
  const populatePeople = () => {
    const allPeople = people; 
    const promises = allPeople.map(p => new Person(p).save()); // taking all ppl in seed data and running through person schema
    return Promise.all(promises);
  };

  return populatePeople()
    .then(() => {
      console.log('done');
      mongoose.disconnect()
    })
    .catch((err) => {
      console.log('ERROR', err);
      throw new Error(err);
    });
  };
  
  populate();