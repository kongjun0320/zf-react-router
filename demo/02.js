const { pathToRegexp } = require('path-to-regexp');

const params = [];

const regexp = pathToRegexp('/user/:name/:age', params);

const result = '/user/aic/27'.match(regexp);

console.log(regexp);
console.log(result);
console.log(params);
