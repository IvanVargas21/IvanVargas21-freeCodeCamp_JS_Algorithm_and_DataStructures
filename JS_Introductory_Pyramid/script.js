/*
*   Retrieve Array Element and Array Index, this case we are retrieving the array element.

    let cities = ["London", "New York", "Mumbai"];
    console.log(cities);
    cities[cities.length - 1] = "Mexico City";
    console.log(cities);


*   array .push() and .pop() methods both targets the last element on an array.
    .push() - adds an element on the last, returns array.length.
    .pop() - removes an element on the last, returns the value removed

*   for loop
    for("iterator"; "condition"; "iteration") {
    logic;
    }
*/
const character = "#";
const count = 8;
const rows = [];
let inverted = false;

//return the number of character based on current rowNumber
function padRow(rowNumber, rowCount) {
  return  " ".repeat(rowCount - rowNumber)+ character.repeat(2 * rowNumber - 1) + " ".repeat(rowCount - rowNumber);
}

//push the returned character/ characters, on rows[] array
for (let i = 1; i <= count; i++) {
  if (inverted) {
    rows.unshift(padRow(i, count));
  //pushes the characters given by padRow(), to row[]
  } else {
  rows.push(padRow(i, count));
  }
}
console.log(rows);
let result = "";
//iterates on rows[] one by one, assign the value on row variable
//each iterations, the new row will be inserted on next line of the existing rows.
for (const row of rows) {
  //will add new line, then inserts the value of row variavble.
  result = result+"\n" + row;
}

console.log(result);