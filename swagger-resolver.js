/**
 * Combine the swagger specification parts into a single YAML (default) or JSON file.
 */

var resolve = require('json-refs').resolveRefs;
var YAML = require('js-yaml');
var fs = require('fs');

var isJson = process.argv.length > 2 && process.argv[2].toLowerCase() === 'json';

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
	if (!isJson) {
    	console.log(YAML.dump(results.resolved, null, 2));
	} else {
		console.log(JSON.stringify(results.resolved, null, 2));
	}
});
