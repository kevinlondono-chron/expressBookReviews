const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const axios = require('axios');
const public_users = express.Router();

const doesExist = (username)=>{
    let userswithsamename = users.filter((user)=>{
      return user.username === username
    });
    if(userswithsamename.length > 0){
      return true;
    } else {
      return false;
    }
}

public_users.post("/register", (req,res) => {
    const username = req.body.username;
    const password = req.body.password;
    if (username && password) {
      if (!doesExist(username)) {
        users.push({"username":username,"password":password});
        return res.status(200).json({message: "User successfully registred. Now you can login"});
      } else {
        return res.status(404).json({message: "User already exists!"});
      }
    }
    return res.status(404).json({message: "Unable to register user."});
});

// AXIOS: Get the book list available in the shop 
const getBooks = (url)=>{
    const req = axios.get(url);
    req.then(resp => {
        let listOfEntries = JSON.stringify(books);
        listOfEntries.forEach((entry)=>{
          console.log(entry);
        });
      })
    .catch(err => {
        console.log(err.toString())
    });
  }
  

// Get the book list available in the shop
public_users.get('/',function (req, res) {
  res.send(JSON.stringify(books));
  return res.status(300).json({message: "Yet to be implemented"});
});

// AXIOS: Get the book details with ISBN 
const getBookDetailsByISBN = (url, isbn)=>{
    const req = axios.get(url, isbn);
    req.then(resp => {
        let listOfEntries = books[isbn];
        listOfEntries.forEach((entry)=>{
          console.log(entry);
        });
      })
    .catch(err => {
        console.log(err.toString())
    });
  }

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  const isbn = req.params.isbn;
  //let filtered_books = books.filter((book) => book.isbn === isbn);
  res.send(books[isbn]);
  return res.status(300).json({message: "Yet to be implemented"});
 });


 // AXIOS: Get the book details with Author 
const getBookDetailsByAuthor = (url, author)=>{
    const req = axios.get(url, author);
    req.then(resp => {
        var thebooks = [];
        for(var i in books)
            thebooks.push(books[i]);
        let listOfEntries = thebooks.filter((book) => book.author === author);
        listOfEntries.forEach((entry)=>{
          console.log(entry);
        });
      })
    .catch(err => {
        console.log(err.toString())
    });
  }
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
  const author = req.params.author;
  var thebooks = [];
  for(var i in books)
    thebooks.push(books[i]);
  let filtered_books = thebooks.filter((book) => book.author === author);
  res.send(filtered_books);
  return res.status(300).json({message: "Yet to be implemented"});
});


 // AXIOS: Get the book details with Title 
 const getBookDetailsByTitle = (url, title)=>{
    const req = axios.get(url, title);
    req.then(resp => {
        var thebooks = [];
        for(var i in books)
            thebooks.push(books[i]);
        let listOfEntries = thebooks.filter((book) => book.title === title);
        listOfEntries.forEach((entry)=>{
          console.log(entry);
        });
      })
    .catch(err => {
        console.log(err.toString())
    });
  }

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
    const title = req.params.title;
    var thebooks = [];
    for(var i in books)
        thebooks.push(books[i]);
    let filtered_books = thebooks.filter((book) => book.title === title);
    res.send(filtered_books);
    return res.status(300).json({message: "Yet to be implemented"});
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  const isbn = req.params.isbn;
  var reviews = [];
  for(var i in books) {
    reviews.push(books[i].review);
    break;
  }
  //let filtered_books = thebooks.filter((book) => book.title === title);
  res.send(reviews);
  return res.status(300).json({message: "Yet to be implemented"});
});

module.exports.general = public_users;
