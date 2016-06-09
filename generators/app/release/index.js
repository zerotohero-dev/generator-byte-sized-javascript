'use strict';

var _yeomanGenerator = require('yeoman-generator');

var _yeomanGenerator2 = _interopRequireDefault(_yeomanGenerator);

var _chalk = require('chalk');

var _chalk2 = _interopRequireDefault(_chalk);

var _yosay = require('yosay');

var _yosay2 = _interopRequireDefault(_yosay);

var _fs = require('fs');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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

module.exports = _yeomanGenerator2.default.Base.extend({
    prompting: function prompt() {
        var _this = this;

        this.log((0, _yosay2.default)('Welcome to the breathtaking ' + _chalk2.default.red('Byte-Sized JavaScript') + ' project generator!'));

        var prompts = [{
            type: 'input',
            name: 'bannerPath',
            message: 'Can you provide me the path to your banner file?',
            default: this.destinationPath('banner.txt')
        }, {
            type: 'input',
            name: 'srcHeaderPath',
            message: 'Where is your source code header file?',
            default: this.destinationPath('source_header.txt')
        }, {
            type: 'input',
            name: 'readmeExtrasPath',
            message: 'Where is your extra README text file?',
            default: this.destinationPath('readme_extras.txt')
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
        }];

        return this.prompt(prompts).then(function (props) {
            _this.props = props;

            return null;
        });
    },

    writing: function write() {
        var _this2 = this;

        var bannerPathPromise = new Promise(function (resolve, reject) {
            (0, _fs.readFile)(_this2.props.bannerPath, { encoding: 'utf8' }, function (err, data) {
                if (err) {
                    console.log('Warning: cannot read from “' + _this2.props.bannerPath + '”.');

                    resolve({
                        docBanner: '',
                        srcBanner: ' * '
                    });

                    return;
                }

                resolve({
                    docBanner: data,
                    srcBanner: data.replace(/^/gm, ' * ')
                });
            });
        });
        var srcHeaderPathPromise = new Promise(function (resolve, reject) {
            (0, _fs.readFile)(_this2.props.srcHeaderPath, { encoding: 'utf8' }, function (err, data) {
                if (err) {
                    console.log('Warning: cannot read from “' + _this2.props.srcHeaderPath + '”.');

                    resolve({
                        srcHeader: ''
                    });

                    return;
                }

                resolve({
                    srcHeader: data
                });
            });
        });
        var readmeExtrasPromise = new Promise(function (resolve, reject) {
            (0, _fs.readFile)(_this2.props.readmeExtrasPath, { encoding: 'utf8' }, function (err, data) {
                if (err) {
                    console.log('Warning: cannot read from “' + _this2.props.srcHeaderPath + '”.');

                    resolve({
                        readmeExtras: ''
                    });

                    return;
                }

                resolve({
                    readmeExtras: data
                });
            });
        });

        Promise.all([bannerPathPromise, srcHeaderPathPromise, readmeExtrasPromise]).then(function (values) {
            if (!values || !values.length) {
                return;
            }

            _this2.props.docBanner = values[0].docBanner;
            _this2.props.srcBanner = values[0].srcBanner;
            _this2.props.srcHeader = values[1].srcHeader;
            _this2.props.readmeExtras = values[2].readmeExtras;

            ['bin/transpile.js', 'lib/index.js', 'test/index.js', '.babelrc', '.editorconfig', '.eslintrc', '.gitignore', 'CHANGELOG.md', 'CODE_OF_CONDUCT.md', 'index.js', 'LICENSE.md', 'package.json', 'README.md'].map(function (file) {
                return _this2.fs.copyTpl(_this2.templatePath(file), _this2.destinationPath(file), _this2.props);
            });
        });
    },

    install: function deploy() {
        //this.installDependencies();
        this.npmInstall(['eslint', 'eslint-plugin-babel', 'babel-cli', 'babel-eslint', 'babel-preset-es2015', 'babil'], { 'saveDev': true });
    }
});

//# sourceMappingURL=index.js.map