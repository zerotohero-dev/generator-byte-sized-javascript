#!/usr/bin/env node

/*         .°
 *        |
 *     .-----.
 *     | | | |       Byte-Sized JavaScript
 *     \  °  /          Module Generator
 *   ___-___-___      https://bytesized.tv/
 *  ()_   .   _()
 *  /  /\ : /\  \
 * (___)| . |(___)
 *
 * This project is a part of the “Byte-Sized JavaScript” videocast.
 *
 * You can watch “Byte-Sized JavaScript” at: https://bytesized.tv/
 *
 * MIT Licensed — See LICENSE.md
 *
 * Send your comments, suggestions, and feedback to me@volkan.io
 */

const babil = require( 'babil' );
const transpile = babil.transpile;
const join = require( 'path' ).join;

const ROOT_PATH = join( __dirname, '..' );

babil.initialize( {
    rootPath: ROOT_PATH,
    srcPath: join( ROOT_PATH, 'generators/app/lib' ),
    releasePath: join( ROOT_PATH, 'generators/app/release' )
} )
.then( transpile );
