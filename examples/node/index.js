'use strict'

const ContentstackDemo = require('./contentstack-demo.js')

const Demo = new ContentstackDemo({ 'api_key': 'blt111a888f3f075ab3', 'access_token': 'blt31d1672d69417e37', 'environment': 'development' })



//get all the entries
Demo
    .get_where_Query('test_multiple')
    .spread(function(result) {
        // result object with entries
       // console.info("Result1111111111111: ", JSON.stringify(result[0].modular_blocks))

        console.info("Result22222222222: ", result)

    })
    .catch(function(err) {
        // error of get all entries
        console.error("Find Error :", err)
    })    

