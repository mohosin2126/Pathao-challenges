# 🪟 Window Tiler

An interactive desktop-like tiling window manager built with **React** and **Tailwind CSS**, mimicking systems like Windows Snap or macOS Split View — without using any external libraries, Canvas, or SVG.

> ### ✅ What Was Their Requirement?
> Build a functional tiling window layout system using just **React and Tailwind**, with support for edge snapping, nested snapping, and draggable, closable windows — no canvas, no SVG, and no npm libraries allowed.  
> Below are the **exact requirements provided** by them:

---

## 📋 Their Requirements

1. You are creating a **tiling window system** similar to Windows or Mac.
2. Users will be able to **create windows** using the “+” button on the bottom right corner.
3. Each window will have a **random color**, and appear at a **random position**.
4. Windows will have a **top bar with a close button**.
5. Users can **close windows** using the close button.
6. Users can **click and drag** on the bar to move windows.
7. When a window is **within 30px of a screen edge**, a **transparent indicator** will show where it can snap.
8. Once snapped, the window takes either:
   - **Full width** if snapped to **top** or **bottom**
   - **Full height** if snapped to **left** or **right**
9. Snapped windows will always take **50%** of the space on the axis they were snapped to.
10. Windows can be **snapped inside other windows** (nested tiling).
11. Initially, windows can be snapped on **all 4 sides**: top, left, bottom, right.
12. Once a window is divided, **snapping is allowed only on the longer axis** of the sub-grid.
13. Windows can still be **closed after being snapped**; the remaining window will expand to take full space.
14. A snapped window can be **dragged out to become floating** again; the other window will expand like in closing case.

---

## 🧑‍⚖️ Rules (Strictly Enforced)

1. ❌ **No changes** to the provided `package.json`
2. ❌ **No external libraries** from `npm`
3. ❌ **No SVG or Canvas**  
   ✅ Use only **React**, **HTML**, and **Tailwind CSS**

---

## ✅ Evaluate Yourself

Use this checklist to verify the completeness of your implementation:

| #   | Feature Description                                                                 | Completed |
|-----|--------------------------------------------------------------------------------------|-----------|
| 1/6 | Windows are being generated at **random positions**                                 | ☐         |
| 2/6 | You are able to **move** the windows                                                 | ☐         |
| 3/6 | Windows are **snapping to the sides**                                                | ☐         |
| 4/6 | Windows are **snapping to nested sides**                                             | ☐         |
| 5/6 | Windows can be **closed/removed**                                                    | ☐         |
| 6/6 | The **other windows adjust correctly** when one is removed or dragged away          | ☐         |

---

## 🛠 Tech Stack

- ⚛️ **React** – Component structure and DOM logic
- 💨 **Tailwind CSS** – Styling and layout
- 🧠 **Pure JS logic** – For drag/snap/grid management
- ✅ No canvas, no SVG, no 3rd-party libs

---
