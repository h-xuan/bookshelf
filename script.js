
let myLibrary = [];
const grid = document.querySelector('#grid-container');

// book constructor

function Book(genre, title, author, status){
	this.genre = genre;
	this.title = title;
	this.author = author;
	this.status = status;
	// dont do this, function will be duplicated each time an obj is created
	// this.info = function() {
	// 	return this.title + ", " + this.author + ", " + this.pages + ", " + this.read;
	// };	
};

// display in html 
Book.prototype.displayBook = function(e) {
	// create elements
	const box = document.createElement('div');
	box.classList.add('box');

	const closebutt = document.createElement('div');
	closebutt.classList.add('close');
	addCloseFunction(closebutt);

	const bookGenre = document.createElement('h1');
	const bookTitle = document.createElement('h3');
	const bookAuthor = document.createElement('p');
	const bookStatus = document.createElement('div');
	bookStatus.classList.add('status-box');

	const editbutt = document.createElement('div');
	editbutt.classList.add('fas', 'fa-pen','edit-button');

	const ball1 = document.createElement('span');
	const ball2 = document.createElement('span');
	const ball3 = document.createElement('span');
	ball1.classList.add('dot');
	ball2.classList.add('dot');
	ball3.classList.add('dot');


	// add content
	bookTitle.textContent = this.title;
	bookAuthor.textContent = this.author;

	switch(this.genre) {
		case 'mystery':
			bookGenre.textContent = '🕵️‍♂️';
			break;
		case 'romance':
			bookGenre.textContent = '💖';
			break;
		case 'fantasy':
			bookGenre.textContent = '🐲';
			break;
		case 'horror':
			bookGenre.textContent = '👻';
			break;
		case 'non-fiction':
			bookGenre.textContent = '🧠';
			break;
		case 'others':
			bookGenre.textContent = '📖';
		default:
			break;
	}

	switch(this.status) {
		case 'unread':
			ball1.classList.add('red');
			break;
		case 'reading':
			ball2.classList.add('yellow');
			break;
		case 'read':
			ball3.classList.add('green');
		default:
			break;
	}

	// append children
	bookStatus.appendChild(ball1);
	bookStatus.appendChild(ball2);
	bookStatus.appendChild(ball3);
	bookStatus.appendChild(editbutt);

	box.appendChild(closebutt);
	box.appendChild(bookGenre);
	box.appendChild(bookTitle);
	box.appendChild(bookAuthor);
	box.appendChild(bookStatus);
	grid.insertBefore(box, grid.childNodes[0]);

};



//// flip add-book card ////
let flipped = false;
const addbutt = document.querySelector('#add-button');
const addsign = document.querySelector('#add-sign');
const flipbutt = document.querySelector('#flip-button');
addsign.addEventListener('click', function(){
	console.log('addbutt clicked', flipped);
	if (!flipped) {
		addbutt.classList.toggle('is-flipped');
		flipped = true;
		console.log('running if');
	}
});
flipbutt.addEventListener('click', function(){
	// addbutt.classList.remove('is-flipped');
	if (flipped)
	{
		addbutt.classList.toggle('is-flipped');
		flipped = false;
	}
	
});


////// add book //////
const addForm = document.forms['add-form'];
addForm.addEventListener('submit', function(e){
	e.preventDefault();
	const genre = document.getElementById("genre").value;
	const title = addForm.querySelector('input[name="title"]').value;
	const author = addForm.querySelector('input[name="author"]').value;
	const status = document.getElementById("status").value;
	
	const book = new Book(genre, title, author, status);
	myLibrary.unshift(book);
	book.displayBook();
	addbutt.classList.toggle('is-flipped');
	flipped = false;
	window.scrollTo(0,0);
});



//// remove book with close button ////
function addCloseFunction(button) {
	button.addEventListener('click', function(){
		closebuttons = document.querySelectorAll('#grid-container .box .close');
		
		idx = Array.prototype.indexOf.call(closebuttons, button);
		console.log(idx);
		if (idx > -1) {
		  myLibrary.splice(idx, 1);
		  grid.removeChild(grid.childNodes[idx]);
		}
	});
};

/// required fields ///
document.addEventListener('invalid', (function () {
    return function (e) {
        e.preventDefault();
		var list = addForm.querySelectorAll(':invalid');
		for (var item of list) {
			item.setAttribute("style", "border-bottom: 2px solid #ff7c5c");
		};
	};
})(), true);