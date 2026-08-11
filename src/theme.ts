export const COLORS = {
  blue: "#07579C",
  blue2: "#0A66B7",
  lightBlue: "#AFCDF7",
  paleBlue: "#E8F1FC",
  ink: "#14202B",
  text: "#273746",
  gray: "#6D7680",
  line: "#E6E7EA",
  soft: "#F3F1F1",
  card: "#FFFFFF",
  background: "#FFFCFB",
  danger: "#D92D2D",
  dangerSoft: "#FDE7E5",
  green: "#248B5B",
};

export const DARK_COLORS = {
  blue: "#69A3E7",
  blue2: "#7DB5F0",
  lightBlue: "#2E4A67",
  paleBlue: "#172B45",
  ink: "#F4F7FA",
  text: "#D6E0EA",
  gray: "#93A0AE",
  line: "#33455A",
  soft: "#1F2B3A",
  card: "#182230",
  background: "#0F1722",
  danger: "#FF7B72",
  dangerSoft: "#3A2323",
  green: "#5DE0A3",
};

export function getThemeColors(darkMode: boolean) {
  return darkMode ? { ...COLORS, ...DARK_COLORS } : COLORS;
}
