/*
 * Copyright 2015 Telefónica I+D
 * All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may
 * not use this file except in compliance with the License. You may obtain
 * a copy of the License at
 *
 *         http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions and limitations
 * under the License.
 */
'use strict';


var assert = require('assert'),
    path = require('path'),
    config = require('../../lib/config');


/* jshint multistr: true */
suite('config', function () {


    test('should_return_valid_config', function () {
        //Given
        var filename = path.join(__dirname, 'test_aiakos.yml');

        //When

        var result = config.readConfigFile(filename);

        //Then
        assert.deepEqual(['INFO', 'Read configuration file'], result);
        assert.notEqual(config.data.openstack, undefined);
        assert.equal(config.data.default, false);
        assert.equal(config.data.logLevel, 'INFO');

    });


    test('should_fail_with_invalid_path', function () {
        //Given
        var invalidFilename = path.join(__dirname, 'kk.yml');

        //When
        var result = config.readConfigFile(invalidFilename);


        //Then
        assert.deepEqual(['WARN',
            'Configuration file: ENOENT: no such file or directory, open \'' + invalidFilename + '\''], result);

    });


    test('should_fail_with_invalid_section', function () {
        //Given
        var invalidFilename = path.join(__dirname, 'test_aiakos_invalid.yml');

        //When
        var result = config.readConfigFile(invalidFilename);


        //Then
        assert.deepEqual(['WARN', 'Configuration file: no \"regions\" node found'], result);

    });

});
