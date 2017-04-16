'use strict';

/*         .°
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
 * You can watch “Byte-Sized JavaScript” at: https://bytesized.tv/
 *
 * MIT Licensed — See LICENSE.md
 *
 * Send your comments, suggestions, and feedback to me@volkan.io
 */

var path = require('path');
var assert = require('yeoman-assert');
var helpers = require('yeoman-test');

describe('generator-byte-sized-javascript:app', function () {
  before(function () {
    return helpers.run(path.join(__dirname, '../generators/app'))
      .withPrompts({someAnswer: true})
      .toPromise();
  });

  it('works', function () {
    assert(true);
  });
});
