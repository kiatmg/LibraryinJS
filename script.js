document.addEventListener("DOMContentLoaded", () => {
  let books = [];

  function Book(title, author, pages, isRead) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isRead = isRead;
  }

  function addBookToLibrary(book) {
    books.push(book);
    renderBooks();
  }

  function renderBooks() {
    const grid = document.getElementById("book-grid");
    grid.innerHTML = "";

    books.forEach((book, index) => {
      const card = document.createElement("div");
      card.className = "book-card";

      card.innerHTML = `
        <h3>${book.title}</h3>
        <p>✍ نویسنده: ${book.author}</p>
        <p>📄 صفحات: ${book.pages}</p>
        <p>${book.isRead ? "✅ خوانده شده" : "❌ خوانده نشده"}</p>
        <button class="delete-btn" data-index="${index}">🗑 حذف</button>
      `;

      grid.appendChild(card);
    });

    document.querySelectorAll(".delete-btn").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        const idx = e.target.dataset.index;
        books.splice(idx, 1);
        renderBooks();
      });
    });
  }

  document.getElementById("book-form").addEventListener("submit", function (e) {
    e.preventDefault();

    const title = document.getElementById("title").value.trim();
    const author = document.getElementById("author").value.trim();
    const pages = parseInt(document.getElementById("pages").value);
    const isRead = document.getElementById("isRead").checked;

    if (title && author && !isNaN(pages)) {
      const newBook = new Book(title, author, pages, isRead);
      addBookToLibrary(newBook);
      this.reset();
    }
  });
});
