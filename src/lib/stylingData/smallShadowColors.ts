export const smallShadowColors = {
  a1: "bg-watermelon drop-shadow-smOrange",
  a2: "bg-sky drop-shadow-smOrange",
  a3: "bg-magenta drop-shadow-smOrange",
  a4: "bg-lilac drop-shadow-smOrange",
  a5: "bg-orange drop-shadow-smMagenta",
  a6: "bg-lime drop-shadow-smMagenta",

  b1: "bg-jade drop-shadow-smLime",
  b2: "bg-watermelon drop-shadow-smLime",
  b3: "bg-lilac drop-shadow-smLime",
  b4: "bg-magenta drop-shadow-smLime",
  b5: "bg-orange drop-shadow-smLime",
  b6: "bg-peach drop-shadow-smLime",

  c1: "bg-olive drop-shadow-smWatermelon",
  c2: "bg-lime drop-shadow-smWatermelon",
  c3: "bg-orange drop-shadow-smWatermelon",
  c4: "bg-jade drop-shadow-smWatermelon",
  c5: "bg-emerald drop-shadow-smWatermelon",
  c6: "bg-jade drop-shadow-smPeach",

  d1: "bg-emerald drop-shadow-smLilac",
  d2: "bg-olive drop-shadow-smLilac",
  d3: "bg-jade drop-shadow-smLilac",
  d4: "bg-orange drop-shadow-smLilac",
  d5: "bg-lime drop-shadow-smLilac",
  d6: "bg-watermelon drop-shadow-smEmerald",

  e1: "bg-magenta drop-shadow-smApricot",
  e2: "bg-lilac drop-shadow-smApricot",
  e3: "bg-sky drop-shadow-smApricot",
  e4: "bg-olive drop-shadow-smApricot",
  e5: "bg-watermelon drop-shadow-smJade",
  e6: "bg-peach drop-shadow-smJade",

  f1: "bg-orange drop-shadow-smSky",
  f2: "bg-lime drop-shadow-smSky",
  f3: "bg-olive drop-shadow-smSky",
  f4: "bg-watermelon drop-shadow-smOlive",
  f5: "bg-peach drop-shadow-smOlive",
  f6: "bg-magenta drop-shadow-smPeach",
};

export const highContrastSmallShadowColors = {
  a1: "bg-cobalt drop-shadow-smDenim",
  a2: "bg-azure drop-shadow-smViolet",
  a3: "bg-violet drop-shadow-smPine",
  a4: "bg-pine drop-shadow-smAzure",
  a5: "bg-denim drop-shadow-smOlive",
  a6: "bg-juniper drop-shadow-smCobalt",

  b1: "bg-azure drop-shadow-smCobalt",
  b2: "bg-violet drop-shadow-smJuniper",
  b3: "bg-pine drop-shadow-smDenim",
  b4: "bg-denim drop-shadow-smPine",
  b5: "bg-juniper drop-shadow-smAzure",
  b6: "bg-cobalt drop-shadow-smViolet",

  c1: "bg-violet drop-shadow-smAzure",
  c2: "bg-pine drop-shadow-smCobalt",
  c3: "bg-denim drop-shadow-smJuniper",
  c4: "bg-juniper drop-shadow-smViolet",
  c5: "bg-cobalt drop-shadow-smPine",
  c6: "bg-azure drop-shadow-smDenim",

  d1: "bg-pine drop-shadow-smJuniper",
  d2: "bg-denim drop-shadow-smAzure",
  d3: "bg-juniper drop-shadow-smViolet",
  d4: "bg-cobalt drop-shadow-smDenim",
  d5: "bg-azure drop-shadow-smPine",
  d6: "bg-violet drop-shadow-smCobalt",

  e1: "bg-denim drop-shadow-smPine",
  e2: "bg-juniper drop-shadow-smDenim",
  e3: "bg-cobalt drop-shadow-smAzure",
  e4: "bg-azure drop-shadow-smJuniper",
  e5: "bg-violet drop-shadow-smCobalt",
  e6: "bg-pine drop-shadow-smViolet",

  f1: "bg-juniper drop-shadow-smViolet",
  f2: "bg-cobalt drop-shadow-smPine",
  f3: "bg-azure drop-shadow-smCobalt",
  f4: "bg-violet drop-shadow-smDenim",
  f5: "bg-pine drop-shadow-smAzure",
  f6: "bg-denim drop-shadow-smJuniper",
};

export type SmallShadowColorScheme = typeof smallShadowColors;
export type HighContrastSmallShadowColorScheme =
  typeof highContrastSmallShadowColors;

// This defines the type of that array
export type SmallShadowColorOption = keyof typeof smallShadowColors;

// This is a dynamically generated array that includes the list of all of the keys from the colorScheme object
export const smallShadowColorOptions = Object.keys(
  smallShadowColors,
) as SmallShadowColorOption[];
