import { url } from "inspector";
import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    fontFamily: {
      sans: ["satoshi", "sans-serif"],
    },
    extend: {
      colors: {
        // STANDARD SFJS COLOR PALETTE
        //If you need a reference, there are color names outlined on the Figma design with the Color Palette
        // cream + purple
        eggshell: "#FFF9F3",
        cream: "#F8F2EC",
        lilac: "#D6A6DC",
        // teal + green shades
        sky: "#C1D8D3",
        jade: "#50B09F",
        darkJade: "#46A392",
        emerald: "#308B7B",
        midnight: "#0C776D",
        lime: "#D5CB2C",
        olive: "#A6A646",
        // pinks + peaches + oranges
        // {apricot is more orange-hued than the peach shade}
        blush: "#F8DAD0",
        peach: "#FFA08B",
        apricot: "#FDA26B",
        darkApricot: "#F0935A",
        orange: "#F38143",
        watermelon: "#FFABDA",
        magenta: "#E673A9",

        // HIGH CONTRAST SFJS COLOR PALETTE
        cobalt: "#1B16A6",
        juniper: "#0D4036",
        denim: "#230B5C",
        azure: "#1E16ED",
        violet: "#A204B6",

        // SEASONAL COLOR SCHEME

        berry: "#D9486A",
        pumpkin: "#CF5129",
        wine: "#B23451",
        spice: "#EC5135",
        toast: "#D17410",
        mauve: "#F46E52",
        almond: "#E1D4C8",
        cocoa: "#854407",
        cinnamon: "#B56032",
      },
      letterSpacing: {
        superwide: "0.15em",
      },
    },
    dropShadow: {
      // larger drop shadows
      lilac: "10px 10px 0px #D6A6DC",
      sky: "10px 10px 0px #C1D8D3",
      jade: "10px 10px 0px #50B09F",
      emerald: "10px 10px 0px #308B7B",
      midnight: "10px 10px 0px #0C776D",
      lime: "10px 10px 0px #D5CB2C",
      olive: "10px 10px 0px #A6A646",
      blush: "10px 10px 0px #F8DAD0",
      peach: "10px 10px 0px #FFA08B",
      apricot: "10px 10px 0px #FDA26B",
      orange: "10px 10px 0px #F38143",
      watermelon: "10px 10px 0px #FFABDA",
      magenta: "10px 10px 0px #E673A9",

      // Other Drop Shadow Colors
      cobalt: "10px 10px 0px #1B16A6",
      juniper: "10px 10px 0px #0D4036",
      denim: "10px 10px 0px #230B5C",
      azure: "10px 10px 0px #1E16ED",
      violet: "10px 10px 0px #A204B6",

      // Seasonal Drop Shadow Colors
      almond: "10px 10px 0px #E1D4C8",
      cocoa: "10px 10px 0px #854407",

      // small drop shadows
      smLilac: "3px 3px 0px #D6A6DC",
      smSky: "3px 3px 0px #C1D8D3",
      smJade: "3px 3px 0px #50B09F",
      smEmerald: "3px 3px 0px #308B7B",
      smMidnight: "3px 3px 0px #0C776D",
      smLime: "3px 3px 0px #D5CB2C",
      smOlive: "3px 3px 0px #A6A646",
      smBlush: "3px 3px 0px #F8DAD0",
      smPeach: "3px 3px 0px #FFA08B",
      smApricot: "3px 3px 0px #FDA26B",
      smOrange: "3px 3px 0px #F38143",
      smWatermelon: "3px 3px 0px #FFABDA",
      smMagenta: "3px 3px 0px #E673A9",

      //Other Small Drop Shadow Colors
      smCobalt: "3px 3px 0px #1B16A6",
      smDenim: "3px 3px 0px #0A04C6",
      smAzure: "3px 3px 0px #1E16ED",
      smLapis: "3px 3px 0px #1869FF",
      smOcean: "3px 3px 0px #4B89FC",
      smMist: "3px 3px 0px #94B9FF",

      // Small Seasonal Drop Shadow Colors
      smAlmond: "4px 4px 0px #D9C7B6",
    },
  },
  plugins: [],
};
export default config;
