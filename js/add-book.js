// Add Book page: validate the form and save a new book.

var form = document.getElementById("bookForm");

// Read the trimmed value of one form field.
function fieldValue(id) {
  return document.getElementById(id).value.trim();
}

// Handle the submit: validate, save, then go back to the dashboard.
form.addEventListener("submit", function (event) {
  event.preventDefault();

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

  var book = {
    bookid: Date.now(),
    title: title,
    author: author,
    total_pages: totalPages,
    total_chapters: totalChapters,
    pages_read: 0,
    chapters_read: 0,
    rating: "",
    notes: fieldValue("notes"),
    per_day_goal: goalRaw ? Number(goalRaw) : ""
  };

  var books = getBooks();
  books.push(book);
  saveBooks(books);

  showMessage("Book added. Redirecting to the dashboard...", "success");
  setTimeout(function () {
    window.location.href = "index.html";
  }, 1000);
});
