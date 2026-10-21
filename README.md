# Book Reading Tracker

A simple multi page web app built with plain HTML, CSS and vanilla JavaScript. No frameworks, no libraries, no build tools, no backend. Books and reading logs are stored in the browser with localStorage.

## Pages
- `index.html` dashboard with the book list, a filter and delete
- `add-book.html` form to add a book
- `edit-book.html?id=...` form to edit a book, including its rating
- `progress.html?id=...` update pages, chapters and rating, see the reading log history

## Files
- `css/style.css` one shared stylesheet
- `js/storage.js` helpers to read and write localStorage
- `js/dashboard.js`, `js/add-book.js`, `js/edit-book.js`, `js/progress.js` one script per page
- `SPRINTS.md` the sprint plan, one commit per sprint

## How to run
1. Download or clone this folder.
2. Open `index.html` in any modern browser.

That is it. There is nothing to install and no server to start. Your data is saved in your own browser, so use the same browser to see your books again.

## How the data is stored
Two localStorage keys hold JSON arrays:
- `books` each item has bookid, title, author, total_pages, total_chapters, pages_read, chapters_read, rating, notes, per_day_goal
- `readingLogs` each item has id, bookid, date, pages_added, notes

To reset everything, open the browser console and run `localStorage.clear()`.
