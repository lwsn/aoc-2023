const fs = require("fs");

const input = fs.readFileSync("./input").toString("utf8").split("\n");
input.pop();

const colors = ["red", "green", "blue"];

const rules = {
  red: 12,
  green: 13,
  blue: 14,
};

const prepA = input.map((s, i) => {
  let [, cubes] = s.split(": ");

  cubes = cubes.split("; ").map((s) =>
    s.split(", ").reduce(
      (acc, cur) => ({
        ...acc,
        [cur.split(" ")[1]]: Number(cur.split(" ")[0]),
      }),
      {}
    )
  );

  if (cubes.some((cube) => colors.some((c) => rules[c] < cube[c] ?? 0)))
    return null;

  return i + 1;
});

const resA = prepA.filter(Boolean).reduce((acc, cur) => acc + cur, 0);

const prepB = input.map((s) => {
  let [, rounds] = s.split(": ");

  rounds = rounds.split("; ").map((s) =>
    s.split(", ").reduce(
      (acc, cur) => ({
        ...acc,
        [cur.split(" ")[1]]: Number(cur.split(" ")[0]),
      }),
      {}
    )
  );

  const maxCubes = rounds.reduce(
    (acc, round) => ({
      red: acc.red > (round.red ?? 0) ? acc.red : round.red,
      green: acc.green > (round.green ?? 0) ? acc.green : round.green,
      blue: acc.blue > (round.blue ?? 0) ? acc.blue : round.blue,
    }),
    {
      red: 0,
      green: 0,
      blue: 0,
    }
  );

  return Object.values(maxCubes).reduce((acc, cur) => acc * cur, 1);
});

const resB = prepB.reduce((acc, cur) => acc + cur, 0);

console.log(resA, resB);
