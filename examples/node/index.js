'use strict'

const ContentstackDemo = require('./contentstack-demo.js')

const Demo = new ContentstackDemo({ 'api_key': 'bltc0a6a8609e24c651', 'access_token': 'blt882b9ae3ee9af2e1', 'environment': 'development' })



//get all the entries
Demo
    .getEntries('source')
    .spread(function(result) {
        // result object with entries
        console.info("Result: ", result)

    })
    .catch(function(err) {
        // error of get all entries
        console.error("Find Error :", err)
    })


    // get single entry
Demo
    .getEntry('source', 'bltsomething123')
    .then(function(result) {
        // result object with entry
        console.info("Result2 : ", JSON.stringify(result))
    })
    .catch(function(err) {
        // error of get entry
        console.error("Fetch Error :", err)
    })


