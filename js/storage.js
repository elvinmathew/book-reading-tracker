// Shared helper functions used by every page.
// localStorage is our database: "books" and "readingLogs" hold JSON arrays.

// Read a JSON array from localStorage, returns [] when nothing usable is stored.
function getItems(key) {
  var raw = localStorage.getItem(key);
  if (!raw) return [];
  try {
    var items = JSON.parse(raw);
    return Array.isArray(items) ? items : [];
  } catch (e) {
    return [];
  }
}

// Write an array back to localStorage as a JSON string.
function saveItems(key, items) {
  localStorage.setItem(key, JSON.stringify(items));
}

// Get every book.
function getBooks() {
  return getItems("books");
}

// Save the full list of books.
function saveBooks(books) {
  saveItems("books", books);
}

// Get every reading log.
function getLogs() {
  return getItems("readingLogs");
}

// Save the full list of reading logs.
function saveLogs(logs) {
  saveItems("readingLogs", logs);
}

// Get the book id from the URL, for example progress.html?id=123.
function getUrlId() {
  var params = new URLSearchParams(window.location.search);
  return params.get("id");
}

// Find one book by its id, returns null when it does not exist.
function findBook(id) {
  var books = getBooks();
  for (var i = 0; i < books.length; i++) {
    if (String(books[i].bookid) === String(id)) return books[i];
  }
  return null;
}

// Replace the book with the same id and store the list again.
function saveBook(updated) {
  var books = getBooks().map(function (book) {
    return String(book.bookid) === String(updated.bookid) ? updated : book;
  });
  saveBooks(books);
}

// Delete a book together with all of its reading logs.
function deleteBook(id) {
  saveBooks(
    getBooks().filter(function (book) {
      return String(book.bookid) !== String(id);
    })
  );
  saveLogs(
    getLogs().filter(function (log) {
      return String(log.bookid) !== String(id);
    })
  );
}

// Today's date in YYYY-MM-DD format.
function todayString() {
  var d = new Date();
  var month = String(d.getMonth() + 1).padStart(2, "0");
  var day = String(d.getDate()).padStart(2, "0");
  return d.getFullYear() + "-" + month + "-" + day;
}

// Show the status message, type is "success" or "error".
function showMessage(text, type) {
  var box = document.getElementById("message");
  if (!box) return;
  box.textContent = text;
  box.className = "message " + type;
  box.hidden = false;
}

// Small helper to build an element: el("p", "book-meta", "Some text").
function el(tag, className, text) {
  var node = document.createElement(tag);
  if (className) node.className = className;
  if (text !== undefined && text !== null) node.textContent = text;
  return node;
}

// Build a progress bar made of two divs and return the outer bar.
function createProgressBar(read, total) {
  var percent = 0;
  if (total > 0) percent = Math.round((read / total) * 100);
  if (percent < 0) percent = 0;
  if (percent > 100) percent = 100;

  var bar = el("div", "progress");
  bar.setAttribute("role", "progressbar");
  bar.setAttribute("aria-valuemin", "0");
  bar.setAttribute("aria-valuemax", "100");
  bar.setAttribute("aria-valuenow", String(percent));

  var fill = el("div", "progress-fill");
  fill.style.width = percent + "%";
  bar.appendChild(fill);
  return bar;
}

// Format a rating for display, an empty value means the book is not rated.
function formatRating(rating) {
  if (!rating) return "Not rated";
  return rating + " / 5";
}
