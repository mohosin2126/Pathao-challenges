export const SHAPE_RADIUS = 20;
export const MIN_DRAW_SIZE = 40;
export const MIN_SPLIT_SIZE = 20;
export const BOX_STYLE = "border-2 border-slate-600";
export const SHAPE_COLORS = ["#93b29a", "#96b3e5", "#d59c9c"];

export const generateUniqueId = () =>
    Math.random().toString(36).substring(2) + Date.now().toString(36);

export const getRandomColor = (colors) =>
    colors[Math.floor(Math.random() * colors.length)];

export const isIntersectingWithLine = (shape, x, y) =>
    (shape.x < x && shape.x + shape.w > x) ||
    (shape.y < y && shape.y + shape.h > y);
