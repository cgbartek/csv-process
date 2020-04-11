// Assignment 6: Write a program that will read the content of the CSV file and
// separate enrollees by insurance company in its own file. Additionally, sort
// the contents of each file by last and first name (ascending).  Lastly, if
// there are duplicate User Ids for the same Insurance Company, then only the
// record with the highest version should be included.

// I don't know if you were expecting this in Java, but I decided to do this in
// Node.js. If that's not okay I can write a Java version!

// The input is data.csv. The script will load this file, normalize it, sort it,
// categorize by insurance company, and save the object to output.json.

/**
 * CSV Processor
 * by Chris Bartek
 * Input: data.csv
 * Output: output.json
 */

const fs = require('fs');
const csv = require('csv-parser');
const in_path = 'data.csv';
const out_path = 'output.json';
let in_file = [];

// Import CSV file
fs.createReadStream(in_path)
  .pipe(csv(['id', 'first', 'last', 'version', 'company']))
  .on('data', (row) => {
    in_file.push(row);
  })
  .on('end', () => {
    console.log('CSV processed.');
    deDupe(in_file);
    postProcess(in_file);
  });


// Create a list of companies and roll the data into each
function postProcess(in_file) {
  let companies = in_file.map((entry) => entry.company);
  companies = [...new Set(companies)];
  companies = companies.sort();

  let out_file = {};
  companies.forEach(function(v,i) {
    out_file[v] = [];
  });

  sortBy(in_file,'last');
  console.log(in_file);

  in_file.forEach(function(v,i) {
    companies.forEach(function(company,index) {
      if(v.company === company) {
        delete(v.company);
        out_file[company].push(v);
      }
    });
  });

  fs.writeFile(out_path, JSON.stringify(out_file), 'utf8', function (err) {
    if (err) {
        console.log("Error occured while writing JSON file.");
        return console.log(err);
    } else {
      console.log("JSON file saved.");
    }


});
}


// Sort array by object key
function sortBy(arr, k) {
  return arr.sort(function(a, b) {
    const x = a[k];
    const y = b[k];
    return ((x < y) ? -1 : ((x > y) ? 1 : 0));
  });
}


// Sort entries by id and version, then de-dupe
function deDupe(entries) {
  prevId = null;
  prevVer = null;
  toRemove = [];
  entries.sort(function (k1, k2) {
  	// Primary sort
  	if (k1.id > k2.id) return 1;
  	if (k1.id < k2.id) return -1;
  	// Secondary sort (asc)
  	if (parseInt(k1.version) < parseInt(k2.version)) return 1;
  	if (parseInt(k1.version) > parseInt(k2.version)) return -1;
  });

  entries.forEach(function(v,i) {
    if(v.id === prevId) {
      toRemove.push(i);
    }
    prevId = v.id;
  });
  entries = removeFrom(toRemove,entries);
}


// Removes a list of indexes from array
function removeFrom(list,arr) {
  let i;
  for (i = list.length-1; i >= 0; i--) {
    arr.splice(list[i],1);
  }
  return arr;
}
