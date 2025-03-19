/*****************************************************************************
 * Challenge 2: Review the provided code. The provided code includes:
 * -> Statements that import data from games.js
 * -> A function that deletes all child elements from a parent element in the DOM
*/

// import the JSON data about the crowd funded games from the games.js file
import GAMES_DATA from './games.js';

// create a list of objects to store the data about the games using JSON.parse
const GAMES_JSON = JSON.parse(GAMES_DATA);
console.log(GAMES_JSON);

// remove all child elements from a parent element in the DOM
function deleteChildElements(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

/*****************************************************************************
 * Challenge 3: Add data about each game as a card to the games-container
 * Skills used: DOM manipulation, for loops, template literals, functions
*/

// grab the element with the id games-container
const gamesContainer = document.getElementById("games-container");

// create a function that adds all data from the games array to the page
function addGamesToPage(games, container) {

    // loop over each item in the data
    for (let i = 0; i < games.length; i++){
        const game = games[i];
        // create a new div element, which will become the game card
        // about each game
        const gameDiv = document.createElement("div");
        // add the class game-card to the list
        gameDiv.classList.add('game-card');
        // set the inner HTML using a template literal to display some info 
        gameDiv.innerHTML = `<img class='game-img' src=${game["img"]}></img>
                             <h3>Name: ${game["name"]} </h3>
                             <p>Backers: ${game["backers"]} </p>
                             <p>Pledged: ${game["pledged"]} </p>`;
        // append the game to the games-container
        container.append(gameDiv);
    };
        
        // TIP: if your images are not displaying, make sure there is space
        // between the end of the src attribute and the end of the tag ("/>")


        

}
addGamesToPage(GAMES_JSON, gamesContainer);

// call the function we just defined using the correct variable
// later, we'll call this function using a different list of games


/*************************************************************************************
 * Challenge 4: Create the summary statistics at the top of the page displaying the
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: arrow functions, reduce, template literals
*/

// grab the contributions card element
const contributionsCard = document.getElementById("num-contributions");
contributionsCard.innerHTML =  `<p>${(GAMES_JSON.reduce((acc, game) => {
    return acc + game["backers"];
}, 0)).toLocaleString('en-US')}</p>`;

// use reduce() to count the number of total contributions by summing the backers


// set the inner HTML using a template literal and toLocaleString to get a number with commas


// grab the amount raised card, then use reduce() to find the total amount raised
const raisedCard = document.getElementById("total-raised");
raisedCard.innerHTML =  `<p>$${(GAMES_JSON.reduce((acc, game) => {
    return acc + game["pledged"];
}, 0)).toLocaleString('en-US')}</p>`;

// set inner HTML using template literal


// grab number of games card and set its inner HTML
const gamesCard = document.getElementById("num-games");
gamesCard.innerHTML =  `<p>${GAMES_JSON.length}</p>`;


/*************************************************************************************
 * Challenge 5: Add functions to filter the funded and unfunded games
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: functions, filter
*/

// use filter() to get a list of games that have not yet met their goal
const listOfUnfundedGames = GAMES_JSON.filter( (game) => {return game['pledged'] < game['goal']});

// show only games that do not yet have enough funding
function filterUnfundedOnly() {
    deleteChildElements(gamesContainer);

    // use the function we previously created to add the unfunded games to the DOM
    addGamesToPage(listOfUnfundedGames, gamesContainer);
}

// show only games that are fully funded

// use filter() to get a list of games that have met or exceeded their goal
const listOfFundedGames = GAMES_JSON.filter( (game) => {return game['pledged'] > game['goal']});

function filterFundedOnly() {
    deleteChildElements(gamesContainer);

    // use the function we previously created to add unfunded games to the DOM
    addGamesToPage(listOfFundedGames, gamesContainer);
}

// show all games
function showAllGames() {
    deleteChildElements(gamesContainer);

    // add all games from the JSON data to the DOM
    addGamesToPage(GAMES_JSON, gamesContainer);

}

// select each button in the "Our Games" section
const unfundedBtn = document.getElementById("unfunded-btn");
const fundedBtn = document.getElementById("funded-btn");
const allBtn = document.getElementById("all-btn");

// add event listeners with the correct functions to each button
unfundedBtn.addEventListener("click", filterUnfundedOnly);
fundedBtn.addEventListener("click", filterFundedOnly);
allBtn.addEventListener("click", showAllGames);


/*************************************************************************************
 * Challenge 6: Add more information at the top of the page about the company.
 * Skills used: template literals, ternary operator
*/

// grab the description container
const descriptionContainer = document.getElementById("description-container");

// use filter or reduce to count the number of unfunded games
// create a string that explains the number of unfunded games using the ternary operator
const displayStrFunded = `A total of ${listOfFundedGames.reduce( (acc, game) => {
    return acc + game['pledged'];
}, 0)} has been raised for ${listOfFundedGames.length} funded games.`;
const displayStrUnfunded = `Currently ${listOfUnfundedGames.length} games remain unfunded. We need your help to fund these amazing games!`
const displayStrNoneFunded = 'No games are funded. ' + displayStrUnfunded;

const finalStr = (listOfFundedGames.length > 0) ? displayStrFunded + ' ' + ((listOfUnfundedGames.length > 0) ? displayStrUnfunded : '') : displayStrNoneFunded; 
console.log(finalStr);

// create a new DOM element containing the template string and append it to the description container
const descriptionParagraph = document.createElement('p');
descriptionParagraph.innerHTML = finalStr;
descriptionContainer.append(descriptionParagraph);


/************************************************************************************
 * Challenge 7: Select & display the top 2 games
 * Skills used: spread operator, destructuring, template literals, sort 
 */

const firstGame = document.getElementById('first-game');
const secondGame = document.getElementById('second-game');

//Directly sorts the existing array
GAMES_JSON.sort( (item1, item2) => {
    return item2.pledged - item1.pledged;
});

// use destructuring and the spread operator to grab the first and second games
const [first, second, ...rest] = GAMES_JSON;
console.log(first);

// create a new element to hold the name of the top pledge game, then append it to the correct element

addGamesToPage([first], firstGame);

const firstGameDiv = firstGame.getElementsByClassName('game-card');
if (firstGameDiv[0]){
    while (firstGameDiv[0].childElementCount > 2){
        firstGameDiv[0].removeChild(firstGameDiv[0].lastElementChild);
    }
};

// do the same for the runner up item

addGamesToPage([second], secondGame);

const secondGameDiv = secondGame.getElementsByClassName('game-card');
if (secondGameDiv[0]){
    while (secondGameDiv[0].childElementCount > 2){
        secondGameDiv[0].removeChild(secondGameDiv[0].lastElementChild);
    }
};

//fetch games in a list based on search string
function fetchGamesWithString(s){
    const gameNamesThatContainString = GAMES_JSON.filter( (game) => {
        return game["name"].includes(s);
    })
    //console.log(gameNamesThatContainString)
    return gameNamesThatContainString;
}

//find the search box
const searchBox = document.getElementById("search");

//search event listener
searchBox.addEventListener("input", e => {
    const inputStr = e.target.value;
    const games = fetchGamesWithString(inputStr);
    deleteChildElements(gamesContainer);
    addGamesToPage(games, gamesContainer);
})

