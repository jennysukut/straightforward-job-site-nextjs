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

export type LargeShadowColorScheme = typeof largeShadowColors;

export type LargeShadowColorOption = keyof typeof largeShadowColors;

export const largeShadowColorOptions = Object.keys(
  largeShadowColors,
) as LargeShadowColorOption[];
