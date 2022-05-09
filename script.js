let title = document.getElementById('title');
let textArea = document.getElementById('textArea');
let addBtn = document.getElementById('addBtn');
let container = document.getElementById('containerCard');
let allNotes = [];


class AddNote {
    constructor(title, note, date) {
        this.title = title;
        this.note = note;
        this.date = date;
    }
}


let note = new AddNote("my Note", 'this is note');

addBtn.addEventListener('click', function () {
    let localeNotes = localStorage.getItem('note');
    if (localeNotes == null) {
        allNotes = [];
    } else {
        allNotes = JSON.parse(localStorage.getItem('note'));
    }
    if (title.value != '' && textArea.value != '') {
        let date = new Date();
        note = new AddNote(title.value, textArea.value, date.toDateString());
        title.value = '';
        textArea.value = '';
        allNotes.push(note);
        localStorage.setItem('note', JSON.stringify(allNotes));
        showNotes();
    }


})

function showNotes() {
    let localeNotes = localStorage.getItem('note');
    if (localeNotes == null) {
        allNotes = [];
    } else {
        allNotes = JSON.parse(localStorage.getItem('note'));
    }
    let content = '';
    console.log(allNotes)
    allNotes.forEach((element, index) => {

        content += `<div class="noteCard card mx-lg-3 my-lg-3 mx-sm-1 my-sm-2" style="width: 18rem;">
        <div class="card-body">
        <h5 class="card-title">${element.title}  </h5>
        <p class="card-text content">${element.note}</p>
        <button class="btn btn-primary del" onclick='delNote(this.id)'  id="${index}">Delete</button>
        <p class="my-3 fs-6 fw-lighter">${element.date}</p>
        </div>
        </div>`;

    })
    container.innerHTML = content;
}
showNotes();


function delNote(index) {
    let localeNotes = localStorage.getItem('note');
    if (localeNotes == null) {
        allNotes = [];
    } else {
        allNotes = JSON.parse(localStorage.getItem('note'));
    }
    allNotes.splice(index, 1);
    localStorage.setItem('note', JSON.stringify(allNotes));
    showNotes();
}

let search = document.getElementById('searchText');

search.addEventListener("input", function(){

    let inputVal = search.value.toLowerCase();
    // console.log('Input event fired!', inputVal);
    let noteCards = document.getElementsByClassName('noteCard');
    Array.from(noteCards).forEach(function(element){
        let cardText = element.getElementsByTagName("p")[0].innerText;
        let titleText = element.getElementsByTagName("h5")[0].innerText;
        if(cardText.includes(inputVal) || titleText.includes(inputVal)){
            element.style.display = "block";
        }
        else{
            element.style.display = "none";
        }
        // console.log(cardTxt);
    })
})