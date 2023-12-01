const input = require("./input");

console.log(input);

const digits = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

const resA = input.reduce((acc, cur) => {
  const arr = cur.split("");
  const firstDigit = arr.find((c) => digits.includes(c));
  const lastDigit = arr.findLast((c) => digits.includes(c));

  const digit = Number(`${firstDigit}${lastDigit}`);

  console.log(cur, firstDigit, lastDigit, digit);

  return acc + digit;
}, 0);

const wordDigits = [
  "zero",
  "one",
  "two",
  "three",
  "four",
  "five",
  "six",
  "seven",
  "eight",
  "nine",
];

const wordsAndDigits = [...digits, ...wordDigits];

const resB = input.reduce((acc, cur) => {
  const res = wordsAndDigits.map((w) => [
    w,
    cur.indexOf(w),
    cur.lastIndexOf(w),
  ]);

  const firstDigit = res
    .filter((r) => r[1] !== -1)
    .sort((a, b) => a[1] - b[1])[0];
  const lastDigit = res
    .filter((r) => r[2] !== -1)
    .sort((a, b) => b[2] - a[2])[0];

  const parsedFirstDigit = wordsAndDigits.indexOf(firstDigit[0]) % 10;
  const parsedLastDigit = wordsAndDigits.indexOf(lastDigit[0]) % 10;
  console.log(cur, firstDigit, lastDigit, parsedFirstDigit, parsedLastDigit);

  return acc + Number(`${parsedFirstDigit}${parsedLastDigit}`);
}, 0);

console.log(resA);
console.log(resB);
