const cafeList = document.querySelector('#cafe-list');
const form = document.querySelector('#add-cafe-form');

var lokalName = [];
var lokalPunkte = [];

// create element & render cafe
function renderCafe(doc){
    let li = document.createElement('li');
    let name = document.createElement('span');
    let city = document.createElement('span');
    let cross = document.createElement('div');

    li.setAttribute('data-id', doc.id);
    name.textContent = doc.data().lokalName;
    city.textContent = doc.data().lokalPunkte;
    cross.textContent = 'x';

    li.appendChild(name);
    li.appendChild(city);
    li.appendChild(cross);

    cafeList.appendChild(li);

    // deleting data
    cross.addEventListener('click', (e) => {
        e.stopPropagation();
        let id = e.target.parentElement.getAttribute('data-id');
        dbDelete.collection('lokale').doc(id).delete();
    });
}

// saving data
form.addEventListener('submit', (e) => {
    e.preventDefault();
    dbDelete.collection('lokale').add({
        lokalName: form.name.value,
        lokalPunkte: form.punkte.value
    });
    form.name.value = '';
    form.punkte.value = '';
});

// real-time listener
dbDelete.collection('lokale').orderBy('lokalName').onSnapshot(snapshot => {
    let changes = snapshot.docChanges();
    changes.forEach(change => {
        // console.log(change.doc.data());
        if(change.type == 'added'){
            renderCafe(change.doc);
        } else if (change.type == 'removed'){
            let li = cafeList.querySelector('[data-id=' + change.doc.id + ']');
            cafeList.removeChild(li);
        }
    });
});