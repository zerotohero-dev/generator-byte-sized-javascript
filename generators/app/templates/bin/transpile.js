#!/usr/bin/env node

/*
 <%- srcBanner %>
 *
 <%- srcHeader %>
 */

const babil = require( 'babil' );
const join = require( 'path' ).join;

babil.initialize( {
    rootPath: join( __dirname, '..' )
} ).then(
    babil.transpile,
    () => setTimeout( () => process.exit( 1 ), 500 )
);
