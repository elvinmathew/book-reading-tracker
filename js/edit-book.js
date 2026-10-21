// Edit Book page: load the book, validate the form and save the changes.

var form = document.getElementById("bookForm");
var bookId = getUrlId();
var book = findBook(bookId);

// When the id in the URL matches no book, hide the form and stop.
if (!book) {
  showMessage("Book not found.", "error");
  form.hidden = true;
}

// Fill the form with the current values of the book.
function fillForm() {
  document.getElementById("title").value = book.title;
  document.getElementById("author").value = book.author;
  document.getElementById("total_pages").value = book.total_pages;
  document.getElementById("total_chapters").value = book.total_chapters;
  document.getElementById("per_day_goal").value = book.per_day_goal;
  document.getElementById("rating").value = book.rating;
  document.getElementById("notes").value = book.notes;
}

// Read the trimmed value of one form field.
function fieldValue(id) {
  return document.getElementById(id).value.trim();
}

// Handle the submit: validate, update the book, then go back to the dashboard.
form.addEventListener("submit", function (event) {
  event.preventDefault();
  if (!book) return;

  var title = fieldValue("title");
  var author = fieldValue("author");
  var totalPages = Number(fieldValue("total_pages"));
  var totalChapters = Number(fieldValue("total_chapters"));
  var goalRaw = fieldValue("per_day_goal");

  if (!title) {
    showMessage("Title is required.", "error");
    return;
  }
  if (!author) {
    showMessage("Author is required.", "error");
    return;
  }
  if (!(totalPages > 0)) {
    showMessage("Total pages must be a number greater than 0.", "error");
    return;
  }
  if (!(totalChapters > 0)) {
    showMessage("Total chapters must be a number greater than 0.", "error");
    return;
  }
  if (totalPages < book.pages_read) {
    showMessage("Total pages cannot be less than the " + book.pages_read + " pages already read.", "error");
    return;
  }

  book.title = title;
  book.author = author;
  book.total_pages = totalPages;
  book.total_chapters = totalChapters;
  book.per_day_goal = goalRaw ? Number(goalRaw) : "";
  book.rating = fieldValue("rating");
  book.notes = fieldValue("notes");

  saveBook(book);

  showMessage("Book updated. Redirecting to the dashboard...", "success");
  setTimeout(function () {
    window.location.href = "index.html";
  }, 1000);
});

// Only fill the form when a book was found.
if (book) fillForm();
