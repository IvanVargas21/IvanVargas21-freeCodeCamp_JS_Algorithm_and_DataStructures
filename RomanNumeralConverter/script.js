document.getElementById('convert-btn').addEventListener('click', () => {
  const input = document.getElementById('number').value;
  const outputEl = document.getElementById('output');
  const num = parseInt(input, 10);

  if (!input || isNaN(num)) {
    outputEl.textContent = 'Please enter a valid number';
    return;
  }
  if (num < 1) {
    outputEl.textContent = 'Please enter a number greater than or equal to 1';
    return;
  }
  if (num >= 4000) {
    outputEl.textContent = 'Please enter a number less than or equal to 3999';
    return;
  }

  outputEl.textContent = integerToRoman(num);
});

function integerToRoman(num) {
  const values = [1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1];
  const symbols = ['M','CM','D','CD','C','XC','L','XL','X','IX','V','IV','I'];
  let roman = '';

  for (let i = 0; i < values.length; i++) {
    while (num >= values[i]) {
      roman += symbols[i];
      num -= values[i];
    }
  }
  return roman;
}
