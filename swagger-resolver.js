/**
 * Combine the swagger specification parts into a single YAML file.
 */

var resolve = require('json-refs').resolveRefs;
var YAML = require('js-yaml');
var fs = require('fs');

process.chdir('api-spec');

var root = YAML.load(fs.readFileSync('index.yaml').toString());
var options = {
    filter: ['relative', 'remote'],
    loaderOptions: {
        processContent: function (res, callback) {
            callback(null, YAML.load(res.text));
        }
    }
};

resolve(root, options).then(function (results) {
    console.log(YAML.dump(results.resolved, null, 2));
    //console.log(JSON.stringify(results.resolved, null, 2));
});
