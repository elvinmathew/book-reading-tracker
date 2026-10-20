// Dashboard page: list all books, filter them and delete on request.

var bookList = document.getElementById("bookList");
var emptyState = document.getElementById("emptyState");
var filterSelect = document.getElementById("filter");

// Work out the filter status of a book.
function getStatus(book) {
  if (book.pages_read <= 0) return "not-started";
  if (book.pages_read >= book.total_pages) return "completed";
  return "reading";
}

// Ask for confirmation, then delete the book and its reading logs.
function confirmDelete(bookid) {
  var book = findBook(bookid);
  var name = book ? book.title : "this book";
  var ok = window.confirm("Delete \"" + name + "\" and all of its reading logs?");
  if (!ok) return;
  deleteBook(bookid);
  showMessage("Book deleted.", "success");
  renderBooks();
}

// Build the card for one book with its actions.
function createBookCard(book) {
  var card = el("article", "book-card");

  card.appendChild(el("h2", "book-title", book.title));
  card.appendChild(el("p", "book-meta", book.author));

  var stats = el("div", "book-stats");
  stats.appendChild(el("span", "", book.pages_read + " / " + book.total_pages + " pages"));
  stats.appendChild(el("span", "rating", formatRating(book.rating)));
  card.appendChild(stats);

  card.appendChild(createProgressBar(book.pages_read, book.total_pages));

  var actions = el("div", "book-actions");

  var editBtn = el("a", "btn", "Edit");
  editBtn.href = "edit-book.html?id=" + book.bookid;
  actions.appendChild(editBtn);

  var progressBtn = el("a", "btn", "Update Progress");
  progressBtn.href = "progress.html?id=" + book.bookid;
  actions.appendChild(progressBtn);

  var deleteBtn = el("button", "btn btn-danger", "Delete");
  deleteBtn.type = "button";
  deleteBtn.addEventListener("click", function () {
    confirmDelete(book.bookid);
  });
  actions.appendChild(deleteBtn);

  card.appendChild(actions);
  return card;
}

// Draw the books that match the selected filter.
function renderBooks() {
  var books = getBooks();
  var filter = filterSelect.value;

  bookList.innerHTML = "";
  emptyState.hidden = books.length !== 0;

  var visible = books.filter(function (book) {
    return filter === "all" || getStatus(book) === filter;
  });

  visible.forEach(function (book) {
    bookList.appendChild(createBookCard(book));
  });

  if (books.length > 0 && visible.length === 0) {
    bookList.appendChild(el("p", "book-meta", "No books match this filter."));
  }
}

// Redraw the list whenever the filter changes.
filterSelect.addEventListener("change", renderBooks);

// Draw the list as soon as the page loads.
renderBooks();
