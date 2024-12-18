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

export type SmallShadowColorScheme = typeof smallShadowColors;

// This defines the type of that array
export type SmallShadowColorOption = keyof typeof smallShadowColors;

// This is a dynamically generated array that includes the list of all of the keys from the colorScheme object
export const smallShadowColorOptions = Object.keys(
  smallShadowColors,
) as SmallShadowColorOption[];
