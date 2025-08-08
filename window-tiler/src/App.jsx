import React, { useState } from "react";
import { Window } from "./components/Window";
import {generateWindow} from "./utils/index.jsx";

export default function App() {
    const [windows, setWindows] = useState([]);

    const addWindow = () => setWindows((prev) => [...prev, generateWindow()]);
    const removeWindow = (id) => setWindows((prev) => prev.filter((w) => w.id !== id));

    const attemptSnap = (id, x, y, snapSide) => {
        setWindows((prev) =>
            prev.map((w) =>
                w.id === id ? { ...w, snapped: !!snapSide, snapSide, x, y } : w
            )
        );
    };

    const getSnapZonesMap = () => {
        const map = { top: [], bottom: [], left: [], right: [] };
        windows.forEach((w) => {
            if (w.snapped && w.snapSide) map[w.snapSide].push(w.id);
        });
        return map;
    };

    const snapZonesMap = getSnapZonesMap();

    return (
        <main className="h-screen w-screen bg-slate-100 overflow-hidden relative">
            <h1 className="p-6 text-xl font-bold font-mono text-slate-700">Tiling Window Manager</h1>
            {windows.map((win) => {
                const zone = win.snapSide;
                const snappedIds = zone ? snapZonesMap[zone] : [];
                return (
                    <Window
                        key={win.id}
                        win={win}
                        onRemove={removeWindow}
                        onAttemptSnap={attemptSnap}
                        indexInZone={zone ? snappedIds.indexOf(win.id) : 0}
                        totalInZone={snappedIds.length || 1}
                    />
                );
            })}
            <button
                onClick={addWindow}
                className="fixed bottom-5 right-5 bg-blue-600 text-white rounded-full w-12 h-12 flex items-center justify-center text-3xl shadow-md"
            >
                +
            </button>
        </main>
    );
}
