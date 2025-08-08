

# 💊 Pill Splitter

An interactive UI challenge where users can draw, split, and drag "pills" — pill-shaped `div` elements — on a canvas using just **React** and **Tailwind CSS**, without any SVG or Canvas.

> ### ✅ What Was Their Requirement?
> This project was completed as part of a UI challenge.  
> The goal was to **build a fully functional interactive pill-splitting interface** using **only React and Tailwind CSS**, with no Canvas, SVG, or third-party libraries.  
> Below are **the exact requirements provided by them**:

---

## 📋 Their Requirements

1. You are creating a UI where people can split “pills”.
2. There will be a **vertical and horizontal line** following the user’s cursor. Let’s call them **split lines**.
3. A **pill** is simply a box (a `div`) that has rounded corners.
4. Users will be able to **draw pills** by clicking and dragging from any empty part of the page.
5. Each pill should have a **random color** assigned to it.
6. The **minimum size** of a pill is `40px x 40px`.
7. The **border radius** of each pill should be `20px`.
8. When a user **single clicks** on any part of the page, all pills that intersect the “split lines” will **split** along that line.
9. After a pill has been split, the parts of the pill will **retain their original corner radius**.
10. Each pill or part of a pill can be **moved via dragging**.
11. Each part of a pill can be further divided by **splitting again** with a single click.
12. The **minimum size** of a part of a pill should be `20px x 20px`.
13. Each part of a pill should **retain the original pill’s color**.
14. If a certain part of a pill is already **too small to be split**, just **move the part to either side** of the split line.
15. Pill should have a **thin border** so that it is easy to tell the parts apart after a pill is split.

---

## 🧑‍⚖️ Rules (Also Provided by Them)

1. ❌ Don’t make changes to the `package.json` file provided in the starter code.
2. ❌ Don’t use any extra libraries from `npm`.
3. ❌ Don’t use SVG or Canvas; keep it **only React** to render **HTML and Tailwind CSS**.

---

## ✅ Evaluate Yourself

| #   | Feature Description                                                                 | Completed |
|-----|--------------------------------------------------------------------------------------|-----------|
| 1/6 | You have the lines following the cursor                                              | ☐         |
| 2/6 | Users are successfully being able to draw pills                                      | ☐         |
| 3/6 | Users are being able to split pills                                                  | ☐         |
| 4/6 | Users are being able to successfully move pills and parts of pills                   | ☐         |
| 5/6 | Each part of the pill is retaining the original corner radius and color              | ☐         |
| 6/6 | You completed the little bells and whistles like random color, minimum sizes, etc.   | ☐         |

---

> Make sure to use the provided `package.json` and do **not** add extra dependencies.

---

## 🛠 Tech Stack

* ⚛️ **React** – For UI logic
* 💨 **Tailwind CSS** – For styles and layout
* 🖱 **Plain DOM Events** – For drawing, splitting, and dragging
* ✅ No SVG, Canvas, or external libraries

---

