'use strict';
/*
 * Module Dependencies.
 */
const test = require('tape');
const Contentstack = require('../../dist/node/contentstack.js');
const init = require('../config.js');
const Utils = require('./utils.js');

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

test('default .find()', function(assert) {
    var Query = Stack.ContentType(contentTypes.source).Query(),
        field = 'updated_at';
    Query
        .toJSON()
        .find()
        .then(function success(entries) {
            // assert.ok("entries" in result, 'Entries key present in the resultset');
            // assert.equal(Utils.isEntriesPublished(entries[0], Stack.environment_uid, 'en-us'), true, "Entries present in the resultset are published.");
            assert.ok(entries[0].length, 'Entries present in the resultset');
            assert.notok(entries[1], 'Count should not be present');
            if (entries && entries.length && entries[0].length) {
                var prev = entries[0][0][field];
                var _entries = entries[0].every(function(entry) {
                    prev = entry[field];
                    return (entry[field] <= prev);
                });
                assert.equal(_entries, true, "default sorting of descending 'updated_at'");
            }
            assert.end();
        }, function error(err) {
            console.error("error :", err);
            assert.fail("default .find()");
            assert.end();
        });
});

/*!
 * SORTING
 * !*/
// test('.ascending()', function(assert) {
//     var Query = Stack.ContentType(contentTypes.source).Query(),
//         field = 'updated_at';

//     Query
//         .ascending(field)
//         .toJSON()
//         .find()
//         .then(function success(entries) {
//             // assert.ok("entries" in result, 'Entries key present in the resultset');
//             // assert.equal(Utils.isEntriesPublished(entries[0], Stack.environment_uid, 'en-us'), true, "Entries present in the resultset are published.");
//             assert.ok(entries[0].length, 'Entries present in the resultset');
//             if (entries && entries.length && entries[0].length) {
//                 var prev = entries[0][0][field];
//                 var _entries = entries[0].every(function(entry) {
//                     var flag = (entry[field] <= prev);
//                     prev = entry[field];
//                     return (entry[field] >= prev);
//                 });
//                 assert.equal(_entries, true, "entries sorted ascending on '" + field + "' field");
//             }
//             assert.end();
//         }, function error(err) {
//             console.error("error :", err);
//             assert.fail(".ascending()");
//             assert.end();
//         });
// });

test('.descending()', function(assert) {

    console.log("sdhbcv gfdgh>>>>>>>>>>", assert)
    var Query = Stack.ContentType(contentTypes.test_multiple).Query(),
        field = 'modular_blocks.test1.number';

    Query
        .descending(field)
        .toJSON()
        .find()
        .then(function success(entries) {

            assert.ok(entries[0].length, 'Entries present in the resultset');
            if (entries && entries.length && entries[0].length) {
                var prev = entries[0][0][field];
                var _entries = entries[0].every(function(entry) {
                    var flag = (entry[field] <= prev);
                    prev = entry[field];
                    return flag;
                });
                assert.equal(_entries, true, "entries sorted descending on '" + field + "' field");
            }
            assert.end();
        }, function error(err) {
            console.error("error :", err);
            assert.fail(".descending()");
            assert.end();
        });
});