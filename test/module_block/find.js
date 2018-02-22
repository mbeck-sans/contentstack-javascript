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
    var Query = Stack.ContentType(contentTypes.testmultiple).Query(),
        field = 'updated_at';
    Query
        .toJSON()
        .find()
        .then(function success(entries) {
            // assert.ok("entries" in result, 'entries key present in the resultset');
            // assert.equal(Utils.isentriesPublished(entries[0], Stack.environment_uid, 'en-us'), true, "entries present in the resultset are published.");
            assert.ok(entries[0].length, 'entries present in the resultset');
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
 test('.ascending()', function(assert) {
    var Query = Stack.ContentType(contentTypes.testmultiple).Query(),
        field = 'updated_at';

    Query
        .ascending(field)
        .toJSON()
        .find()
        .then(function success(entries) {
            // assert.ok("entries" in result, 'entries key present in the resultset');
            // assert.equal(Utils.isentriesPublished(entries[0], Stack.environment_uid, 'en-us'), true, "entries present in the resultset are published.");
            assert.ok(entries[0].length, 'entries present in the resultset');
            if (entries && entries.length && entries[0].length) {
                var prev = entries[0][0][field];
                var _entries = entries[0].every(function(entry) {
                    var flag = (entry[field] <= prev);
                    prev = entry[field];
                    return (entry[field] >= prev);
                });
                assert.equal(_entries, true, "entries sorted ascending on '" + field + "' field");
            }
            assert.end();
        }, function error(err) {
            console.error("error :", err);
            assert.fail(".ascending()");
            assert.end();
        });
});

test('.descending()', function(assert) {
    var Query = Stack.ContentType(contentTypes.testmultiple).Query(),
        field = 'modular_blocks.test1.number';
    Query
        .descending(field)
        .toJSON()
        .find()
        .then(function success(entries) {
            assert.ok(entries[0].length, 'entries present in the resultset');
            if (entries && entries.length && entries[0].length) {
                var prev = entries[0][0]['modular_blocks'][0]['test1']['number'];
                var _entries = entries[0].every(function(entry) {
                    var flag = (entry["modular_blocks"][0]["test1"]["number"] <= prev);
                    prev = entry["modular_blocks"][0]["test1"]["number"];  
                    return flag;
                });
                assert.equal(_entries, true, "entries sorted descending on '" + "' field");
            }
            assert.end();
        }, function error(err) {
            console.error("error :", err);
            assert.fail(".descending()");
            assert.end();
        });
});


test('.lessThan()', function(assert) {
    var Query = Stack.ContentType(contentTypes.testmultiple).Query(),
        field = 'modular_blocks.test1.number',
        value = 14;
    Query
        .lessThan('modular_blocks.test1.number', value)
        .toJSON()
        .find()
        .then(function success(entries) {
            assert.ok(entries[0].length, '1 Entry present in the resultset');
            if (entries && entries.length && entries[0].length) {
                var prev = entries[0][0]["modular_blocks"][0]['test1']['number'];
                var _entries = entries[0].every(function(entry) {
                    var flag = (entry['modular_blocks'][0]['test1']['number'] < value);                    
                    prev = entry['modular_blocks'][0]['test1']['number'];
                    return flag;
                });
                assert.equal(_entries, true, "entries sorted descending on '" + field + "' field");
            }
            assert.end();
        }, function error(err) {
            console.error('Error : ', err);
            assert.fail(".lessThan()");
            assert.end();
        });
});


test('.lessThanOrEqualTo()', function(assert) {
    var Query = Stack.ContentType(contentTypes.testmultiple).Query(),
        field = 'modular_blocks.test1.number',
        value = 14;

    Query
        .lessThanOrEqualTo('modular_blocks.test1.number', value)
        .toJSON()
        .find()
        .then(function success(entries) {
            assert.ok(entries[0].length, '1 Entry present in the resultset');
            if (entries && entries.length && entries[0].length) {
                var prev = entries[0][0]["modular_blocks"][0]['test1']['number'];
                var _entries = entries[0].every(function(entry) {
                    var flag = (entry['modular_blocks'][0]['test1']['number'] <= value);
                    prev = entry['modular_blocks'][0]['test1']['number'];
                    return flag;
                });
                assert.equal(_entries, true, "entries sorted descending on '" + field + "' field");
            }
            assert.end();
        }, function error(err) {
            console.error("error :", err);
            assert.fail(".lessThanOrEqualTo()");
            assert.end();
        });
});


test('.greaterThan()', function(assert) {
    var Query = Stack.ContentType(contentTypes.testmultiple).Query(),
        field = 'modular_blocks.test1.number',
        value = 14;

    Query
        .greaterThan('modular_blocks.test1.number', value)
        .ascending(field)
        .toJSON()
        .find()
        .then(function success(entries) {
            // assert.ok("entries" in result, 'entries key present in the resultset');
            // assert.equal(Utils.isentriesPublished(entries[0], Stack.environment_uid, 'en-us'), true, "entries present in the resultset are published.");
            assert.ok(entries[0].length, 'entries present in the resultset');
            if (entries && entries.length && entries[0].length) {
                var prev = entries[0][0]['modular_blocks'][0]['test1']['number'];
                var _entries = entries[0].every(function(entry) {
                    var flag = (entry['modular_blocks'][0]['test1']['number'] > value);
                    prev = entry['modular_blocks'][0]['test1']['number'];
                    return flag;
                });
                assert.equal(_entries, true, "entries sorted ascending on '" + field + "' field");
            }
            assert.end();
        }, function error(err) {
            assert.fail(".greaterThan()");
            assert.end();
        });
});

test('.greaterThanOrEqualTo()', function(assert) {
    var Query = Stack.ContentType(contentTypes.testmultiple).Query(),
        field = 'modular_blocks.test1.number',
        value = 14;

    Query
        .greaterThanOrEqualTo('modular_blocks.test1.number', value)
        .descending(field)
        .toJSON()
        .find()
        .then(function success(entries) {
            // assert.ok("entries" in result, 'entries key present in the resultset');
            // assert.equal(Utils.isentriesPublished(entries[0], Stack.environment_uid, 'en-us'), true, "entries present in the resultset are published.");
            assert.ok(entries[0].length, 'entries present in the resultset');
            if (entries && entries.length && entries[0].length) {
                var prev = entries[0][0]['modular_blocks'][0]['test1']['number'];;
                var _entries = entries[0].every(function(entry) {
                    var flag = (entry['modular_blocks'][0]['test1']['number'] >= value);
                    prev = entry['modular_blocks'][0]['test1']['number'];
                    return flag;
                });
                assert.equal(_entries, true, "entries sorted descending on '" + field + "' field");
            }
            assert.end();
        }, function error(err) {
            console.error("error :", err);
            assert.fail(".greaterThanOrEqualTo()");
            assert.end();
        });
});

test('.notEqualTo()', function(assert) {
    var Query = Stack.ContentType(contentTypes.testmultiple).Query(),
        field = 'modular_blocks.test2.single_line',
        value = 'Rahul';

    Query
        .notEqualTo('modular_blocks.test2.single_line', value)
        .toJSON()
        .find()
        .then(function success(entries) {
            assert.ok(entries[0].length, 'entries present in the resultset');
            if (entries && entries.length && entries[0].length) {
                var _entries = entries[0].every(function(entry) {
                    var flag = (entry['modular_blocks'][1]['test2']['single_line'] == 'Rahul');
                });
                assert.equal(_entries, false, "entries sorted descending on '" + "' field");
            }
            assert.end();
        }, function error(err) {
            console.error("error :", err);
            assert.fail(".notEqualTo()");
            assert.end();
        });
});


// includeReference
test('.includeReference() - String', function(assert) {
    var Query = Stack.ContentType(contentTypes.testmultiple).Query();

    Query
        .includeReference('modular_blocks.test2.referenc_test')
        .toJSON()
        .find()
        .then(function success(entries) {
            // assert.ok("entries" in result, 'Entries key present in the resultset');
            //assert.equal(Utils.isEntriesPublished(entries[0], Stack.environment_uid, 'en-us'), true, "Entries present in the resultset are published.");
            var flag = entries[0].every(function(entry) {
                return (entry && entry['modular_blocks'][1]['test2']['referenc_test'] && typeof entry['modular_blocks'][1]['test2']['referenc_test'] === 'object');
            });
            assert.equal(flag, true, 'all the present reference are included');
            assert.end();
        }, function error(err) {
            console.error("error :", err);
            assert.fail(".includeReference() - String");
            assert.end();
        });
});


test('.where()', function(assert) {
    var Query = Stack.ContentType(contentTypes.testmultiple).Query();

    Query
        .where('modular_blocks.test1.single_line', 'rakesh')
        .toJSON()
        .find()
        .then(function success(entries) {
            assert.equal(entries[0].length, 0, ' zero entry present in the resultset');
            assert.end();
        }, function error(err) {
            console.error("error :", err);
            assert.fail(".equalTo compare boolean value (true)");
            assert.end();
        });
});

test('.equalTo()', function(assert) {
    var Query = Stack.ContentType(contentTypes.testmultiple).Query();

    Query
        .equalTo('modular_blocks.test1.single_line', 'Rohit')
        .toJSON()
        .find()
        .then(function success(entries) {
             assert.ok(entries[0].length, 'entries present in the resultset');
             assert.equal(entries[0].length, 2, ' three entries present in the resultset');
             assert.end();
        }, function error(err) {
            console.error("error :", err);
            assert.fail(".where()");
            assert.end();
        });
});


test('.containedIn()', function(assert) {
    var Query = Stack.ContentType(contentTypes.testmultiple).Query(),
        _in = ["Shyaam", "Rahul"]

    Query
        .containedIn('modular_blocks.test1.single_line', _in)
        .toJSON()
        .find()
        .then(function success(entries) {
            assert.ok(entries[0].length, 'entries present in the resultset');
            assert.ok(entries[0].length, 2, 'two entries present in the resultset');
            if (entries && entries.length && entries[0].length) {
                var _entries = entries[0].every(function(entry) {
                    return (_in.indexOf(entry['modular_blocks'][0]['test1']['single_line']) != -1);
                });
                assert.equal(_entries, true, "modular_blocks feature $containedIn satisfied");
            }
            assert.end();
        }, function error(err) {
            console.error("error :", err);
            assert.fail(".containedIn()");
            assert.end();
        });
});


test('.notContainedIn()', function(assert) {
    var Query = Stack.ContentType(contentTypes.testmultiple).Query(),
        _in = ["Shyaam", "Rahul"];

    Query
        .notContainedIn('modular_blocks.test1.single_line', _in)
        .toJSON()
        .find()
        .then(function success(entries) {
            // assert.ok("entries" in result, 'entries key present in the resultset');
            //assert.ok(entries[0].length, 'No Entry present in the resultset');
            assert.ok(entries[0].length, 2, 'two entries present in the resultset');
            assert.end();
        }, function error(err) {
            console.error("error :", err);
            assert.fail(".notContainedIn()");
            assert.end();
        });
});

/*!
 *Element(exists)
 * !*/

test('.exists()', function(assert) {
    var Query = Stack.ContentType(contentTypes.testmultiple).Query(),
        queryField = "modular_blocks.test3.single_line",
        field = 'updated_at';

    Query
        .exists(queryField)
        .toJSON()
        .find()
        .then(function success(entries) {
            assert.ok(entries[0].length, 'entries present in the resultset');
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
            assert.fail(".exists()");
            assert.end();
        });
});

test('.notExists()', function(assert) {
    var Query = Stack.ContentType(contentTypes.testmultiple).Query(),
        queryField = "modular_blocks.test3.single_line",
        field = 'updated_at';

    Query
        .notExists(queryField)
        .toJSON()
        .find()
        .then(function success(entries) {
            assert.ok("entries" in entries, 'Entries key present in the resultset');
            //assert.notok(entries[0].length, 'No entry present in the resultset');
            if (entries && entries.length && entries[0].length) {
                var prev = entries[0][0][field];
                var _entries = entries[0].every(function(entry) {
                    return (entry[field] <= prev);
                });
                assert.equal(_entries, true, "entries sorted descending on '" + field + "' field");
            }
            assert.end();
        }, function error(err) {
            console.error("error :", err);
            assert.fail(".notExists()");
            assert.end();
        });
});


test('.or() - Query Objects', function(assert) {
    var Query1 = Stack.ContentType(contentTypes.testmultiple).Query().where('modular_blocks.test1.single_line', 'Rohit');
    var Query2 = Stack.ContentType(contentTypes.testmultiple).Query().where('modular_blocks.test1.number', 10);
    var Query =  Stack.ContentType(contentTypes.testmultiple).Query();

    Query
        .or(Query1, Query2)
        .toJSON()
        .find()
        .then(function success(entries) {
            assert.ok(entries[0].length, 'Entries present in the resultset');
            assert.ok(entries[0].length, 2, 'two entries present in the resultset');
            if (entries && entries.length && entries[0].length) {
                var _entries = entries[0].every(function(entry) {

                    return (~(entry['modular_blocks'][0]['test1']['single_line'] === 'Rohit' || entry['modular_blocks'][0]['test1']['number'] === 10));
                });
                assert.ok(_entries, '$OR condition satisfied');

            }
            assert.end();
        }, function error(err) {
            console.error("error :", err);
            assert.fail(".or() - Query Objects");
            assert.end();
        });
});

test('.and() - Query Objects', function(assert) {
    var Query1 = Stack.ContentType(contentTypes.testmultiple).Query().where('modular_blocks.test1.single_line', 'Rohit');
    var Query2 = Stack.ContentType(contentTypes.testmultiple).Query().where('modular_blocks.test1.number', 10);
    var Query =  Stack.ContentType(contentTypes.testmultiple).Query();

    Query
        .and(Query1, Query2)
        .toJSON()
        .find()
        .then(function success(entries) {
            assert.ok(entries[0].length, '1 Entry present in the resultset');
            if (entries && entries.length && entries[0].length) {
                // console.log("\n\n\n\n",JSON.stringify(entries));
                var _entries = entries[0].every(function(entry) {
                    return (~(entry['modular_blocks'][0]['test1']['single_line'] === 'Rohit' && entry['modular_blocks'][0]['test1']['number'] === 10));
                });
                assert.ok(_entries, '$AND condition satisfied');
            }
            assert.end();
        }, function error(err) {
            console.error("error :", err);
            assert.fail(".and() - Query Objects");
            assert.end();
        });
});


test('.regex()', function(assert) {
    var Query = Stack.ContentType(contentTypes.testmultiple).Query(),
        field = 'modular_blocks.test2.multi_line',
        value = 'Hello',
        regex = {
            pattern: '^Hello',
            options: 'i'
        },
        regexpObj = new RegExp(regex.pattern);

    Query
        .regex(field, regex.pattern)
        .toJSON()
        .find()
        .then(function success(entries) {
            // assert.ok("entries" in result, 'Entries key present in the resultset');
            //assert.equal(Utils.isEntriesPublished(entries[0], Stack.environment_uid, 'en-us'), true, "Entries present in the resultset are published.");
            assert.ok((entries.length >= 1), '1 or more Entry/Entries present in the resultset');
            var flag = entries[0].every(function(entry) {
                return regexpObj.test(value);                
            });
            assert.ok(flag, "regexp satisfied for all the entries in the resultset");
            assert.end();
        }, function error(err) {
            console.error("error :", err);
            assert.fail(".regex()");
            assert.end();
        });
});






