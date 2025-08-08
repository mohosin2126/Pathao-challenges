import { useEffect, useState } from "react";

export function useDrag(ref, isDraggable, onDragEnd) {
    const [dragging, setDragging] = useState(false);
    const [offset, setOffset] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const onMouseMove = (e) => {
            if (!dragging || !isDraggable.current) return;
            ref.current.style.left = `${e.clientX - offset.x}px`;
            ref.current.style.top = `${e.clientY - offset.y}px`;
        };

        const onMouseUp = (e) => {
            if (!dragging) return;
            setDragging(false);
            if (isDraggable.current) onDragEnd(e.clientX, e.clientY);
        };

        window.addEventListener("mousemove", onMouseMove);
        window.addEventListener("mouseup", onMouseUp);

        return () => {
            window.removeEventListener("mousemove", onMouseMove);
            window.removeEventListener("mouseup", onMouseUp);
        };
    }, [dragging, offset, onDragEnd]);

    return (e) => {
        if (!ref.current || !isDraggable.current) return;
        const rect = ref.current.getBoundingClientRect();
        setOffset({ x: e.clientX - rect.left, y: e.clientY - rect.top });
        setDragging(true);
    };
}
