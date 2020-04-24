const name = document.getElementById('name');
const button = document.getElementById('babyMaker');
const family = document.querySelector('.family');
let generations;

name.addEventListener('focus', (e) => e.target.value = '');

button.addEventListener('click', getItOn);

function getItOn() {

    const person = new FamilyTree(name.value);
    let newDivs = document.querySelectorAll('.new');
    let numNewDivs = newDivs.length;

    if (numNewDivs === 0) {
        const h2 = document.createElement('h2');
        const div = document.createElement('div');
        div.appendChild(h2);
        div.classList.add('new', 'active');
        family.appendChild(div);
        h2.textContent = person.value;

    }
    if (numNewDivs === 1) {
        const active = document.querySelector('.active');
        const h2 = document.createElement('h2');
        const div = document.createElement('div');
        div.appendChild(h2);
        div.classList.add('new');
        family.appendChild(div);
        h2.textContent = person.value;
    }
    if (numNewDivs > 1) {

        const arrayOfNewDivs = [...newDivs]; // so I can use array methods
        const divToAppend = arrayOfNewDivs.findIndex(div => div.classList.contains('active'));

        if (divToAppend === numNewDivs - 1) {
            const h2 = document.createElement('h2');
            const div = document.createElement('div');
            div.appendChild(h2);
            h2.textContent = person.value;
            div.classList.add('new');
            arrayOfNewDivs[divToAppend].insertAdjacentElement('afterend', div);
        } else {
            const h2 = document.createElement('h2');
            h2.textContent = person.value;
            arrayOfNewDivs[divToAppend + 1].appendChild(h2);
        }



    }

    newDivs = document.querySelectorAll('.new');
    newDivs.forEach(div => {
        div.removeEventListener('click', activate);
        div.addEventListener('click', activate);
    })

}

function activate() {
    const active = document.querySelectorAll('.active');
    active.forEach(element => element.classList.remove('active'))
    this.classList.add('active');
}



