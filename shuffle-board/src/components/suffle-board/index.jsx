import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import "../../index.css";
import {createInitialCardSet} from "../../utils/index.js";


export default function ShuffleBoard() {
    const [boardColumns, setBoardColumns] = useState({
        left: createInitialCardSet("a"),
        right: createInitialCardSet("b"),
    });
    const [currentDragData, setCurrentDragData] = useState(null);
    const dragDataRef = useRef(null);
    const [currentDropPosition, setCurrentDropPosition] = useState(null);
    const [recentlyMovedCardId, setRecentlyMovedCardId] = useState(null);

    const leftColumnContainerRef = useRef(null);
    const rightColumnContainerRef = useRef(null);
    const cardDOMRefs = useRef({});

    const CARD_WIDTH_PX = 260;
    const CARD_VERTICAL_GAP_PX = 12;
    const ANIMATION_EASE = "cubic-bezier(.2,.7,.2,1)";
    const ANIMATION_DURATION_MS = 200;

    const getColumnContainer = useCallback(
        (side) => (side === "left" ? leftColumnContainerRef.current : rightColumnContainerRef.current),
        []
    );

    useEffect(() => {
        if (!currentDragData) return;
        const prevCursor = document.body.style.cursor;
        const prevSelect = document.body.style.userSelect;
        document.body.style.cursor = "grabbing";
        document.body.style.userSelect = "none";
        return () => {
            document.body.style.cursor = prevCursor;
            document.body.style.userSelect = prevSelect;
        };
    }, [currentDragData]);

    const animationFrameRef = useRef(0);

    useEffect(() => {
        const handleMouseMove = (event) => {
            if (!dragDataRef.current) return;
            const { clientX, clientY } = event;

            setCurrentDragData((dragData) =>
                dragData ? { ...dragData, pointer: { x: clientX, y: clientY } } : dragData
            );

            if (animationFrameRef.current) return;
            animationFrameRef.current = requestAnimationFrame(() => {
                animationFrameRef.current = 0;
                const activeDrag = dragDataRef.current;
                if (!activeDrag) return;

                const destinationSide = activeDrag.originColumn === "left" ? "right" : "left";
                const destinationColumnElement = getColumnContainer(destinationSide);
                if (!destinationColumnElement) return setCurrentDropPosition(null);

                const columnRect = destinationColumnElement.getBoundingClientRect();
                const pointerInsideX = clientX >= columnRect.left && clientX <= columnRect.right;
                const pointerInsideY = clientY >= columnRect.top - 8 && clientY <= columnRect.bottom + 8;
                if (!(pointerInsideX && pointerInsideY)) return setCurrentDropPosition(null);

                const cardsInDestination = boardColumns[destinationSide];
                const breakPoints = [columnRect.top + CARD_VERTICAL_GAP_PX / 2];

                for (let i = 0; i < cardsInDestination.length; i++) {
                    const cardEl = cardDOMRefs.current[cardsInDestination[i].id];
                    if (!cardEl) continue;
                    const cardRect = cardEl.getBoundingClientRect();
                    if (i < cardsInDestination.length - 1) {
                        const nextCardEl = cardDOMRefs.current[cardsInDestination[i + 1].id];
                        if (nextCardEl) {
                            const nextCardRect = nextCardEl.getBoundingClientRect();
                            breakPoints.push((cardRect.bottom + nextCardRect.top) / 2);
                        }
                    } else {
                        breakPoints.push(cardRect.bottom + CARD_VERTICAL_GAP_PX / 2);
                    }
                }

                let insertionIndex = breakPoints.findIndex((bp) => clientY < bp);
                if (insertionIndex === -1) insertionIndex = cardsInDestination.length;

                setCurrentDropPosition({
                    targetColumn: destinationSide,
                    index: Math.max(0, Math.min(insertionIndex, cardsInDestination.length)),
                });
            });
        };

        const handleMouseUp = () => {
            if (!dragDataRef.current) return;
            const activeDrag = dragDataRef.current;

            if (
                currentDropPosition &&
                currentDropPosition.targetColumn &&
                currentDropPosition.targetColumn !== activeDrag.originColumn
            ) {
                setBoardColumns((prev) => {
                    const sourceSide = activeDrag.originColumn;
                    const targetSide = currentDropPosition.targetColumn;
                    const updated = { left: [...prev.left], right: [...prev.right] };
                    const sourceCards = updated[sourceSide];
                    const targetCards = updated[targetSide];

                    const sourceIndex = sourceCards.findIndex((c) => c.id === activeDrag.card.id);
                    if (sourceIndex === -1) return prev;

                    const [movedCard] = sourceCards.splice(sourceIndex, 1);
                    const insertionIndex = Math.max(0, Math.min(currentDropPosition.index, targetCards.length));
                    targetCards.splice(insertionIndex, 0, movedCard);

                    setRecentlyMovedCardId(movedCard.id);
                    setTimeout(() => setRecentlyMovedCardId(null), 450);

                    return updated;
                });
            }

            setCurrentDropPosition(null);
            setCurrentDragData(null);
            dragDataRef.current = null;
        };

        window.addEventListener("mousemove", handleMouseMove);
        window.addEventListener("mouseup", handleMouseUp);

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("mouseup", handleMouseUp);
            if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
        };
    }, [boardColumns, getColumnContainer, currentDropPosition]);

    const handleCardMouseDown = useCallback((event, card, originColumn) => {
        if (event.button !== 0) return;
        const cardRect = event.currentTarget.getBoundingClientRect();
        const pointerOffset = { x: event.clientX - cardRect.left, y: event.clientY - cardRect.top };
        const dragData = {
            originColumn,
            card,
            pointerOffset,
            pointer: { x: event.clientX, y: event.clientY },
        };
        setCurrentDragData(dragData);
        dragDataRef.current = dragData;
        event.preventDefault();
    }, []);

    const darknessMaskStyle = useMemo(() => {
        if (!currentDragData) return { display: "none" };
        const { pointer, pointerOffset, card } = currentDragData;
        const centerX = pointer.x - pointerOffset.x + CARD_WIDTH_PX / 2;
        const centerY = pointer.y - pointerOffset.y + card.h / 2;
        const padding = 40;
        const radius = Math.max(CARD_WIDTH_PX, card.h) / 2 + padding;
        const gradient = `radial-gradient(circle ${radius}px at ${centerX}px ${centerY}px, rgba(0,0,0,0) 0, rgba(0,0,0,0) ${radius}px, rgba(0,0,0,0.56) ${radius + 1}px)`;
        return { backgroundImage: gradient };
    }, [currentDragData]);

    const FloatingCardPreview = () => {
        if (!currentDragData) return null;
        const { pointer, pointerOffset, card } = currentDragData;
        const translateX = pointer.x - pointerOffset.x;
        const translateY = pointer.y - pointerOffset.y;
        return (
            <div className="fixed top-0 left-0 z-[70] pointer-events-none" style={{ transform: `translate(${translateX}px, ${translateY}px)` }}>
                <div
                    className="w-[260px] rounded-xl shadow-xl opacity-90 overflow-hidden"
                    style={{
                        height: card.h,
                        background: `linear-gradient(120deg, rgba(255,255,255,0.35), rgba(255,255,255,0)), ${card.color}`,
                        transition: `transform ${ANIMATION_DURATION_MS}ms ${ANIMATION_EASE}`,
                    }}
                >
                    <div className="p-4 font-medium text-slate-900/80">{card.text}</div>
                </div>
            </div>
        );
    };

    const Column = ({ columnSide }) => {
        const cards = boardColumns[columnSide];
        const isDropTarget = currentDropPosition?.targetColumn === columnSide && currentDragData;
        const insertionIndex = isDropTarget ? currentDropPosition.index : -1;

        const displayedCards =
            currentDragData && currentDragData.originColumn === columnSide
                ? cards.filter((c) => c.id !== currentDragData.card.id)
                : cards;

        const cardElements = [];
        displayedCards.forEach((card, index) => {
            const isFlashing = recentlyMovedCardId === card.id;
            if (insertionIndex === index) {
                cardElements.push(
                    <div
                        key={`placeholder-${columnSide}-${index}`}
                        className="w-[260px] rounded-xl border shadow-md"
                        style={{
                            height: currentDragData?.card.h ?? 100,
                            background:
                                "linear-gradient(135deg, rgba(59,130,246,0.75), rgba(37,99,235,0.85))",
                            borderColor: "rgba(37,99,235,0.7)",
                            transform: "scaleY(0.9)",
                            animation: isDropTarget
                                ? `growIn ${ANIMATION_DURATION_MS}ms ${ANIMATION_EASE} forwards`
                                : undefined,
                            transition: `height ${ANIMATION_DURATION_MS}ms ${ANIMATION_EASE}`,
                        }}
                    />
                );
            }
            cardElements.push(
                <div
                    key={card.id}
                    ref={(el) => (cardDOMRefs.current[card.id] = el)}
                    className={`w-[260px] rounded-xl shadow-md select-none cursor-grab active:cursor-grabbing overflow-hidden ${
                        isFlashing ? "drop-flash" : ""
                    }`}
                    style={{
                        height: card.h,
                        background: `linear-gradient(180deg, rgba(255,255,255,0.35), rgba(255,255,255,0)), ${card.color}`,
                        transition: `opacity ${ANIMATION_DURATION_MS}ms ${ANIMATION_EASE}, transform ${ANIMATION_DURATION_MS}ms ${ANIMATION_EASE}, height ${ANIMATION_DURATION_MS}ms ${ANIMATION_EASE}`,
                    }}
                    onMouseDown={(e) => handleCardMouseDown(e, card, columnSide)}
                >
                    <div className="p-4 font-medium text-slate-900/80">{card.text}</div>
                </div>
            );
        });

        if (insertionIndex === displayedCards.length) {
            cardElements.push(
                <div
                    key={`placeholder-${columnSide}-end`}
                    className="w-[260px] rounded-xl border shadow-md"
                    style={{
                        height: currentDragData?.card.h ?? 100,
                        background:
                            "linear-gradient(135deg, rgba(59,130,246,0.75), rgba(37,99,235,0.85))",
                        borderColor: "rgba(37,99,235,0.7)",
                        transform: "scaleY(0.9)",
                        animation: isDropTarget
                            ? `growIn ${ANIMATION_DURATION_MS}ms ${ANIMATION_EASE} forwards`
                            : undefined,
                        transition: `height ${ANIMATION_DURATION_MS}ms ${ANIMATION_EASE}`,
                    }}
                />
            );
        }

        return (
            <div className="flex flex-col items-center">
                <div className="mb-3 text-sm font-semibold text-slate-500">
                    {columnSide === "left" ? "Left" : "Right"} Column
                </div>
                <div
                    ref={columnSide === "left" ? leftColumnContainerRef : rightColumnContainerRef}
                    className={`relative flex flex-col items-center gap-3 rounded-2xl p-4 w-[300px] h-[720px] overflow-auto border-2 border-dotted bg-white/60 ${
                        isDropTarget ? "ring-2 ring-blue-400/50" : "border-slate-300"
                    } ${currentDragData ? "cursor-grabbing" : ""}`}
                >
                    {cardElements}
                    {isDropTarget && (
                        <div
                            className="pointer-events-none absolute inset-0 rounded-2xl mix-blend-overlay opacity-60"
                            style={{
                                background:
                                    "linear-gradient(180deg, rgba(59,130,246,0.18), rgba(37,99,235,0.06))",
                            }}
                        />
                    )}
                </div>
            </div>
        );
    };

    return (
        <>
            <h1 className="p-10 font-bold text-xl font-mono text-slate-600">Shuffle Board</h1>
            <div className="flex justify-center">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6">
                    <Column columnSide="left" />
                    <Column columnSide="right" />
                </div>
            </div>

            {currentDragData && <div className="fixed inset-0 z-[60]" style={darknessMaskStyle} />}
            {currentDropPosition && <div className="fixed inset-0 z-[65] pointer-events-none" />}

            <FloatingCardPreview />
        </>
    );
}
