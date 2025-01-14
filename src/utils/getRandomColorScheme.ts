import {
  ButtonColorOption,
  buttonColorOptions,
} from "@/lib/stylingData/buttonColors";
import {
  SmallShadowColorOption,
  smallShadowColorOptions,
} from "@/lib/stylingData/smallShadowColors";
import { idealButtonPattern } from "@/lib/stylingData/idealButtonPattern";

type CurrentSchemeType = ButtonColorOption | SmallShadowColorOption;

function getRandomColorScheme(
  currentScheme: CurrentSchemeType,
): CurrentSchemeType {
  // Determine which color options to use based on the type of currentScheme
  const colorOptions =
    currentScheme in buttonColorOptions
      ? buttonColorOptions
      : smallShadowColorOptions;

  // Get the total number of color schemes
  const totalSchemes = colorOptions.length;

  // Generate a random index, excluding the current scheme
  let randomIndex: number;
  do {
    randomIndex = Math.floor(Math.random() * totalSchemes);
  } while (colorOptions[randomIndex] === currentScheme);

  // Return the new random color scheme
  return colorOptions[randomIndex];
}

// Updated function to create a random array of color options
function getRandomColorArray(size: number): CurrentSchemeType[] {
  const randomColors: CurrentSchemeType[] = [];
  let lastIndex: number | null = null; // Store the last index

  for (let i = 0; i < size; i++) {
    let randomIndex: number;
    do {
      randomIndex = Math.floor(Math.random() * buttonColorOptions.length);
    } while (randomIndex === lastIndex); // Ensure it doesn't match the last index

    randomColors.push(buttonColorOptions[randomIndex]);
    lastIndex = randomIndex; // Update the last index
  }

  return randomColors;
}

function shuffleButtonColors(size: number): CurrentSchemeType[] {
  // Shuffle the buttonColorOptions array
  const shuffledOptions = buttonColorOptions.sort(() => Math.random() - 0.5);

  // Return the first 'size' elements from the shuffled array
  return shuffledOptions.slice(0, size);
}

export { getRandomColorScheme, getRandomColorArray, shuffleButtonColors };
