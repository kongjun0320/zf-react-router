const regex = /\d+(?=\$)/g;
const str = 'The total is 100$ and the discount is 20$';

const matches = str.match(regex); // ["100", "20"]
console.log(matches);
