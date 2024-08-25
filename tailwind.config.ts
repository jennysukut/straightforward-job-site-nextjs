import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        //If you need a reference, there are color names outlined on the Figma design with the Color Palette
        // cream + purple
        cream: "#F8F2EC",
        lilac: "#D6A6DC",
        // teal + green shades
        sky: "#C1D8D3",
        jade: "#50B09F",
        emerald: "#308B7B",
        midnight: "#0C776D",
        lime: "#D5CB2C",
        olive: "#A6A646",
        // pinks + peaches + oranges 
        // {apricot is more orange-hued than the peach shade}
        blush: "#F8DAD0",
        peach: "#FFA08B",
        apricot: "#FDA26B",
        orange: "#F38143",
        watermelon: "#FFABDA",
        magenta: "#E673A9"
      }
    },
    dropShadow: {
      'lilacShadow': '7px 7px 0px #D6A6DC',
      'skyShadow': '7px 7px 0px #C1D8D3',
      'jadeShadow': '7px 7px 0px #50B09F',
      'emeraldShadow': '7px 7px 0px #308B7B',
      'midnightShadow': '7px 7px 0px #0C776D',
      'limeShadow': '7px 7px 0px #D5CB2C',
      'oliveShadow': '7px 7px 0px #A6A646',
      'blushShadow': '7px 7px 0px #F8DAD0',
      'peachShadow': '7px 7px 0px #FFA08B',
      'apricotShadow': '7px 7px 0px #FDA26B',
      'orangeShadow': '7px 7px 0px #F38143',
      'watermelonShadow': '7px 7px 0px #FFABDA',
      'magentaShadow': '7px 7px 0px #E673A9',
    }
  },
  plugins: [],
};
export default config;
