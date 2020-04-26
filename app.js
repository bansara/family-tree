const name = document.getElementById('name');
const button = document.getElementById('babyMaker');
const family = document.querySelector('.family');
const log = document.getElementById('log');
const tree = document.getElementById('tree');
const title = document.getElementById('title');
const parent = document.getElementById('parent');
let familyList = [];

name.addEventListener('focus', (e) => e.target.value = '');

button.addEventListener('click', getItOn);

function getItOn() {
    if (!name.value) return;
    const person = whosYourDaddy(name.value);
    let newDivs = document.querySelectorAll('.new');
    let numNewDivs = newDivs.length;

    if (numNewDivs === 0) {
        const child = newPerson(person.value);
        const div = document.createElement('div');
        div.appendChild(child);
        div.classList.add('new', 'active');
        child.classList.add('activePerson');
        family.appendChild(div);
        parent.innerText = person.value;
    }
    if (numNewDivs === 1) {
        const child = newPerson(person.value);
        const div = document.createElement('div');
        div.appendChild(child);
        div.classList.add('new');
        family.appendChild(div);
    }
    if (numNewDivs > 1) {
        const arrayOfNewDivs = [...newDivs]; // so I can use array methods on a node list
        const divToAppend = arrayOfNewDivs.findIndex(div => {
            return div.querySelectorAll('.activePerson').length > 0 ? true : false;
        })
        if (divToAppend === numNewDivs - 1) {
            const child = newPerson(person.value);
            const div = document.createElement('div');
            div.appendChild(child);
            div.classList.add('new');
            family.appendChild(div);
        } else {
            const child = newPerson(person.value);
            arrayOfNewDivs[divToAppend + 1].appendChild(child);
        }
    }

    
    
    const children = document.querySelectorAll('.person');
    children.forEach(div => {
        div.removeEventListener('click', activatePerson);
        div.addEventListener('click', activatePerson);
    })
    
    familyList.push(person);
    if(familyList.length){
        log.classList.remove('invisible');
        title.innerText = `${familyList[0].value}'s Family Tree`
        tree.innerText = `${familyList[0].log()}`;
    }
    console.log(familyList);
    name.focus();

}


function activatePerson() {
    const active = document.querySelectorAll('.activePerson');
    active.forEach(element => element.classList.remove('activePerson'))
    this.classList.add('activePerson');
    parent.innerText = this.childNodes[0].innerText;
}

function newPerson(name) {
    const div = document.createElement('div');
    const h2 = document.createElement('h2');
    h2.innerText = name;
    div.appendChild(h2);
    div.classList.add('person');
    div.setAttribute('data-familylist', `${familyList.length}`)
    return div;
}

function whosYourDaddy(name) {
    if (familyList.length === 0) {
        const person = new FamilyTree(name);
        return person;
    } else {
        const daddy = document.querySelector('.activePerson');
        const index = daddy.dataset.familylist;
        familyList[index].insert(name);
        const length = familyList[index].children.length;
        
        return familyList[index].children[length - 1];
    }
}

document.addEventListener('keypress', (e) => {
    if (e.key === "Enter") {
        getItOn();
        name.value = '';
        name.focus();
    }
});
