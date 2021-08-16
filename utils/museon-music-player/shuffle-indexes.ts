function randomize(arr: Array<number>, length: number) {
  const randomizedIndexes = [];
  for (let i = 0; i < length; i++) {
    const random = Math.floor(Math.random() * arr.length);
    const index = arr.splice(random, 1)[0];
    randomizedIndexes.push(index);
  }
  return randomizedIndexes;
}

export default function shuffleIndexes(arr: Array<any>) {
  const indexes = Array(arr.length)
    .fill(0)
    .map((_v, i) => i);
  return randomize(indexes, arr.length);
}
