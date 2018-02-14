'use strict'
/*!
 * module dependencies
 */
const Contentstack = require('../../dist/node/contentstack.js');

/*
 * Example ContentstackDemo Class
 * */

class ContentstackDemo {
    constructor(config) {
        config = config || { 'api_key': 'blt123something', 'access_token': 'blt123something', 'environment': 'development' }
            // Initialize the Contentstackstack
        this.Stack = Contentstack.Stack(config);
    }

    /**
     * getEntries
     * @description  : getEntries is used to get the entries of the specified entries
     * @params       : contentTypeUid {string} - Content-Type from which entries to be retrieved
     * @return       : Result {Promise}
     */
    get_regex_Query(contentTypeUid) {
        contentTypeUid = contentTypeUid || 'source'

        return this.Stack.ContentType(contentTypeUid).Query().regex('modular_blocks.test1.single_line', '^Rohit').toJSON().find()
       
    }

    /**
     * getEntries
     * @description  : getEntries is used to get the entries of the specified entries
     * @params       : contentTypeUid {string} - Content-Type from which entries to be retrieved
     * @return       : Result {Promise}
     */
    get_where_Query(contentTypeUid) {
        contentTypeUid = contentTypeUid || 'source'
        return this.Stack.ContentType(contentTypeUid).Query().where('modular_blocks.test1.single_line', 'Rohit').toJSON().find()
       //return this.Stack.ContentType(contentTypeUid).Query().or('modular_blocks.test2.referenc_test').toJSON().find()
    }

    /**
     * getEntries
     * @description  : getEntries is used to get the entries of the specified entries
     * @params       : contentTypeUid {string} - Content-Type from which entries to be retrieved
     * @return       : Result {Promise}
     */
    get_descending_Query(contentTypeUid) {
        contentTypeUid = contentTypeUid || 'source'
        return this.Stack.ContentType(contentTypeUid).Query().descending('modular_blocks.test1.number').toJSON().find()
       //return this.Stack.ContentType(contentTypeUid).Query().or('modular_blocks.test2.referenc_test').toJSON().find()
    }


    /**
     * getEntries
     * @description  : getEntries is used to get the entries of the specified entries
     * @params       : contentTypeUid {string} - Content-Type from which entries to be retrieved
     * @return       : Result {Promise}
     */
    get_lessthan_Query(contentTypeUid) {
        contentTypeUid = contentTypeUid || 'source'
        return this.Stack.ContentType(contentTypeUid).Query().lessThan('modular_blocks.test1.number', 14).toJSON().find()
       //return this.Stack.ContentType(contentTypeUid).Query().or('modular_blocks.test2.referenc_test').toJSON().find()
    }



  /**
     * getEntries
     * @description  : getEntries is used to get the entries of the specified entries
     * @params       : contentTypeUid {string} - Content-Type from which entries to be retrieved
     * @return       : Result {Promise}
     */
    get_lessThanOrEqualTo_Query(contentTypeUid) {
        contentTypeUid = contentTypeUid || 'source'
        return this.Stack.ContentType(contentTypeUid).Query().lessThanOrEqualTo('modular_blocks.test1.number', 14).toJSON().find()
       //return this.Stack.ContentType(contentTypeUid).Query().or('modular_blocks.test2.referenc_test').toJSON().find()
    }



  /**
     * getEntries
     * @description  : getEntries is used to get the entries of the specified entries
     * @params       : contentTypeUid {string} - Content-Type from which entries to be retrieved
     * @return       : Result {Promise}
     */
    get_greaterThan_Query(contentTypeUid) {
        contentTypeUid = contentTypeUid || 'source'
        return this.Stack.ContentType(contentTypeUid).Query().greaterThan('modular_blocks.test1.number', 14).toJSON().find()
       //return this.Stack.ContentType(contentTypeUid).Query().or('modular_blocks.test2.referenc_test').toJSON().find()
    }

    /**
     * getEntries
     * @description  : getEntries is used to get the entries of the specified entries
     * @params       : contentTypeUid {string} - Content-Type from which entries to be retrieved
     * @return       : Result {Promise}
     */
    get_greaterThanOrEqualTo_Query(contentTypeUid) {
        contentTypeUid = contentTypeUid || 'source'
        return this.Stack.ContentType(contentTypeUid).Query().greaterThanOrEqualTo('modular_blocks.test1.number', 14).toJSON().find()
       //return this.Stack.ContentType(contentTypeUid).Query().or('modular_blocks.test2.referenc_test').toJSON().find()
    }

    /**
     * getEntries
     * @description  : getEntries is used to get the entries of the specified entries
     * @params       : contentTypeUid {string} - Content-Type from which entries to be retrieved
     * @return       : Result {Promise}
     */
    get_notEqualTo_Query(contentTypeUid) {
        contentTypeUid = contentTypeUid || 'source'
        return this.Stack.ContentType(contentTypeUid).Query().notEqualTo('modular_blocks.test1.number', 14).toJSON().find()
       //return this.Stack.ContentType(contentTypeUid).Query().or('modular_blocks.test2.referenc_test').toJSON().find()
    }

    /**
     * getEntries
     * @description  : getEntries is used to get the entries of the specified entries
     * @params       : contentTypeUid {string} - Content-Type from which entries to be retrieved
     * @return       : Result {Promise}
     */
    get_or_Query(contentTypeUid) {
        contentTypeUid = contentTypeUid || 'source'

    var Query1 = this.Stack.ContentType(contentTypeUid).Query().where('modular_blocks.test1.single_line', 'Rohit');
    var Query2 = this.Stack.ContentType(contentTypeUid).Query().where('modular_blocks.test1.number', 10);
    return this.Stack.ContentType(contentTypeUid).Query().or(Query1, Query2).toJSON().find()
    }

    /**
     * getEntries
     * @description  : getEntries is used to get the entries of the specified entries
     * @params       : contentTypeUid {string} - Content-Type from which entries to be retrieved
     * @return       : Result {Promise}
     */
    get_and_Query(contentTypeUid) {
        contentTypeUid = contentTypeUid || 'source'

    var Query1 = this.Stack.ContentType(contentTypeUid).Query().where('modular_blocks.test1.single_line', 'Rohit');
    var Query2 = this.Stack.ContentType(contentTypeUid).Query().where('modular_blocks.test1.number', 10);
    return this.Stack.ContentType(contentTypeUid).Query().and(Query1, Query2).toJSON().find()
    }

     /**
     * getEntries
     * @description  : getEntries is used to get the entries of the specified entries
     * @params       : contentTypeUid {string} - Content-Type from which entries to be retrieved
     * @return       : Result {Promise}
     */
    get_includeReference_Query(contentTypeUid) {
        contentTypeUid = contentTypeUid || 'source'
    return this.Stack.ContentType(contentTypeUid).Query().includeReference('modular_blocks.test1.referenc_test').toJSON().find()
    }

     /**
     * getEntries
     * @description  : getEntries is used to get the entries of the specified entries
     * @params       : contentTypeUid {string} - Content-Type from which entries to be retrieved
     * @return       : Result {Promise}
     */
    get_only_Query(contentTypeUid) {
        contentTypeUid = contentTypeUid || 'source'
    return this.Stack.ContentType(contentTypeUid).Query().only('modular_blocks.test1.number').toJSON().find()
    }

}

module.exports = ContentstackDemo