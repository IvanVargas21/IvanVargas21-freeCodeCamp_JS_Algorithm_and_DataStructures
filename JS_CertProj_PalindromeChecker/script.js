const inputField = document.getElementById('text-input')
const resultField = document.getElementById('result');

// Clean the input (lowercase + remove non-alphanumeric chars)
// Compare the string to its reverse
// split('') - splits a string to an array of substrings
// 
function handleCheckBtnEvents(str){
  const cleanedStr = str.toLowerCase().replace(/[^a-z0-9]/g, '');
  const reversedStr = cleanedStr.split('').reverse().join('');

  if(!inputField.value){
    alert("Please input a value")
  }
  if(cleanedStr === reversedStr){
    resultField.textContent = `${inputField.value} is a palindrome`;
  }else{
    resultField.textContent = `${inputField.value} is not a palindrome`;
  }
}