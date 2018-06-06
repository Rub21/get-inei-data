 # Get INEI - centro poblado full data

 From: http://atlas.inei.gob.pe/inei/

 ![image](https://user-images.githubusercontent.com/1152236/41057405-ac512f20-698c-11e8-960d-511dffcb75ac.png)



###  install


```
git clone https://github.com/Rub21/get-inei-data.git
cd get-inei-data
npm link

```

### Convert the region bounduary to wellknown formats


```
inei grid --file=data/ayac-boundary.geojson > grid-bounds.json

```

copy and paste the ouput in `grid-bounds.json` in the console.


### Set the headers

```
var outputdata = 'ubigeo,departamento,provincia,distrito,a1,ccpp,nombre,a2,a3,longitud,latitud,a4\n';
bounds.length
```

### Get the data


```js

for (var i = 0; i < bounds.length; i++) {
	console.log('Run--> ' + (i + 1))
	$.ajax({
		type: "POST",
		url: path + '/centrosPobladosPolygon',
		dataType: "json",
		data: {
			text: bounds[i]
		},
		cache: false,
		success: function(data, status, xhr) {
			console.log(status)
			var points = JSON.parse(data.mensaje);
			if (points.results) {
				for (var d = 0; d < points.results.length; d++) {
					outputdata += points.results[d].values.join(',') + '\n';
				}
			} else {

			}
		},
		error: function(jqXHR, textStatus, errorThrown) {
			console.log('Error -->' + textStatus);
		}
	})
}

```

### Download the data

```
$('.navbar-brand').attr('id', 'a');
var a = document.getElementById("a");
var file = new Blob([outputdata], {
	type: 'text/plain'
});
a.href = URL.createObjectURL(file);
a.download = 'res.csv';
a.click();

```


The file is a csv file, save it as `ayacucho.csv`


### Get Geojson all daa for each point

```
./script.sh data/ayacucho.csv

```
This process may take  some time, the output file will be `output.csv`


![image](https://user-images.githubusercontent.com/1152236/41062042-278f5b50-699a-11e8-8148-d2b0c788c536.png)
