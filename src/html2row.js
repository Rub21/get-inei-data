var cheerio = require('cheerio');
var fs = require('fs');
var request = require('request');

module.exports = function(url) {
    request(url, function(error, response, html) {
        if (!error && response.statusCode == 200) {
            var $ = cheerio.load(html);
           createCsv(createMatrix($)) 
        }
    });
};

function createCsv(data) {
    var csvHeader = [];
    var csvBody = [];
    for (var i = 0; i < data.length; i++) {
        csvHeader.push(slugify(data[i][0]));
        csvBody.push(data[i][1]);
    }
    // console.log(csvHeader.join(','));
    console.log(csvBody.join(','))
}

var createMatrix = function($) {
    var matrix = [],
        i = 0;
    $("table tr").each(function() {
        var j = 0;
        matrix[i] = [];

        $(this).find('th').each(function() {
            matrix[i][j] = $(this).text().trim().replace(/(\r\n|\n|\r)/gm, "");
            j++;
            return matrix;
        });
        $(this).find('td').each(function() {
            if ($(this).text().trim().match(/[\r\n\t\\",]/)) {
                matrix[i][j] = '"' + $(this).text().trim().replace(/"/g, '""') + '"';
            } else {
                matrix[i][j] = $(this).text().trim();
            }
            j++;
            return matrix;
        });
        i++;
    });
    return matrix;
};

function slugify(str) {
    return str
        .toString()
        .toLowerCase()
        .replace(/\s+/g, '_')
        .replace(/[^\w\-]+/g, '')
        .replace(/\-\-+/g, '_')
        .replace(/^-+/, '')
        .replace(/-+$/, '');
}