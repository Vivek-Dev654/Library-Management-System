// Default Books

let books = JSON.parse(localStorage.getItem("libraryBooks")) || [

    {
        id: 1,
        name: "JavaScript Basics",
        author: "John Smith",
        category: "Programming",
        status: "Available"
    },

    {
        id: 2,
        name: "Python Programming",
        author: "Mark Lee",
        category: "Programming",
        status: "Available"
    },

    {
        id: 3,
        name: "Database Management",
        author: "Robert Brown",
        category: "Database",
        status: "Issued"
    },

    {
        id: 4,
        name: "Mathematics for BCA",
        author: "Amit Kumar",
        category: "Mathematics",
        status: "Available"
    }

];


// HTML Elements

const bookTable = document.getElementById("bookTable");

const totalBooks = document.getElementById("totalBooks");

const availableBooks = document.getElementById("availableBooks");

const issuedBooks = document.getElementById("issuedBooks");

const bookForm = document.getElementById("bookForm");

const searchInput = document.getElementById("searchInput");

const themeBtn = document.getElementById("themeBtn");


// Display Books

function displayBooks(bookList = books) {

    bookTable.innerHTML = "";

    if (bookList.length === 0) {

        bookTable.innerHTML = `
            <tr>
                <td colspan="6" style="text-align:center;">
                    No books found
                </td>
            </tr>
        `;

        return;
    }


    bookList.forEach(function(book) {

        let row = document.createElement("tr");

        row.innerHTML = `

            <td>${book.id}</td>

            <td>${book.name}</td>

            <td>${book.author}</td>

            <td>${book.category}</td>

            <td>
                <span class="status ${book.status.toLowerCase()}">
                    ${book.status}
                </span>
            </td>

            <td>

                ${
                    book.status === "Available"

                    ?

                    `<button
                        class="action-btn issue-btn"
                        onclick="issueBook(${book.id})">
                        Issue
                    </button>`

                    :

                    `<button
                        class="action-btn return-btn"
                        onclick="returnBook(${book.id})">
                        Return
                    </button>`
                }


                <button
                    class="action-btn delete-btn"
                    onclick="deleteBook(${book.id})">
                    Delete
                </button>

            </td>
        `;


        bookTable.appendChild(row);

    });

}


// Update Dashboard

function updateDashboard() {

    totalBooks.textContent = books.length;


    let available = books.filter(function(book) {

        return book.status === "Available";

    }).length;


    let issued = books.filter(function(book) {

        return book.status === "Issued";

    }).length;


    availableBooks.textContent = available;

    issuedBooks.textContent = issued;

}


// Add Book

bookForm.addEventListener("submit", function(event) {

    event.preventDefault();


    let name = document.getElementById("bookName").value;

    let author = document.getElementById("author").value;

    let category = document.getElementById("category").value;


    let newBook = {

        id: books.length > 0
            ? books[books.length - 1].id + 1
            : 1,

        name: name,

        author: author,

        category: category,

        status: "Available"

    };


    books.push(newBook);


    saveBooks();

    displayBooks();

    updateDashboard();


    bookForm.reset();


    alert("Book added successfully! 📚");

});


// Issue Book

function issueBook(id) {

    books.forEach(function(book) {

        if (book.id === id) {

            book.status = "Issued";

        }

    });


    saveBooks();

    displayBooks();

    updateDashboard();

}


// Return Book

function returnBook(id) {

    books.forEach(function(book) {

        if (book.id === id) {

            book.status = "Available";

        }

    });


    saveBooks();

    displayBooks();

    updateDashboard();

}


// Delete Book

function deleteBook(id) {

    let confirmDelete = confirm(
        "Are you sure you want to delete this book?"
    );


    if (confirmDelete) {

        books = books.filter(function(book) {

            return book.id !== id;

        });


        saveBooks();

        displayBooks();

        updateDashboard();

    }

}


// Search Book

searchInput.addEventListener("input", function() {

    let searchText = searchInput.value.toLowerCase();


    let filteredBooks = books.filter(function(book) {

        return (

            book.name.toLowerCase().includes(searchText)

            ||

            book.author.toLowerCase().includes(searchText)

            ||

            book.category.toLowerCase().includes(searchText)

        );

    });


    displayBooks(filteredBooks);

});


// Save Books

function saveBooks() {

    localStorage.setItem(
        "libraryBooks",
        JSON.stringify(books)
    );

}


// Dark / Light Mode

themeBtn.addEventListener("click", function() {

    document.body.classList.toggle("dark");


    if (document.body.classList.contains("dark")) {

        themeBtn.textContent = "☀️ Light Mode";

    } else {

        themeBtn.textContent = "🌙 Dark Mode";

    }

});


// Initial Display

displayBooks();

updateDashboard();