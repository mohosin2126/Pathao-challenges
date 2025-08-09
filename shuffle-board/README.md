# Shuffle Board

An interactive Trello/Notion-style two-column board built with React and Tailwind CSS — no external libraries, no Canvas, and no SVG. Drag cards across columns with a cinematic “spotlight” darkness effect, animated insertion highlights, and strict cross-column drop logic.

## ✅ What Was Their Requirement?

Build a two-column board where cards can only be dragged **to the other column**, with a dark overlay + spotlight while dragging, an **animated blue highlight** showing the potential drop spot, and precise placement or graceful snap-back if the drop isn’t valid.

Below are the exact requirements provided:

### 📋 Their Requirements

1. Create a Trello/Notion-like board with **two columns**.
2. Both columns start with **4 cards** each, **fixed width**, **random height**, **random color**.
3. On drag, the card **floats with the mouse**.
4. While dragging, show a **dark layer** over the board with a **light area around the cursor** (no Canvas/SVG).
5. While dragging **near gaps in the other column**, show a **blue highlight** that **expands** (animated) to the **size of the dragged card**.
6. The **highlight and dragged card** render **above** the dark layer.
7. **All other cards** render **below** the dark layer.
8. The dragged card has **90% opacity**.
9. On drop **when highlight is active**, place the card at that location.
10. On drop **without highlight**, return the card to its original position.
11. **No same-column drops** — only drop into the **other** column.

### 🧑‍⚖️ Rules (Strictly Enforced)

* ❌ Don’t change the provided `package.json`.
* ❌ Don’t install or use any extra npm libraries.
* ❌ **Don’t use SVG or Canvas**.
* ✅ Use only **React**, **HTML**, and **Tailwind CSS**.

## ✅ Evaluate Yourself

Use this checklist to verify completeness:

* [ ] (1/6) Cards are shown
* [ ] (2/6) Cards can be dragged
* [ ] (3/6) Darkness + spotlight (no canvas/svg)
* [ ] (4/6) Blue highlight activates when hovering valid gaps
* [ ] (5/6) Dropped cards land in the correct position
* [ ] (6/6) Random color/size + auto return to origin when invalid

## 🛠 Tech Stack

* ⚛️ **React** — Components & drag logic (pointer events)
* 💨 **Tailwind CSS** — Layout, layering, and animations
* 🧠 **Pure JS** — Collision math, gap detection, and reordering
* 🚫 **No Canvas/SVG/3rd-party libs**
