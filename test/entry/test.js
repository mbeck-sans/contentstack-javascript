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

// only
test('findOne:  .only() - Single String Parameter', function(assert) {
    var Query = Stack.ContentType(contentTypes.source).Query();

    Query
        .only('title')
        .toJSON().find()
        .then(function success(entry) {
            console.log("dscvfjhgvdfhjgvhjdf>>>>>>>>>", entry)
            console.log("dscvfjhgvdfhjgvhjdf>>>>>>>>>", Object.keys(entry).length)
            var flag = (entry && Object.keys(entry).length === 2 && "title" in entry && "uid" in entry && "url" in entry);
            assert.ok(flag, 'entry with the field title in the resultset');
            assert.end();
        }, function error(err) {
            console.error("Error :", err);
            assert.fail("findOne:  .only() - Single String Parameter");
            assert.end();
        });
});

test('findOne:  .only() - Multiple String Parameter', function(assert) {
    var Query = Stack.ContentType(contentTypes.source).Query();

    Query
        .only('BASE', 'title')
        .toJSON().findOne()
        .then(function success(entry) {
            var flag = (entry && Object.keys(entry).length === 2 && "title" in entry && "uid" in entry && "url" in entry);
            assert.ok(flag, 'entry with the field title in the resultset');
            assert.end();
        }, function error(err) {
            console.error("Error :", err);
            assert.fail("findOne:  .only() - Multiple String Parameter");
            assert.end();
        });
});

test('findOne:  .only() - Array Parameter', function(assert) {
    var Query = Stack.ContentType(contentTypes.source).Query();

    Query
        .only(['title', 'url'])
        .toJSON().findOne()
        .then(function success(entry) {
            var flag = (entry && Object.keys(entry).length === 4 && "title" in entry && "url" in entry && "uid" in entry);
            assert.ok(flag, 'entry with the field title,url in the resultset');
            assert.end();
        }, function error(err) {
            console.error("Error :", err);
            assert.fail("findOne:  .only() - Array Parameter");
            assert.end();
        });
});

test('findOne:  .only() - For the reference - String', function(assert) {
    var Query = Stack.ContentType(contentTypes.source).Query();

    Query
        .includeReference('reference')
        .only('BASE', 'reference')
        .only('reference', 'title')
        .toJSON().findOne()
        .then(function success(entry) {
            var flag = false;
            if (entry && entry['reference'] && typeof entry['reference'] === 'object') {
                flag = entry.reference.every(function(reference) {
                    return (reference && "title" in reference && "uid" in reference);
                });
            }
            assert.equal(flag, true, 'Entry has the reference with only paramteres.');
            assert.end();
        }, function error(err) {
            console.error("Error :", err);
            assert.fail("findOne:  .only() - For the reference - String");
            assert.end();
        });
});

test('findOne:  .only() - For the reference - Array', function(assert) {
    var Query = Stack.ContentType(contentTypes.source).Query();

    Query
        .includeReference('reference')
        .only('BASE', ['reference'])
        .only('reference', ['title'])
        .toJSON().findOne()
        .then(function success(entry) {
            var flag = false;
            if (entry && entry['reference'] && entry['reference'].length) {
                flag = entry.reference.every(function(reference) {
                    return (reference && "title" in reference && "uid" in reference);
                });
            }
            assert.equal(flag, true, 'Entry has the reference with only paramteres.');
            assert.end();
        }, function error(err) {
            console.error("Error :", err);
            assert.fail("findOne:  .only() - For the reference - Array");
            assert.end();
        });
});