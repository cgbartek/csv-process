## CSV Process
by Chris Bartek

This is a basic CSV processor backend written in Node.js.

Assignment 6: Write a program that will read the content of the CSV file and separate enrollees by insurance company in its own file. Additionally, sort the contents of each file by last and first name (ascending).  Lastly, if there are duplicate User Ids for the same Insurance Company, then only the record with the highest version should be included.

I don't know if you were expecting this in Java, but I decided to do this in Node.js. If that's not okay I can write a Java version!

The input is data.csv. The script will load this file, normalize it, sort it, categorize by insurance company, and save the object to output.json.
