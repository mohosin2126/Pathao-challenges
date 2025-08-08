import React, { useRef, useState, useEffect, useMemo } from "react";
import {
    SHAPE_RADIUS,
    MIN_DRAW_SIZE,
    MIN_SPLIT_SIZE,
    BOX_STYLE,
    SHAPE_COLORS,
    generateUniqueId,
    getRandomColor,
    isIntersectingWithLine,
} from "../utils/index.jsx";

export default function PillSplitter() {
    const containerRef = useRef(null);
    const [shapes, setShapes] = useState([]);
    const [mousePos, setMousePos] = useState({ x: 200, y: 200 });
    const [drawingShape, setDrawingShape] = useState(null);
    const [dragShape, setDragShape] = useState(null);
    const clickRef = useRef({ x: 0, y: 0, time: 0 });

    const getMousePosition = (e) => {
        const rect = containerRef.current?.getBoundingClientRect();
        return {
            x: e.clientX - (rect?.left || 0),
            y: e.clientY - (rect?.top || 0),
        };
    };

    const bringShapeToFront = (id) => {
        setShapes((prevShapes) => {
            const index = prevShapes.findIndex((s) => s.id === id);
            if (index === -1) return prevShapes;
            const selected = prevShapes[index];
            return [...prevShapes.slice(0, index), ...prevShapes.slice(index + 1), selected];
        });
    };

    const handleMouseDown = (e) => {
        const { x, y } = getMousePosition(e);
        const targetId = e.target.dataset.shapeId;
        clickRef.current = { x, y, time: Date.now(), id: targetId };

        if (targetId) {
            bringShapeToFront(targetId);
            const selectedShape = shapes.find((s) => s.id === targetId);
            setDragShape({
                id: targetId,
                offsetX: x - selectedShape.x,
                offsetY: y - selectedShape.y,
            });
        } else {
            setDrawingShape({ startX: x, startY: y, endX: x, endY: y });
        }
    };

    useEffect(() => {
        const handleMouseMove = (e) => {
            const { x, y } = getMousePosition(e);
            setMousePos({ x, y });

            if (drawingShape) {
                setDrawingShape((prev) => prev && { ...prev, endX: x, endY: y });
            }

            if (dragShape) {
                setShapes((prev) =>
                    prev.map((shape) =>
                        shape.id === dragShape.id
                            ? { ...shape, x: x - dragShape.offsetX, y: y - dragShape.offsetY }
                            : shape
                    )
                );
            }
        };

        const handleMouseUp = (e) => {
            const { x, y } = getMousePosition(e);
            const distance = Math.hypot(x - clickRef.current.x, y - clickRef.current.y);
            const timeDelta = Date.now() - clickRef.current.time;

            if (drawingShape) {
                const { startX, startY, endX, endY } = drawingShape;
                const shapeX = Math.min(startX, endX);
                const shapeY = Math.min(startY, endY);
                const width = Math.abs(endX - startX);
                const height = Math.abs(endY - startY);

                if (width >= MIN_DRAW_SIZE && height >= MIN_DRAW_SIZE) {
                    setShapes((prev) => [
                        ...prev,
                        {
                            id: generateUniqueId(),
                            x: shapeX,
                            y: shapeY,
                            w: width,
                            h: height,
                            color: getRandomColor(SHAPE_COLORS),
                        },
                    ]);
                }
                setDrawingShape(null);
            }

            if (dragShape) {
                setDragShape(null);
                if (distance < 4 && timeDelta < 300) {
                    const idsToSplit = new Set(
                        shapes.filter((s) => isIntersectingWithLine(s, x, y)).map((s) => s.id)
                    );
                    if (idsToSplit.size) splitShapes(x, y, idsToSplit);
                }
                return;
            }

            if (distance < 4 && timeDelta < 300) {
                const idsToSplit = new Set(
                    shapes.filter((s) => isIntersectingWithLine(s, x, y)).map((s) => s.id)
                );
                if (idsToSplit.size) splitShapes(x, y, idsToSplit);
            }
        };

        window.addEventListener("mousemove", handleMouseMove);
        window.addEventListener("mouseup", handleMouseUp);
        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("mouseup", handleMouseUp);
        };
    }, [drawingShape, dragShape, shapes]);

    const splitShapes = (splitX, splitY, affectedIds) => {
        setShapes((prev) => {
            const updated = [];

            for (const shape of prev) {
                const shouldSplit = affectedIds.has(shape.id);
                if (!shouldSplit) {
                    updated.push(shape);
                    continue;
                }

                const canVertSplit =
                    shape.x < splitX &&
                    shape.x + shape.w > splitX &&
                    splitX - shape.x >= MIN_SPLIT_SIZE &&
                    shape.x + shape.w - splitX >= MIN_SPLIT_SIZE;

                const canHorizSplit =
                    shape.y < splitY &&
                    shape.y + shape.h > splitY &&
                    splitY - shape.y >= MIN_SPLIT_SIZE &&
                    shape.y + shape.h - splitY >= MIN_SPLIT_SIZE;

                const reposition = (s) => {
                    let nx = s.x;
                    let ny = s.y;
                    if (!canVertSplit) nx = s.x + s.w / 2 < splitX ? splitX - s.w - 2 : splitX + 2;
                    if (!canHorizSplit) ny = s.y + s.h / 2 < splitY ? splitY - s.h - 2 : splitY + 2;
                    return { ...s, x: nx, y: ny };
                };

                if (canVertSplit && canHorizSplit) {
                    const left = shape.x;
                    const top = shape.y;
                    const right = splitX;
                    const bottom = splitY;

                    updated.push(
                        { id: generateUniqueId(), x: left, y: top, w: right - left, h: bottom - top, color: shape.color },
                        { id: generateUniqueId(), x: splitX, y: top, w: shape.x + shape.w - splitX, h: bottom - top, color: shape.color },
                        { id: generateUniqueId(), x: left, y: splitY, w: right - left, h: shape.y + shape.h - splitY, color: shape.color },
                        { id: generateUniqueId(), x: splitX, y: splitY, w: shape.x + shape.w - splitX, h: shape.y + shape.h - splitY, color: shape.color }
                    );
                } else if (canVertSplit) {
                    const leftW = splitX - shape.x;
                    const rightW = shape.x + shape.w - splitX;
                    const leftShape = { id: generateUniqueId(), x: shape.x, y: shape.y, w: leftW, h: shape.h, color: shape.color };
                    const rightShape = { id: generateUniqueId(), x: splitX, y: shape.y, w: rightW, h: shape.h, color: shape.color };
                    updated.push(canHorizSplit ? leftShape : reposition(leftShape));
                    updated.push(canHorizSplit ? rightShape : reposition(rightShape));
                } else if (canHorizSplit) {
                    const topH = splitY - shape.y;
                    const bottomH = shape.y + shape.h - splitY;
                    const topShape = { id: generateUniqueId(), x: shape.x, y: shape.y, w: shape.w, h: topH, color: shape.color };
                    const bottomShape = { id: generateUniqueId(), x: shape.x, y: splitY, w: shape.w, h: bottomH, color: shape.color };
                    updated.push(canVertSplit ? topShape : reposition(topShape));
                    updated.push(canVertSplit ? bottomShape : reposition(bottomShape));
                } else {
                    updated.push(reposition(shape));
                }
            }

            return updated;
        });
    };

    const drawingPreview = useMemo(() => {
        if (!drawingShape) return null;
        const x = Math.min(drawingShape.startX, drawingShape.endX);
        const y = Math.min(drawingShape.startY, drawingShape.endY);
        const w = Math.abs(drawingShape.endX - drawingShape.startX);
        const h = Math.abs(drawingShape.endY - drawingShape.startY);
        return { x, y, w, h };
    }, [drawingShape]);

    return (
        <div
            ref={containerRef}
            className="relative w-full h-[100dvh] bg-[#cfe1fb]"
            onMouseDown={handleMouseDown}
        >
            {shapes.map((shape, idx) => (
                <div
                    key={shape.id}
                    data-shape-id={shape.id}
                    className={`absolute ${BOX_STYLE} shadow-sm cursor-move`}
                    style={{
                        left: shape.x,
                        top: shape.y,
                        width: shape.w,
                        height: shape.h,
                        background: shape.color,
                        borderRadius: SHAPE_RADIUS,
                        zIndex: 10 + idx,
                    }}
                />
            ))}

            {drawingPreview && (
                <div
                    className="absolute border-2 border-rose-500/70 border-dashed bg-rose-400/10 pointer-events-none"
                    style={{
                        left: drawingPreview.x,
                        top: drawingPreview.y,
                        width: drawingPreview.w,
                        height: drawingPreview.h,
                        borderRadius: SHAPE_RADIUS,
                        zIndex: 40,
                    }}
                />
            )}

            <div
                className="absolute top-0 h-full w-[3px] bg-slate-600/80 pointer-events-none"
                style={{ left: mousePos.x, transform: "translateX(-1.5px)", zIndex: 50 }}
            />
            <div
                className="absolute left-0 w-full h-[3px] bg-slate-600/80 pointer-events-none"
                style={{ top: mousePos.y, transform: "translateY(-1.5px)", zIndex: 50 }}
            />
        </div>
    );
}
