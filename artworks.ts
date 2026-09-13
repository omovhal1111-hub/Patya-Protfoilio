import coast from "../assets/art/coast.jpg";
import busstop from "../assets/art/busstop.jpg";
import hollow from "../assets/art/hollow.jpg";
import sanji from "../assets/art/sanji.jpg";
import grave from "../assets/art/grave.jpg";
import wanted from "../assets/art/wanted.jpg";
import portrait from "../assets/art/portrait.jpg";

export type Category =
  | "Illustration"
  | "Character Art"
  | "Environment Art"
  | "Digital Painting"
  | "Visual Storytelling";

export const CATEGORIES: Category[] = [
  "Illustration",
  "Character Art",
  "Environment Art",
  "Digital Painting",
  "Visual Storytelling",
];

export interface Artwork {
  id: string;
  title: string;
  categories: Category[];
  fanArt?: boolean;
  src: string;
  alt: string;
  description: string;
  /** CSS aspect-ratio value that preserves the piece's real proportions */
  ratio: string;
  /** warm accent tone used for chips, glows and details */
  tint: string;
  medium: string;
}

export const ARTWORKS: Artwork[] = [
  {
    id: "forgotten-coast",
    title: "The Forgotten Coast",
    categories: ["Environment Art", "Digital Painting"],
    src: coast,
    alt: "Wide fantasy environment painting of colossal dark stone structures rising from a churning sea beneath a burning amber sky",
    description:
      "A wide study of light and scale — colossal dark structures rise from a churning sea while tiny travellers trace the cliff path beneath a burning sky. Painted to explore how small a figure can feel inside a world.",
    ratio: "16 / 9",
    tint: "#BC5B39",
    medium: "Digital painting — environment study",
  },
  {
    id: "last-bus-home",
    title: "The Last Bus Home",
    categories: ["Illustration", "Visual Storytelling"],
    src: busstop,
    alt: "Vertical illustration of a lonely rural bus stop glowing warm against a deep blue dusk, moths circling the lamp",
    description:
      "A quiet vertical narrative: a lone shelter holds its warm lamp against the arriving night, waiting for someone who may have already walked home. An exercise in telling a whole story with no people in it.",
    ratio: "9 / 16",
    tint: "#D29A3A",
    medium: "Digital illustration — narrative scene",
  },
  {
    id: "what-the-hollow-keeps",
    title: "What the Hollow Keeps",
    categories: ["Digital Painting", "Environment Art"],
    src: hollow,
    alt: "Dark conceptual painting of a glowing organic cocoon hanging from a twisted tree while a small horned creature watches from below",
    description:
      "A dark conceptual piece built around a single question — what hangs in the dark, and what waits below to watch it glow. One warm light source against deep umber shadow.",
    ratio: "4 / 5",
    tint: "#8A9A7B",
    medium: "Concept painting — mood & creature",
  },
  {
    id: "black-leg-study",
    title: "Black Leg — Sanji Study",
    categories: ["Character Art"],
    fanArt: true,
    src: sanji,
    alt: "Stylized anime fan-art of the blond cook Sanji in a black suit, mid-kick with his leg ignited in blue flame",
    description:
      "A fan-art character study of One Piece's chain-smoking cook, caught mid-kick with Diable Jambe flame — drawn for the sheer joy of the pose, the suit lines and that impossible eyebrow.",
    ratio: "4 / 5",
    tint: "#C98A7D",
    medium: "Character fan art — One Piece",
  },
  {
    id: "beneath-a-patient-sky",
    title: "Beneath a Patient Sky",
    categories: ["Visual Storytelling", "Environment Art"],
    src: grave,
    alt: "Symbolic landscape of a weathered grave marker standing in tall golden grass under an immense cloud-filled sky",
    description:
      "A symbolic field piece — one weathered marker, an ocean of grass, and a sky large enough to hold every story the ground keeps quiet. Painted slowly, mostly to get the clouds right.",
    ratio: "3 / 2",
    tint: "#E9B48F",
    medium: "Digital painting — symbolic landscape",
  },
  {
    id: "wanted-straw-hat",
    title: "Wanted — Straw Hat Study",
    categories: ["Illustration", "Character Art"],
    fanArt: true,
    src: wanted,
    alt: "Stylized sepia wanted-poster fan illustration of a grinning straw-hat pirate boy on aged parchment",
    description:
      "A stylized wanted-poster fan piece for Monkey D. Luffy, aged into sepia parchment as if it had been nailed to every dock in the East Blue — creases, stains and all.",
    ratio: "4 / 5",
    tint: "#A292B8",
    medium: "Illustrated fan poster — One Piece",
  },
];

export const PORTRAIT = {
  src: portrait,
  alt: "Warm stylized illustration of Prathamesh at his drawing desk, sketching on a pen tablet in golden afternoon light",
};

export const SOCIALS = {
  email: "craftedbyprathmesh@gmail.com",
  instagram: "https://www.instagram.com/orewapratham/",
  instagramHandle: "@orewapratham",
  behance: "https://www.behance.net/craftedbyprathmesh",
  behanceHandle: "craftedbyprathmesh",
};
