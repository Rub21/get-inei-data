var fs = require('fs');
var turf = require('@turf/turf');
var cover = require('@mapbox/tile-cover');
var wkt = require('terraformer-wkt-parser');
module.exports = function(file, folder, zoom) {
	var bound = JSON.parse(fs.readFileSync(file, 'utf8'));
	var limits = {
		min_zoom: 11,
		max_zoom: 11
	};
	var polys = cover.geojson(bound.features[0].geometry, limits);

	var bounds = []
	for (var i = 0; i < polys.features.length; i++) {
		// console.log(JSON.stringify(polys.features[i]));
		bounds.push(wkt.convert(polys.features[i].geometry).toString());
	}
	fs.writeFile('bounds.geojson', JSON.stringify(polys), function(err) {
		if (err) {
			return console.log(err);
		}
	});
	console.log('var bounds =' + JSON.stringify(bounds))
};