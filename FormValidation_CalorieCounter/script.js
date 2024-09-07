//Form
const calorieCounter = document.getElementById('calorie-counter');
//Form elements
const budgetNumberInput = document.getElementById('budget');
const entryDropdown = document.getElementById('entry-dropdown');
const addEntryButton = document.getElementById('add-entry');
const clearButton = document.getElementById('clear');
const output = document.getElementById('output');
//will be updated, if the user provides and invalid input
let isError = false;

//to convert any input to numerical values
function cleanInputString(str){
    //regex, character class [], \s means single space. to match each of these characters individually.
    const regex = /[+-\s]/g;
}
console.log(document)