//////////// Light-Dark Mode ///////////////

// Toggle button i meny
const toggleBtn = document.querySelector('#toggleBtn');
// console.log(toggleBtn);
const bodyRef = document.querySelector('body');
// console.log(bodyRef);

const darkModeKey = 'theme-dark';
const darkModeValue = 'active';

// Kontrollera att det finns något i localStorage
if(localStorage.getItem(darkModeKey) === darkModeValue){
    // Om detta är sant så är localstorage satt och darkmode ska läggas till på body

    enableDarkMode();
}

// Lyssnare som lyssnar efter klick på toggleBtn
toggleBtn.addEventListener('click' , () => {
    // console.log('Du klickade på toggle');

    toggleDarkMode();
});

function toggleDarkMode(){
    // Kontrollera om body har klassen dark
    // console.log('Nu körs toggle darkmode');

    if(bodyRef.classList.contains('dark')){
        // Om body har klassen dark
        // console.log('Klassen dark finns');
        disabledDarkMode();
    }else{
        console.log('Klassen dark finns inte');
        // Om klassen inte finns så vill vi lägga till klassen
        enableDarkMode();
    }
}

function enableDarkMode(){
    // Funktion för att aktivera dark klass
    // console.log('enabledDarkMode körs');

    // För att checkruta alltid ska vara ikryssad
    toggleBtn.checked = true;

    // Lägga till dark på body
    bodyRef.classList.add('dark');

    // Sätta localstorage
    setLocalStorage();

    // console.log(bodyRef.classList);
}

function disabledDarkMode(){
    // Funktion för att ta bort klassen dark
    // console.log('disabledDarkMode körs');

    // Ta bort klassen dark
    bodyRef.classList.remove('dark');

    // Funktion för att ta bort localstorage
    removeLocalStorage();
}

function setLocalStorage(){
    // Funktion för att sätta localstorage
    // console.log('Sätt localstorage körs');

    // Sätter localstorage med en key och value
    localStorage.setItem(darkModeKey, darkModeValue);
}

function removeLocalStorage(){
    // Funktion för att ta bort localstorage
    // console.log('removeLocalStorage körs');

    // Ta bort satt localstorage
    localStorage.removeItem(darkModeKey);
}


//////////// Formulär Btn //////////////

// [X] Hämta in antalet tecket som user skrivit i input
// [X] Kontrollera så att user har skrivit 3 tecken
// [X] Är villkoret uppfyllt ska btn bli enabled
// [X] När vi klickar i input ska focuslyssnare läggas på
// [X] När vi klickar utanför input ska blurlyssnare läggas på
// [X] När vi klickar på btn ska input rensas
// [X] Kontrollera när vi klickar på btn om det finns något i input och om det inte gör det ska btn bli disabled

// Namnet som skrivs in i input-fält
const spaceName = document.querySelector('#spaceName');
// console.log(spaceName);

// Button
const sendBtn = document.querySelector('#sendBtn');
// console.log(sendBtn);

// Lyssnare som lyssnar efter när user släpper upp en key (tangent)
spaceName.addEventListener('keyup', () => {
    // Vad ska hända när user släpper upp en key
    // console.log('Du skrev något i input');

    // Hämta värdet i input
    // console.log(spaceName.value);

    // Hämta längden på värdet i input
    // console.log(spaceName.value.length);

    // Längden på värdet i input-fält
    let getValueLength = spaceName.value.length;

    // Kontrollera så att user skrivit 3 tecken
    
    // Villkoret om getValuelength är större än 2
    if(getValueLength > 2){
        // Om antalet tecken är större än 2
        // console.log('Det är mer än 2 tecken');

        // Btn ska bli enabled
        sendBtn.disabled = false;
    }else{
        // Om antalet tecken är mindre än 2
        // console.log('Det är mindre än 2 tecken');

        // Btn ska bli disabled
        sendBtn.disabled = true;
    }
});

// Lyssnare som lyssnar efter när input är i fokus
spaceName.addEventListener('focus', () => {
    // Vad ska hända när input är i fokus
    // console.log('Du står i input');

    // Lägga till klassen focusBorder
    spaceName.classList.toggle('focusBorder');

});

// Lyssnare som lyssnar efter när user klickar utanför input
spaceName.addEventListener('blur', () => {
    // Vad ska hända när input är i fokus
    // console.log('Du står utanför input');

    // Lägga till klassen focusBorder
    spaceName.classList.toggle('focusBorder');

});

// Lyssnare som lyssnar efter klick på btn
sendBtn.addEventListener('click' , (event) => {
    // Vad ska hända vid klick
    // Avbryta btns default beteende
    event.preventDefault();
    // console.log('Du klickade på sendBtn');

    // Det som skrivs in i input skrivs in i h2
    headingName.textContent = spaceName.value;

    // Detta rensar input
    spaceName.value = '';

    // Kontrollera om spaceName är tomt och sätt btn till disabled
    if(spaceName.value === ''){
        // Om det är tomt
        // console.log('Det är tomt i input');

        // Btn ska bli disabled
        sendBtn.disabled = true;
    }
});

////// Ändra Name //////
const headingName = document.querySelector('#headingName');
// console.log(headingName);

/////// API ////////
// API-NYCKEL KqqV5ztqfqJ2eyvzbKFpksYEhX0yuRNHzs4rQIQk
const apiUrl = 'https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?earth_date=2015-6-3&api_key=KqqV5ztqfqJ2eyvzbKFpksYEhX0yuRNHzs4rQIQk';


// [X] Hämta in data från API
// [X] Fånga upp om det blir något fel i fetch
// [X] Kontrollera om det finns någon data
// [X] Om det inte finns data så vill vi göra en console.log och det ska synas för användaren
// [X] Om det finns data, då vill vi loopa igenom datan och anropa en funktion som skapar upp ett nytt kort
// [X] När vi skapat upp ett nytt kort, ska detta skickas tillbaka och läggas till i DOM

// För att hämta data
fetch (apiUrl)
    // Gör om till json
    .then(response => response.json())
    // Vad jag ska göra med datan
    .then(data => {
        // console.log(data.photos);

        //console.log(data);

        // Slice för att endast ta de första 4 objekten i arrayen
        // const marsRovers = data.photos.slice(0, 4);
        // Variable till min uppskapade main med klassen main-content
        const mainContent = document.querySelector('.main-content');

        const images = data.photos;

        console.log(data.photos);

        // Kontrollerar om arrayen innehåller något
        if(images.length !== 0){
            console.log('Det finns data');

            //Loop för att loopa igenom data
            // marsRovers.forEach(marsRover => {
            //     // För varje item i array
            //     // console.log(marsRover);

            //     // Anropar funktion som skapar upp ett nytt kort
            //     // Det som står innanför paranteserna skickas med in i funktionen, samt skapar en variabel som heter newCard
            //     const newCard = createCard(marsRover);

            //     // Lägger till det nya kortet i main-content
            //     mainContent.append(newCard);

            //});
            // Bara de första 4 items
            for (let index = 0; index < 4; index++) {
                const element = images[index];
                //console.log(element);

                // Anropar funktion som skapar upp ett nytt kort
                // Det som står innanför paranteserna skickas med in i funktionen, samt skapar en variabel som heter newCard
                const newCard = createCard(element);

                // Lägger till det nya kortet i main-content
                mainContent.append(newCard);
                
            }
        }else{
            // Om det inte finns data, ska detta visas för användaren
            console.log('Det finns ingen data');
            mainContent.innerHTML = '<p>Det finns tyvärr inga bilder att visa.</p>';
        }

    // Fångar upp om det blir något fel i fetch
    }).catch(error => console.log(`Detta är felet: ${error}`));

    // Funktion som skapar upp ett nytt kort
    // Innanför paranteserna skickar vi in datan som kommer från createCard anropet
    function createCard(marsRover){
        // Här är det som ska ske för att skapa ett nytt kort
        // console.log('createCard körs');
        // console.log(marsRover);

        // Skapa upp nya HTML element
        const card = document.createElement('article');
        const cardImg = document.createElement('figure');
        const cardText = document.createElement('div');
        const h3 = document.createElement('h3');
        const h4 = document.createElement('h4');
        const roverImg = document.createElement('img');

        // Lägga till klass på element
        card.classList.add('card');
        cardImg.classList.add('card-img');
        cardText.classList.add('card-text');
        roverImg.classList.add('rover-img');

        // Lägga till text
        h3.textContent = marsRover.rover.name;
        h4.textContent = marsRover.earth_date;

        // Sätta src på roverImg
        roverImg.setAttribute('src', `${marsRover.img_src}`);

        // Lägger till element i element
        card.append(cardImg, cardText);
        cardText.append(h3, h4);
        cardImg.append(roverImg);

        // console.log(card);

        // Skicka tillbaka det nya kortet till loopen
        return card;
    }



