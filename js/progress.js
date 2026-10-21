// Progress page: show the book, update pages, chapters and rating, list the logs.

var form = document.getElementById("progressForm");
var bookId = getUrlId();
var book = findBook(bookId);

// When the id in the URL matches no book, hide the form and stop.
if (!book) {
  showMessage("Book not found.", "error");
  form.hidden = true;
}

// Read a form field as a number, returns null when it is empty or not a number.
function readNumber(id) {
  var raw = document.getElementById(id).value.trim();
  if (raw === "" || isNaN(Number(raw))) return null;
  return Number(raw);
}

// Fill the summary and the form defaults for this book.
function fillPage() {
  document.getElementById("bookTitle").textContent = book.title;
  document.getElementById("bookAuthor").textContent = book.author;
  document.getElementById("pagesStat").textContent = book.pages_read + " / " + book.total_pages + " pages";
  document.getElementById("chaptersStat").textContent = book.chapters_read + " / " + book.total_chapters + " chapters";

  var barBox = document.getElementById("progressBar");
  barBox.innerHTML = "";
  barBox.appendChild(createProgressBar(book.pages_read, book.total_pages));

  document.getElementById("pages_read").value = book.pages_read;
  document.getElementById("chapters_read").value = book.chapters_read;
  document.getElementById("rating").value = book.rating;
}

// Draw the reading logs of this book, newest date first.
function renderLogs() {
  var list = document.getElementById("logList");
  list.innerHTML = "";

  var logs = getLogs().filter(function (log) {
    return String(log.bookid) === String(book.bookid);
  });

  logs.sort(function (a, b) {
    if (a.date === b.date) return 0;
    return a.date < b.date ? 1 : -1;
  });

  if (logs.length === 0) {
    list.appendChild(el("li", "log-empty", "No reading logs yet."));
    return;
  }

  logs.forEach(function (log) {
    var item = el("li", "log-item");

    var head = el("div", "log-head");
    head.appendChild(el("span", "log-date", log.date));
    head.appendChild(el("span", "log-pages", "+" + log.pages_added + " pages"));
    item.appendChild(head);

    if (log.notes) item.appendChild(el("p", "log-notes", log.notes));

    list.appendChild(item);
  });
}

// Handle the submit: validate, save the book, add a log when pages grew.
form.addEventListener("submit", function (event) {
  event.preventDefault();
  if (!book) return;

  var newPages = readNumber("pages_read");
  var newChapters = readNumber("chapters_read");
  var note = document.getElementById("note").value.trim();
  var ratingValue = document.getElementById("rating").value;

  if (newPages === null || newPages < 0) {
    showMessage("Pages read must be a number that is 0 or more.", "error");
    return;
  }
  if (newChapters === null || newChapters < 0) {
    showMessage("Chapters read must be a number that is 0 or more.", "error");
    return;
  }
  if (newPages > book.total_pages) {
    showMessage("Pages read cannot be more than " + book.total_pages + ".", "error");
    return;
  }
  if (newChapters > book.total_chapters) {
    showMessage("Chapters read cannot be more than " + book.total_chapters + ".", "error");
    return;
  }

  var pagesAdded = newPages - book.pages_read;

  book.pages_read = newPages;
  book.chapters_read = newChapters;
  book.rating = ratingValue;
  saveBook(book);

  // Only growing the page count creates a reading log entry.
  if (pagesAdded > 0) {
    var logs = getLogs();
    logs.push({
      id: Date.now(),
      bookid: book.bookid,
      date: todayString(),
      pages_added: pagesAdded,
      notes: note
    });
    saveLogs(logs);
  }

  showMessage("Progress saved. Redirecting to the dashboard...", "success");
  setTimeout(function () {
    window.location.href = "index.html";
  }, 1000);
});

// Only fill the page when a book was found.
if (book) {
  fillPage();
  renderLogs();
}
