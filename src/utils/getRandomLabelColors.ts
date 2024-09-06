import { labelColorOptions, LabelColorOptions } from "@/lib/colorStyles";

function getRandomLabelColors(): LabelColorOptions {
  // Get the total number of color schemes
  const totalSchemes = labelColorOptions.length;

  // Generate a random index, excluding the current scheme
 const randomIndex = Math.floor(Math.random() * totalSchemes);

  // Return the new random color scheme
  console.log(labelColorOptions[randomIndex]);
  return labelColorOptions[randomIndex];
}

export default getRandomLabelColors;