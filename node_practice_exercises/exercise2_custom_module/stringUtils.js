exports.capitalize = str => str.toUpperCase();

exports.reverse = str => str.split('').reverse().join('');

exports.countVowels = str => (str.match(/[aeiou]/gi) || []).length;
