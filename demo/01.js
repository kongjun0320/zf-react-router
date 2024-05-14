const { pathToRegexp } = require('path-to-regexp');

const regexp = pathToRegexp('/home', [], { end: false });

// /^\/home[\/#\?]?$/i
console.log(regexp);

// console.log(regexp.test('/home'));
// console.log(regexp.test('/home/'));
// console.log(regexp.test('/home#'));
// console.log(regexp.test('/home?'));
// console.log(regexp.test('/home/'));
// console.log(regexp.test('/home#'));

// /^\/home(?:[\/#\?](?=[]|$))?(?=[\/#\?]|[]|$)/
