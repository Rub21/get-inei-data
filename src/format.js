const fs = require('fs');
const csv = require('csvtojson')
module.exports = function(csvFilePath) {
	csv()
		.fromFile(csvFilePath)
		.then((objs) => {
			for (var i = 0; i < objs.length; i++) {
				const ubigeo = objs[i].DISTRITO.split(/(\s+)/)[0];
				const codigo = objs[i]['CENTRO POBLADO'].split(/(\s+)/)[0];
				const url = `http://sige.inei.gob.pe/test/atlas/index.php/area_influencia/info_bubble_zsc?ubigeo=${ubigeo}&ccpp=${codigo}`;
				console.log(url);
			}
		});
}