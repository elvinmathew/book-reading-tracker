# Sprints

The Book Reading Tracker is built and committed one sprint at a time. Each sprint is one commit on `main`.

## Sprint 1: Storage + Dashboard
- `css/style.css` shared stylesheet
- `js/storage.js` localStorage helpers shared by every page
- `index.html` and `js/dashboard.js` book list, filter, delete

## Sprint 2: Add + Edit Book
- `add-book.html` and `js/add-book.js` create a book with validation
- `edit-book.html` and `js/edit-book.js` pre-filled form, rating field, validation

## Sprint 3: Progress Page + Docs
- `progress.html` and `js/progress.js` update pages, chapters and rating, reading log history
- `README.md` how to run the project

## How to run
Open `index.html` in a browser. Data lives in localStorage, so everything stays on your machine.

## How to push feature by feature
Each sprint is already its own commit. To publish:

```
git remote add origin <your-repo-url>
git push -u origin main
```
