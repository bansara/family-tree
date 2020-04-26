/* 

Check out this code with a UI at:

https://naughty-tesla-40143a.netlify.app/

*/


class FamilyTree {

  constructor(name) {
    if (!name || typeof name !== 'string') {
      throw 'Name Required. Self destruct sequence initiated.';
    }
    this.value = name;
    this.children = [];
  }

  insert(name) {
    const newChild = new FamilyTree(name);
    this.children.push(newChild);
  }

  familySize() {
    return this.children.length + 1;
  }

  findMember(name) {
    return this.children.find(child => child.value === name);
  }

  log() {
    const familyMembers = [];
    populate(this, 1);

    function populate(person, generation) {
      familyMembers.push(`${prefix(generation)} ${person.value}`);
      if (person.familySize() > 1) {
        generation++;
        person.children.forEach(child => {
          populate(child, generation);
        })
      }
    }

    function prefix(generation) {
      let prefix = '';
      for (let i = 1; i <= generation; i++) {
        prefix += '--';
      }
      return prefix;
    }
    return familyMembers.join('\n');
  }

}

module.exports = FamilyTree;
