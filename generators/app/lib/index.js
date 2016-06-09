/*
 *         .°
 *        |
 *     .-----.
 *     | | | |       Byte-Sized JavaScript
 *     \  °  /          Module Generator
 *   ___-___-___   https://bit.ly/bytesized
 *  ()_   .   _()
 *  /  /\ : /\  \
 * (___)| . |(___)
 *
 * This project is a part of the “Byte-Sized JavaScript” videocast.
 *
 * You can watch “Byte-Sized JavaScript” at: https://bit.ly/bytesized
 *
 * MIT Licensed — See LICENSE.md
 *
 * Send your comments, suggestions, and feedback to me@volkan.io
 */

import yeoman from 'yeoman-generator';
import chalk from 'chalk';
import yosay from 'yosay';
import { readFile } from 'fs';

module.exports = yeoman.Base.extend( {
    prompting: function prompt() {
        this.log( yosay(
            `Welcome to the breathtaking ${chalk.red( 'Byte-Sized JavaScript' )} project generator!`
        ) );

        const prompts = [ {
            type: 'input',
            name: 'bannerPath',
            message: 'Can you provide me the path to your banner file?',
            default: this.destinationPath( 'banner.txt' )
        }, {
            type: 'input',
            name: 'srcHeaderPath',
            message: 'Where is your source code header file?',
            default: this.destinationPath( 'source_header.txt' )
        }, {
            type: 'input',
            name: 'readmeExtrasPath',
            message: 'Where is your extra README text file?',
            default: this.destinationPath( 'readme_extras.txt' )
        }, {
            type: 'input',
            name: 'appName',
            message: 'What is the name of your project? (for NPM)',
            default: 'UnicornLaunchingCatapult'
        }, {
            type: 'input',
            name: 'appDescription',
            message: 'Can you describe your project a little?',
            default: 'Throws unicorns using a catapult.'
        }, {
            type: 'input',
            name: 'userName',
            message: 'What is your name?',
            default: 'Anakin Skywalker'
        }, {
            type: 'input',
            name: 'userEmail',
            message: 'What is your email?',
            default: 'vader@galaxy.empire'
        }, {
            type: 'input',
            name: 'userWebsite',
            message: 'Can you give me your personal website URL?',
            default: 'https://vader.darth'
        }, {
            type: 'input',
            name: 'projectWebsite',
            message: 'Can you give me a URL for the project’s website?',
            default: 'https://bit.ly/bytesized'
        } ];

        return this.prompt( prompts ).then( ( props ) => {
            this.props = props;

            return null;
        } );
    },

    writing: function write() {
        const bannerPathPromise = new Promise( ( resolve, reject ) => {
            readFile( this.props.bannerPath, { encoding: 'utf8' }, ( err, data ) => {
                if ( err ) {
                    console.log( `Warning: cannot read from “${this.props.bannerPath}”.` );
                    
                    resolve( {
                        docBanner: '',
                        srcBanner: ' * '
                    } );
 
                    return;
                }

                resolve( {
                    docBanner: data,
                    srcBanner: data.replace( /^/gm, ' * ' )
                } );
            } );
        } );
        const srcHeaderPathPromise = new Promise( ( resolve, reject ) => {
            readFile( this.props.srcHeaderPath, { encoding: 'utf8' }, ( err, data ) => {
                if ( err ) {
                    console.log( `Warning: cannot read from “${this.props.srcHeaderPath}”.` );
                    
                    resolve( {
                        srcHeader: ''
                    } );

                    return;
                }

                resolve( {
                    srcHeader: data
                } );
            } );
        } );
        const readmeExtrasPromise = new Promise( ( resolve, reject ) => {
            readFile( this.props.readmeExtrasPath, { encoding: 'utf8' }, ( err, data ) => {
                if ( err ) {
                    console.log( `Warning: cannot read from “${this.props.srcHeaderPath}”.` );
                    
                    resolve( {
                        readmeExtras: ''
                    } );

                    return;
                }

                resolve( {
                    readmeExtras: data
                } );
            } );
        } );

        Promise.all( [ bannerPathPromise, srcHeaderPathPromise, readmeExtrasPromise ] )
            .then( ( values ) => {
                if ( !values || !values.length ) { return; }

                this.props.docBanner = values[ 0 ].docBanner;
                this.props.srcBanner = values[ 0 ].srcBanner;
                this.props.srcHeader = values[ 1 ].srcHeader;
                this.props.readmeExtras = values[ 2 ].readmeExtras;

                [
                    'bin/transpile.js',
                    'lib/index.js',
                    'test/index.js',
                    '.babelrc',
                    '.editorconfig',
                    '.eslintrc',
                    '.gitignore',
                    'CHANGELOG.md',
                    'CODE_OF_CONDUCT.md',
                    'index.js',
                    'LICENSE.md',
                    'package.json',
                    'README.md'
                ].map( ( file ) => this.fs.copyTpl(
                    this.templatePath( file ),
                    this.destinationPath( file ),
                    this.props
                ) );
            } );
    },

    install: function deploy() {
        //this.installDependencies();
        this.npmInstall( [
            'eslint',
            'eslint-plugin-babel',
            'babel-cli',
            'babel-eslint',
            'babel-preset-es2015',
            'babil'
        ], { 'saveDev': true } );
    }
} );
