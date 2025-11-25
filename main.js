
// Readline "import"
const readline = require("readline");
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Fetch "import"
const fetch = require("node-fetch");

// API URLs
const pokeURL = "https://pokeapi.co/api/v2/pokemon/";
const itemURL = "https://pokeapi.co/api/v2/item/";
const moveURL = "https://pokeapi.co/api/v2/move/";

// Displays Pokedex menu options
function showMenu() {
    console.log("1. Search for Pokemon");
    console.log("2. Search for Item");
    console.log("3. Search for Move");
    console.log("4. Quit");
}

// Prompt user for search term
function prompt(cb) {
    rl.question("Enter search term: ", (answer) => {
        cb(answer);
    });
}

// Query API for given Pokemon
async function searchPoke(term) {
    
    // Pokemon API call, print response data
    try {
        const response = await fetch(pokeURL + term);
        const data = await response.json();
        printPoke(data);
    }

    // Catch error in case of term not found, timeout, etc.
    catch (error) {
        console.error(`\nUnable to fetch data for ${term}\n`);
    }

    // Return to user input once above has finished
    run();
}

// Print Pokemon name, weight, height, base experience, and moves
function printPoke(json) {
    
    // Basic data
    console.log(`\n${json.name.toUpperCase()}`);
    console.log("--------------------");
    console.log(`WEIGHT: ${json.weight / 10} kg`);
    console.log(`HEIGHT: ${json.height / 10} m`);
    console.log(`BASE EXP: ${json.base_experience}`);
    
    // Moves
    process.stdout.write("MOVES: ");
    for (let i=0; i < json.moves.length - 1; i++) {
        process.stdout.write(`${json.moves[i].move.name}, `);
    }
    console.log(`${json.moves[json.moves.length - 1].move.name}\n`); // Last move separate to avoid extra comma
}

// Query API for given item
async function searchItem(term) {
    
    // Item API call, print response data
    try {
        const response = await fetch(itemURL + term);
        const data = await response.json();
        printItem(data);
    }

    // Catch error in case of term not found, timeout, etc.
    catch (error) {
        console.error(`\nUnable to fetch data for ${term}\n`);
    }

    // Return to user input once above has finished
    run();
}

// Print item data
function printItem(json) {

    // Basic data
    console.log(`\n${json.name.toUpperCase()}`);
    console.log("--------------------");
    console.log(`CATEGORY: ${json.category.name}`);
    console.log(`COST: ${json.cost}₽`);
    console.log(`DESCRIPTION: ${json.effect_entries[0].short_effect}`);
    
    // Attributes
    process.stdout.write("ATTRIBUTES: ");
    for (let i=0; i < json.attributes.length - 1; i++) {
        process.stdout.write(`${json.attributes[i].name}, `);
    }
    console.log(`${json.attributes[json.attributes.length - 1].name}\n`); // Last attribute separate to avoid extra comma
}

// Query API for given move
async function searchMove(term) {
    
    // Move API call, print response data
    try {
        const response = await fetch(moveURL + term);
        const data = await response.json();
        printMove(data);
    }

    // Catch error in case of term not found, timeout, etc.
    catch (error) {
        console.error(`\nUnable to fetch data for ${term}\n`);
    }

    // Return to user input once above has finished
    run();
}

// Prints move data 
function printMove(json) {
    
    // Basic data
    console.log(`\n${json.name.toUpperCase()}`);
    console.log("--------------------");
    console.log(`POWER: ${json.power}`);
    console.log(`ACCURACY: ${json.accuracy}`);
    console.log(`DAMAGE TYPE: ${json.damage_class.name}`);
    console.log(`EFFECTS: ${json.effect_entries[0].short_effect}\n`);
}

// Show menu, prompt for and read user input
function run() {
    showMenu();
    rl.question("Enter choice (1/2/3/4): ", (answer) => {
        switch (answer) {

            // Pokemon
            case '1':
                prompt(searchPoke);
                break;
            
            // Item
            case '2':
                prompt(searchItem);
                break;
            
            // Move
            case '3':
                prompt(searchMove);
                break;
            
            // Quit
            case '4':
                rl.close()
                return 0;

            // Default input, rerun
            default:
                console.log("\nInvalid input\n");
                run();
        }
    });
}

run();
