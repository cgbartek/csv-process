## CSV Process
by Chris Bartek

This is a basic CSV processor backend written in Node.js.

Reads the content of a CSV file and separate entries by company in its own file. Additionally, sorts the contents of each file by last and first name (ascending).  Lastly, if there are duplicate ids for the same entry, then only the record with the highest version is included.

The input is data.csv. The script will load this file, normalize it, sort it, categorize by company, and save the object to output.json.
