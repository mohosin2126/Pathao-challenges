# Pathao Innovation Team – Frontend Engineer Challenges

Three unique drag-interactive UI challenges built with **React** and **Tailwind CSS** — no Canvas, no SVG, no extra npm libraries.

---

## 💊 Pill Splitter

An interactive pill-creation and splitting UI that combines **drag-to-create**, **cursor-follow split lines**, and **recursive geometric splitting** — all rendered with pure HTML/CSS and React.

### 📋 Requirements
1. Vertical and horizontal **split lines** follow the cursor.
2. **Pills** = rounded `div`s with `border-radius: 20px`.
3. Draw new pills by **click-dragging** from empty space.
4. Each pill has a **random color**.
5. **Minimum pill size:** `40×40px`.
6. **Single click** splits all pills intersecting the split lines.
7. Splitting retains **original corner radius** and **color**.
8. **Minimum part size:** `20×20px`; too-small parts move aside instead of splitting.
9. Pills and parts can be **dragged** to move.
10. Pills have a **thick border** for clear separation.

### 🧑‍⚖️ Rules
- ❌ No changes to `package.json`
- ❌ No extra npm libraries
- ❌ No SVG or Canvas
- ✅ Only React + HTML + Tailwind

### ✅ Self-Evaluation
| #  | Feature                                             | Done |
|----|-----------------------------------------------------|------|
|1/6 | Split lines follow cursor                           | ☐    |
|2/6 | Draw pills by drag                                  | ☐    |
|3/6 | Split pills on click                                | ☐    |
|4/6 | Move pills/parts by drag                            | ☐    |
|5/6 | Retain radius/color after split                     | ☐    |
|6/6 | Random colors, min sizes, auto movement for small   | ☐    |

---

## 🪟 Window Tiler

A **desktop-style tiling window manager** with snapping, nested layouts, and dynamic resizing — mimicking Windows Snap or macOS Split View.

### 📋 Requirements
1. **Create windows** with “+” button (random color & position).
2. Each window has a **top bar** + **close button**.
3. **Drag** by bar to move windows.
4. **Snap indicator** appears within 30px of screen edges.
5. Snap:
   - Top/bottom → full width, 50% height
   - Left/right → full height, 50% width
6. **Nested snapping** allowed on the longer axis.
7. Close a snapped window → other fills space.
8. Drag out of snap → becomes floating window.

### 🧑‍⚖️ Rules
- ❌ No changes to `package.json`
- ❌ No extra npm libraries
- ❌ No SVG or Canvas
- ✅ Only React + HTML + Tailwind

### ✅ Self-Evaluation
| #  | Feature                          | Done |
|----|-----------------------------------|------|
|1/6 | Windows generated randomly       | ☐    |
|2/6 | Move windows                     | ☐    |
|3/6 | Snap to edges                    | ☐    |
|4/6 | Nested snapping                  | ☐    |
|5/6 | Close/remove windows             | ☐    |
|6/6 | Proper resizing after changes    | ☐    |

---

## 🃏 Shuffle Board

A Trello/Notion-style **two-column board** with animated **spotlight drag effect** and **blue highlight drop target**.

### 📋 Requirements
1. Two columns, **4 cards each** (fixed width, random height & color).
2. Drag card → floats with mouse at **90% opacity**.
3. **Dark overlay** with **light area** around cursor (no Canvas/SVG).
4. Other cards under darkness; dragged card + highlight above.
5. Hover gap in other column → animated **blue placeholder** sized to card.
6. Drop:
   - If highlight active → insert card
   - Else → return to original position
7. **Cross-column moves only** (no same-column drops).

### 🧑‍⚖️ Rules
- ❌ No changes to `package.json`
- ❌ No extra npm libraries
- ❌ No SVG or Canvas
- ✅ Only React + HTML + Tailwind

### ✅ Self-Evaluation
| #  | Feature                                  | Done |
|----|-------------------------------------------|------|
|1/6 | Cards displayed                          | ☐    |
|2/6 | Drag cards                               | ☐    |
|3/6 | Darkness + spotlight (no canvas/svg)     | ☐    |
|4/6 | Blue highlight on valid gaps             | ☐    |
|5/6 | Drop in correct position                 | ☐    |
|6/6 | Random sizes/colors, snap-back animation | ☐    |

---

## 📦 Submission Steps
1. Download starter code for each challenge.
2. Implement features.
3. Commit changes.
4. Add provided **SSH Git URL** as remote.
5. Push to remote before challenge portal closes.


