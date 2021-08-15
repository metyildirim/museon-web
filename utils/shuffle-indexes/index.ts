export default function shuffle(arr: Array<any>) {
  const indexes = Array(arr.length)
    .fill(0)
    .map((v, i) => i);
  const shuffledIndexes = [];
  for (let i = 0; i < arr.length; i++) {
    const random = Math.floor(Math.random() * indexes.length);
    const index = indexes.splice(random, 1)[0];
    console.log(indexes, index);
    shuffledIndexes.push(index);
  }

  console.log(shuffledIndexes);
}
