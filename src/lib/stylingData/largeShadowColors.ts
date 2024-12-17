export const largeShadowColors = {
  a1: "bg-watermelon drop-shadow-orange",
  a2: "bg-sky drop-shadow-orange",
  a3: "bg-magenta drop-shadow-orange",
  a4: "bg-lilac drop-shadow-orange",
  a5: "bg-orange drop-shadow-magenta",
  a6: "bg-lime drop-shadow-magenta",

  b1: "bg-jade drop-shadow-lime",
  b2: "bg-watermelon drop-shadow-lime",
  b3: "bg-lilac drop-shadow-lime",
  b4: "bg-magenta drop-shadow-lime",
  b5: "bg-orange drop-shadow-lime",
  b6: "bg-peach drop-shadow-lime",

  c1: "bg-olive drop-shadow-watermelon",
  c2: "bg-lime drop-shadow-watermelon",
  c3: "bg-orange drop-shadow-watermelon",
  c4: "bg-jade drop-shadow-watermelon",
  c5: "bg-emerald drop-shadow-watermelon",
  c6: "bg-jade drop-shadow-peach",

  d1: "bg-emerald drop-shadow-lilac",
  d2: "bg-olive drop-shadow-lilac",
  d3: "bg-jade drop-shadow-lilac",
  d4: "bg-orange drop-shadow-lilac",
  d5: "bg-lime drop-shadow-lilac",
  d6: "bg-watermelon drop-shadow-emerald",

  e1: "bg-magenta drop-shadow-apricot",
  e2: "bg-lilac drop-shadow-apricot",
  e3: "bg-sky drop-shadow-apricot",
  e4: "bg-olive drop-shadow-apricot",
  e5: "bg-watermelon drop-shadow-jade",
  e6: "bg-peach drop-shadow-jade",

  f1: "bg-orange drop-shadow-sky",
  f2: "bg-lime drop-shadow-sky",
  f3: "bg-olive drop-shadow-sky",
  f4: "bg-watermelon drop-shadow-olive",
  f5: "bg-peach drop-shadow-olive",
  f6: "bg-magenta drop-shadow-peach",
};

export const seasonalLargeShadowColors = {
  a1: "bg-berry drop-shadow-orange",
  a2: "bg-ice drop-shadow-orange",
  a3: "bg-wine drop-shadow-orange",
  a4: "bg-plum drop-shadow-orange",
  a5: "bg-pumpkin drop-shadow-wine",
  a6: "bg-moss drop-shadow-wine",

  b1: "bg-holly drop-shadow-moss",
  b2: "bg-berry drop-shadow-moss",
  b3: "bg-plum drop-shadow-moss",
  b4: "bg-wine drop-shadow-moss",
  b5: "bg-pumpkin drop-shadow-moss",
  b6: "bg-apple drop-shadow-moss",

  c1: "bg-sage drop-shadow-berry",
  c2: "bg-moss drop-shadow-berry",
  c3: "bg-pumpkin drop-shadow-berry",
  c4: "bg-holly drop-shadow-berry",
  c5: "bg-forest drop-shadow-berry",
  c6: "bg-holly drop-shadow-apple",

  d1: "bg-forest drop-shadow-plum",
  d2: "bg-sage drop-shadow-plum",
  d3: "bg-holly drop-shadow-plum",
  d4: "bg-pumpkin drop-shadow-plum",
  d5: "bg-moss drop-shadow-plum",
  d6: "bg-berry drop-shadow-forest",

  e1: "bg-wine drop-shadow-apricot",
  e2: "bg-plum drop-shadow-apricot",
  e3: "bg-ice drop-shadow-apricot",
  e4: "bg-sage drop-shadow-apricot",
  e5: "bg-berry drop-shadow-holly",
  e6: "bg-apple drop-shadow-holly",

  f1: "bg-pumpkin drop-shadow-ice",
  f2: "bg-moss drop-shadow-ice",
  f3: "bg-sage drop-shadow-ice",
  f4: "bg-berry drop-shadow-moss",
  f5: "bg-apple drop-shadow-moss",
  f6: "bg-wine drop-shadow-apple",
};

export type LargeShadowColorScheme = typeof largeShadowColors;

export type LargeShadowColorOption = keyof typeof largeShadowColors;

export const largeShadowColorOptions = Object.keys(
  largeShadowColors,
) as LargeShadowColorOption[];
