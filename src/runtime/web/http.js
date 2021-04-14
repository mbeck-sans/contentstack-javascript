import ES6Promise from 'es6-promise';
// import fetch from 'isomorphic-fetch';
import fetch from 'whatwg-fetch'

ES6Promise.polyfill();

export default fetch;