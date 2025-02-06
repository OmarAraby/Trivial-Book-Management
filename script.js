/***
 * 1. Make a function constructor to create a book object every book should
have (name, price, author) properties.
2.  the author is a function constructor too that has (name and email property).
 */


function Book(_name,_price,_author){
    this.name=_name;
    this.price=_price;
    this.author=_author;
}

function Author(_name,_email) {
    this.name=_name;
    this.email=_email;  
}

var arrBooks=[]

//Create an array of books objects and fill its data from the user throw a validated form.
var countInput = document.getElementById("bookNo");
var submitCount = document.getElementById("btnCount")

var countSec=document.getElementById('bookLib');
var formSec = document.getElementById('bookForm');
var tableSec = document.querySelector(".book-table")

var addBtn = document.querySelector("form");

var bName=document.getElementById('bookName');
var price = document.getElementById('bookPrice');
var authName =document.getElementById('authorName');
var authEmail= document.getElementById('authorEmail');


var tbody = document.getElementById("tbody");



// console.log(countInput);
// console.log(submitCount);

submitCount.addEventListener("click",function(){
    // console.log(countInput.value);

    var bookCount = Number(countInput.value);
    console.log(bookCount);
    if (bookCount>0) {
        countSec.classList.add('hidden');
        formSec.classList.add('show');
        // tableSec.classList.add("show");

    } 
    
})

addBtn.addEventListener("submit",function(e){
    e.preventDefault();
    console.log(authEmail.value,authName.value,bName.value,price.value);
    
    var author = new Author(authName.value, authEmail.value)
    var book = new Book(bName.value,price.value, author);
    arrBooks.push(book);

    console.log(arrBooks);
    insertData();
    clearForm();

    if (arrBooks.length>=Number(countInput.value)) {
        formSec.classList.remove("show");
    }
    tableSec.classList.add("show");


    

})



function insertData() {

    tbody.innerHTML ="";

    arrBooks.forEach(function(book,i){
        var row =tbody.insertRow();
        row.innerHTML=`
        <td>${book.name}</td>
        <td>${book.price}</td>
        <td>${book.author.name}</td>
        <td>${book.author.email}</td>
        <td class="action-buttons">
            <button onclick="editBook(${i})">Edit</button>
            <button onclick="deleteBook(${i})">Delete</button>
        </td>
        `
        
    });
   
}


function clearForm() {
    bName.value = '';
    price.value = '';
    authName.value = '';
    authEmail.value = '';
}




function deleteBook(index) {
    arrBooks.splice(index, 1);
    insertData();  // update table display
    if (arrBooks.length === 0) {
        tableSec.classList.remove("show");
        countSec.classList.remove('hidden');

    }
}




function editBook(index) {
    var rowIndx = tbody.rows[index];
    var editedBook = arrBooks[index];

    rowIndx.innerHTML = `
        <td><form><input class="edit-name" type="text" value="${editedBook.name}" pattern="[A-Za-z\s]{3,20}"  title="Only letters are allowed, and at least 3 characters are required" placeholder="Enter Book Name" required></form></td>
        <td><input class="edit-price" type="number" value="${editedBook.price}" min="1" max="2000" required></td>
        <td><input class="edit-author-name" type="text" value="${editedBook.author.name}" pattern="[A-Za-z\s]{3,20}" placeholder="Enter Auther Name" title="Only letters are allowed, and at least 3 characters are required" required></td>
        <td><input class="edit-author-email" type="email" value="${editedBook.author.email}" pattern="^[\w.-]+@([\w-]+\.)+[\w-]{2,}$" placeholder="Enter Author E-mail : example@example.com " required></td>
        <td class="action-buttons">
            <button onclick="saveEdit(${index})">Save</button>
            <button onclick="cancelEdit()">Cancel</button>
        </td>
    `;
}

function saveEdit(index) {
    var rowIndx = tbody.rows[index];

    
    var updatedName = rowIndx.querySelector('.edit-name').value;
    var updatedPrice = parseFloat(rowIndx.querySelector('.edit-price').value);
    var updatedAuthorName = rowIndx.querySelector('.edit-author-name').value;
    var updatedAuthorEmail = rowIndx.querySelector('.edit-author-email').value;


    var updatedAuthor = new Author(updatedAuthorName, updatedAuthorEmail);
    var updatedBook = new Book(updatedName, updatedPrice, updatedAuthor);

    // Update the book in the array
    arrBooks[index] = updatedBook;

    insertData();
}


function cancelEdit() {
    insertData();
}