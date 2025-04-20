const fs = require('fs');

const names = ['Luna', 'Max', 'Bella', 'Charlie', 'Lucy', 'Cooper', 'Daisy', 'Rocky', 'Milo', 'Chloe'];
const types = ['Dog', 'Cat', 'Rabbit', 'Bird'];
const statuses = ['Available', 'Adopted'];

const animals = [];

for (let i = 0; i < 150; i++) {
  const animal = {
    name: names[Math.floor(Math.random() * names.length)],
    type: types[Math.floor(Math.random() * types.length)],
    age: Math.floor(Math.random() * 15) + 1, // for ages between 1-15
    status: statuses[Math.floor(Math.random() * statuses.length)]
  };
  animals.push(animal);
}

fs.writeFileSync('./public/data/animals.json', JSON.stringify(animals, null, 2));
console.log('✔ animals.json created with 150 records');
