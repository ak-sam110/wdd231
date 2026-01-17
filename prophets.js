const url = 'https://byui-cse.github.io/cse-ww-program/data/latter-day-prophets.json';
const cards = document.querySelector('#cards');
const displayProphets = (prophets) => {
    prophets.forEach((prophet) => {
        //create elements to add to the div.cards element
        let card = document.createElement('section');
        let fullName = document.createElement('___') //fill in the blank
        let portrait = document.createElement('img');

        //Build the h2 content out to show the prophet's full name
        fullName.textContent = '${prophet.______} __________'; // fill in the blank
        // Build the image portrait by setting all the relevant attributes
        portrait.setAttribute('src', prophet.imageurl);
        portrait.setAttribute('alt', 'portrait of ${prophet._______}_______________'); // fill in the blank
        portrait.setAttribute('loading', 'lazy');
        portrait.setAttribute('width', '340');
        portrait.setAttribute('height', '440'); 

        // Apend the section (card) with the created element 
        card.appendChild(_________); //fill in the blank
        card.appendChild(portrait);

        cards.appendChild(card);
    });// end of the arrow function and forEach loop
    
}
async function getProphetData() {
    const response = await fetch(url);
    const data = await response.json();
    //console.table(data.prophets);
    displayProphets(data.prophets);
}

getProphetData();

