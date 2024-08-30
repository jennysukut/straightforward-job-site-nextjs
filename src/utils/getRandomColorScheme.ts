import { ColorSchemeOption, colorSchemeOptions } from "@/lib/buttonColors";

function getRandomColorScheme(
  currentScheme: ColorSchemeOption,
): ColorSchemeOption {
  // Get the total number of color schemes
  const totalSchemes = colorSchemeOptions.length;

  // Generate a random index, excluding the current scheme
  let randomIndex: number;
  do {
    randomIndex = Math.floor(Math.random() * totalSchemes);
  } while (colorSchemeOptions[randomIndex] === currentScheme);

  // Return the new random color scheme
  return colorSchemeOptions[randomIndex];
}

export default getRandomColorScheme;
