'use strict';
/*
 * Module Dependencies.
 */
const test = require('tape');
const Contentstack = require('../../dist/node/contentstack.js');
const Utils = require('./utils.js');
const init = require('../config.js');

const contentTypes = init.contentTypes;

let Stack;
/*
 * Initalise the Contentstack Instance
 * */
test('Initalise the Contentstack Stack Instance', function(TC) {
    setTimeout(function() {
        Stack = Contentstack.Stack(init.stack);
        Stack.setHost(init.host);
        TC.end();
    }, 1000);
});

test('findOne:  default .toJSON().findOne()', function(assert) {
    var Query = Stack.ContentType(contentTypes.testmultiple).Query().where('modular_blocks.test1.single_line', 'Rohit');
    Query
        .toJSON().findOne()
        .then(function success(entry) {
            assert.ok((entry && entry.uid && entry.locale && entry.publish_details), 'Entry should have publish_details, uid, locale.');
            assert.end();
        }, function error(err) {
            console.error("Error :", err);
            assert.fail("findOne:  default .toJSON().findOne()");
            assert.end();
        });
});

/*!
 * SORTING
 * !*/
test('findOne:  .ascending()', function(assert) {
    var Query = Stack.ContentType(contentTypes.testmultiple).Query(),
        field = 'created_at';

    Query
        .ascending(field)
        .toJSON().findOne()
        .then(function success(entry) {
            assert.ok((entry && entry.uid && entry.locale && entry.publish_details), 'Entry should have publish_details, uid, locale.');
            assert.end();
        }, function error(err) {
            console.error("Error :", err);
            assert.fail("findOne:  .ascending()");
            assert.end();
        });
});

test('findOne:  .descending()', function(assert) {
    var Query = Stack.ContentType(contentTypes.testmultiple).Query(),
        field = 'created_at';

    Query
        .descending(field)
        .toJSON().findOne()
        .then(function success(entry) {
            
            assert.ok((entry && entry.uid && entry.locale && entry.publish_details), 'Entry should have publish_details, uid, locale.');
            assert.end();
        }, function error(err) {
            console.error("Error :", err);
            assert.fail("findOne:  .descending()");
            assert.end();
        });
});


/*!
 * COMPARISION
 * !*/
test('findOne:  .lessThan()', function(assert) {
    var Query = Stack.ContentType(contentTypes.testmultiple).Query(),
        value = 14;
    Query
        .lessThan('modular_blocks.test1.number', value)
        .toJSON().findOne()
        .then(function success(entry) {
            assert.ok((entry && entry['modular_blocks'][0]['test1']['number'] < value), 'Entry num_field having value less than ' + value + '.');
            assert.ok((entry && entry.uid && entry.locale && entry.publish_details), 'Entry should have publish_details, uid, locale.');
            assert.end();
        }, function error(err) {
            console.error("Error :", err);
            assert.fail("findOne:  .lessThan()");
            assert.end();
        });
});


test('findOne:  .lessThanOrEqualTo()', function(assert) {
    var Query = Stack.ContentType(contentTypes.testmultiple).Query(),
        value = 14;
    Query
        .lessThanOrEqualTo('modular_blocks.test1.number', value)
        .toJSON().findOne()
        .then(function success(entry) {
            assert.ok((entry && entry['modular_blocks'][0]['test1']['number'] <= value), 'Entry num_field having value less than or equal to ' + value + '.');
            assert.ok((entry && entry.uid && entry.locale && entry.publish_details), 'Entry should have publish_details, uid, locale.');
            assert.end();
        }, function error(err) {
            console.error("Error :", err);
            assert.fail("findOne:  .lessThanOrEqualTo()");
            assert.end();
        });
});

test('findOne:  .greaterThan()', function(assert) {
    var Query = Stack.ContentType(contentTypes.testmultiple).Query(),
        field = 'modular_blocks.test1.number',
        value = 14;

    Query
        .greaterThan('modular_blocks.test1.number', value)
        .ascending(field)
        .toJSON().findOne()
        .then(function success(entry) {
            assert.ok((entry && entry['modular_blocks'][0]['test1']['number'] > value), 'Entry num_field having value greater than ' + value + '.');
            assert.ok((entry && entry.uid && entry.locale && entry.publish_details), 'Entry should have publish_details, uid, locale.');
            assert.end();
        }, function error(err) {
            console.error("Error :", err);
            assert.fail("findOne:  .greaterThan()");
            assert.end();
        });
});

test('findOne:  .greaterThanOrEqualTo()', function(assert) {
    var Query = Stack.ContentType(contentTypes.testmultiple).Query(),
        field = 'modular_blocks.test1.number',
        value = 14;

    Query
        .greaterThanOrEqualTo('modular_blocks.test1.number', value)
        .descending(field)
        .toJSON().findOne()
        .then(function success(entry) {
            assert.ok((entry && entry['modular_blocks'][0]['test1']['number'] >= value), 'Entry num_field having value greater than ' + value + '.');
            assert.ok((entry && entry.uid && entry.locale && entry.publish_details), 'Entry should have publish_details, uid, locale.');
            assert.end();
        }, function error(err) {
            console.error("Error : ", err);
            assert.fail("findOne:  .greaterThanOrEqualTo()");
            assert.end();
        });
});


test('findOne:  .notEqualTo()', function(assert) {
    var Query = Stack.ContentType(contentTypes.testmultiple).Query(),
        field = 'modular_blocks.test2.single_line',
        value = 'Rahul';

    Query
        .notEqualTo('modular_blocks.test2.single_line', value)
        .toJSON().findOne()
        .then(function success(entry) {
            assert.ok((entry && entry['modular_blocks'][1]['test2']['single_line'] != 'Rahul'), 'Entry num_field having value is not equal to ' + value + '.');
            assert.ok((entry && entry.uid && entry.locale && entry.publish_details), 'Entry should have publish_details, uid, locale.');
            assert.end();
        }, function error(err) {
            console.error("Error : ", err);
            assert.fail("findOne:  .notEqualTo()");
            assert.end();
        });
});


/*!
 * Array/Subset
 * !*/

test('findOne:  .containedIn()', function(assert) {
    var Query = Stack.ContentType(contentTypes.testmultiple).Query(),
       _in = ["Shyaam", "Rahul"]
    Query
        .containedIn('modular_blocks.test1.single_line', _in)
        .toJSON().findOne()
        .then(function success(entry) {
            assert.ok((_in.indexOf(entry['modular_blocks'][0]['test1']['single_line']) != -1), 'Entry title exists from the available options ' + _in.join(', ') + '.');
            assert.ok((entry && entry.uid && entry.locale && entry.publish_details), 'Entry should have publish_details, uid, locale.');
            assert.end();
        }, function error(err) {
            console.error("Error :", err);
            assert.fail("findOne:  .containedIn()");
            assert.end();
        });
});

test('findOne:  .notContainedIn()', function(assert) {
    var Query = Stack.ContentType(contentTypes.testmultiple).Query(),
         _in = ["Shyaam", "Rahul"];

    Query
        .notContainedIn('modular_blocks.test1.single_line', _in)
        .toJSON().findOne()
        .then(function success(entry) {
            assert.ok((_in.indexOf(entry['modular_blocks'][0]['test1']['single_line']) == -1), 'Entry title not exists from the available options ' + _in.join(', ') + '.');
            assert.ok((entry && entry.uid && entry.locale && entry.publish_details), 'Entry should have publish_details, uid, locale.');
            assert.end();
        }, function error(err) {
            console.error("Error :", err);
            assert.deepEqual(err, { error_code: 141, error_message: 'The requested entry doesn\'t exist.' }, "No entry found");
            assert.end();
        });
});


/*!
 *Element(exists)
 * !*/

test('findOne:  .exists()', function(assert) {
    var Query = Stack.ContentType(contentTypes.source).Query(),
        queryField = "boolean";

    Query
        .exists(queryField)
        .toJSON().findOne()
        .then(function success(entry) {
            assert.ok((entry && typeof entry[queryField] !== 'undefined'), 'Entry having the ' + queryField + '.');
            assert.ok((entry && entry.uid && entry.locale && entry.publish_details), 'Entry should have publish_details, uid, locale.');
            assert.end();
        }, function error(err) {
            console.error("Error :", err);
            assert.fail("findOne:  .exists()");
            assert.end();
        });
});


// Logical
test('findOne:  .or() - Query Objects', function(assert) {
   var Query1 = Stack.ContentType(contentTypes.testmultiple).Query().where('modular_blocks.test1.single_line', 'Rohit');
    var Query2 = Stack.ContentType(contentTypes.testmultiple).Query().where('modular_blocks.test1.number', 10);
    var Query =  Stack.ContentType(contentTypes.testmultiple).Query();


    Query
        .or(Query1, Query2)
        .toJSON().findOne()
        .then(function success(entry) {
            assert.ok((entry && (~(entry['modular_blocks'][0]['test1']['single_line'] === 'Rohit' || entry['modular_blocks'][0]['test1']['number'] === 10))), 'Entry satisfies the $OR condition');
            assert.ok((entry && entry.uid && entry.locale && entry.publish_details), 'Entry should have publish_details, uid, locale.');
            assert.end();
        }, function error(err) {
            console.error("Error :", err);
            assert.fail("findOne:  .or() - Query Objects");
            assert.end();
        });
});

test('findOne:  .and() - Query Objects', function(assert) {
    var Query1 = Stack.ContentType(contentTypes.testmultiple).Query().where('modular_blocks.test1.single_line', 'Rohit');
    var Query2 = Stack.ContentType(contentTypes.testmultiple).Query().where('modular_blocks.test1.number', 10);
    var Query =  Stack.ContentType(contentTypes.testmultiple).Query();

    Query
        .and(Query1, Query2)
        .toJSON().findOne()
        .then(function success(entry) {
            assert.ok(~(entry['modular_blocks'][0]['test1']['single_line'] === 'Rohit' && entry['modular_blocks'][0]['test1']['number'] === 10), 'Entry satisfies the $AND operation.');
            assert.ok((entry && entry.uid && entry.locale && entry.publish_details), 'Entry should have publish_details, uid, locale.');
            assert.end();
        }, function error(err) {
            console.error("Error :", err);
            assert.fail("findOne:  .and() - Query Objects");
            assert.end();
        });
});