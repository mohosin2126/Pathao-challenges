export const generateWindow = () => ({
    id: Math.random().toString(36).slice(2),
    x: Math.random() * window.innerWidth * 0.5,
    y: Math.random() * window.innerHeight * 0.5,
    width: 300,
    height: 200,
    color: ["#f87171", "#60a5fa", "#34d399", "#facc15", "#a78bfa"][Math.floor(Math.random() * 5)],
    snapped: false,
    snapSide: null,
});
