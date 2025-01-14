import { idealButtonPattern } from "@/lib/stylingData/idealButtonPattern";

export default function ShuffleIdealButtonPattern(setFunction: Function) {
  // Generate a random starting index for primary colors
  const randomPrimaryStartIndex = Math.floor(
    Math.random() * idealButtonPattern.length,
  );
  const ShuffledColorArray = [];

  // Loop through the colorArray starting from the random primary index
  for (let i = 0; i < 23; i++) {
    ShuffledColorArray.push(
      idealButtonPattern[
        (randomPrimaryStartIndex + i) % idealButtonPattern.length
      ],
    );
  }
  setFunction(ShuffledColorArray);
}
