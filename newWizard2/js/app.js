
const form = document.querySelector('#add-cafe-form');



// saving data
form.addEventListener('submit', (e) => {
    e.preventDefault();
    db.collection('lokale').add({
        lokalName: form.name.value,
        lokalPunkte: form.punkte.value
    });
    form.name.value = '';
    form.punkte.value = '';
});

