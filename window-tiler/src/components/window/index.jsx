import  { useRef, useState } from "react";
import {useDrag} from "../../hook/useDrag.js";
import {SnapIndicator} from "../snap-indicator/index.jsx";


export function Window({ win, indexInZone, totalInZone, onRemove, onAttemptSnap }) {
    const ref = useRef();
    const isDraggable = useRef(!win.snapped);
    const [hoverSnap, setHoverSnap] = useState(null);

    const checkSnap = (x, y) => {
        const t = 40;
        if (y < t) return "top";
        if (y > window.innerHeight - t) return "bottom";
        if (x < t) return "left";
        if (x > window.innerWidth - t) return "right";
        return null;
    };

    const startDrag = useDrag(ref, isDraggable, (x, y) => {
        const snapSide = checkSnap(x, y);
        onAttemptSnap(win.id, x, y, snapSide);
        setHoverSnap(null);
    });

    const calcSnapStyle = () => {
        const halfW = window.innerWidth / totalInZone;
        const halfH = window.innerHeight / totalInZone;
        switch (win.snapSide) {
            case "top":
                return { left: indexInZone * halfW, top: 0, width: halfW, height: window.innerHeight / 2 };
            case "bottom":
                return { left: indexInZone * halfW, top: window.innerHeight / 2, width: halfW, height: window.innerHeight / 2 };
            case "left":
                return { left: 0, top: indexInZone * halfH, width: window.innerWidth / 2, height: halfH };
            case "right":
                return { left: window.innerWidth / 2, top: indexInZone * halfH, width: window.innerWidth / 2, height: halfH };
            default:
                return { left: win.x, top: win.y, width: win.width, height: win.height };
        }
    };

    const style = calcSnapStyle();

    return (
        <div
            ref={ref}
            className="absolute rounded shadow text-white select-none border border-gray-300"
            style={{
                ...style,
                backgroundColor: win.color,
                boxSizing: "border-box",
                padding: 8,
                cursor: isDraggable.current ? "move" : "default",
                zIndex: win.snapped ? 0 : 100,
            }}
            onMouseMove={(e) => {
                if (isDraggable.current) setHoverSnap(checkSnap(e.clientX, e.clientY));
            }}
            onMouseDown={startDrag}
        >
            <div className="flex justify-between mb-2">
                <strong>Window</strong>
                <button onClick={() => onRemove(win.id)}>X</button>
            </div>
            {hoverSnap && <SnapIndicator side={hoverSnap} />}
        </div>
    );
}
