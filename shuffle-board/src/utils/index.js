const between = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
const randomColor = () => `hsl(${between(0, 360)} ${between(55, 85)}% ${between(55, 75)}%)`;
export const createInitialCardSet = (prefix) =>
    Array.from({ length: 4 }, (_, i) => ({
        id: `${prefix}-${i + 1}`,
        h: between(100, 190),
        color: randomColor(),
        text: `Card ${prefix.toUpperCase()}-${i + 1}`,
    }));