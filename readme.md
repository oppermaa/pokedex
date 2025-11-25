# ***Pokedex***

## **Objectives**
The goal of this program is to communicate with *PokeAPI*, an API for fetching data about the Pokemon universe. The specific requirements are as follows:
- Take user input
- Make API calls to display:
    - Pokemon data
    - Item data
    - Move data
- Handle errors as necessary

## **Instructions**

### *Step 1*
In the terminal, run the commands  
`npm install`  
`npm start`.

### *Step 2*
```
1. Search for Pokemon
2. Search for Item
3. Search for Move
4. Quit
Enter choice (1/2/3/4):
```

Enter an integer corresponding with your menu option (e.g 2 to search for items). Entering 4 (Quit) will exit the program.

### *Step 3*
```Enter search term:```

Enter the Pokemon/item/move you want to search for (e.g "potion" if searching for items). The program will respond with data on the search:
```
POTION
--------------------
CATEGORY: healing
COST: 200₽
DESCRIPTION: Restores 20 HP.
ATTRIBUTES: countable, consumable, usable-overworld, usable-in-battle, holdable
```

*Note: Search terms of multiple words (e.g "super potion") must be connected with hyphens (e.g "super-potion")* 

### *Step 4*
Repeat steps from *step 2* until quitting the program.

## **Functions / Flow**
`showMenu()` - Prints menu options.

`run()` - Calls `showMenu()` and passes the correct callback function, based on user input, to the `prompt()` function. In the case the user enters "4" (Quit), the program closes the readline interface and exits. In the case the input is not understood (input is not "1", "2", "3", or "4"), the function calls itself and starts over.

`prompt(cb)` - Prompts user for search term and passes user input to the callback (`cb`) function; either `searchPoke()`, `searchItem()`, or `searchMove()`.  

`searchPoke(term)` - Fetches data on the Pokemon specified by `term` via API call, converts the data to json, passes the json to `printPoke()`, and calls `run()`. In the case of API error (Pokemon not found, timeout, etc.), the function outputs an error message and continues.

`printPoke(json)` - Parses the json data given by `json` and prints Pokemon name, weight, height, base experience, and moves.

`searchItem(term)` - Fetches data on the item specified by `term` via API call, converts the data to json, passes the json to `printItem()`, and calls `run()`. In the case of API error (item not found, timeout, etc.), the function outputs an error message and continues.

`printItem(json)` - Parses the json data given by `json` and prints item name, category, cost, description, and attributes.

`searchMove(term)` - Fetches data on the move specified by `term` via API call, converts the data to json, passes the json to `printMove()`, and calls `run()`. In the case of API error (move not found, timeout, etc.), the function outputs an error message and continues.

`printMove(json)` - Parses the json data given by `json` and prints move name, power, accuracy, damage type, and effects.

## **Reflection on Learning**
Overall, this project was pretty straightforward as I've used APIs similar to PokeAPI before. While I did so in Python, the logical flow is largely the same in JavaScript. The main takeaways I have from this project are those having to do with asynchronous logic as well as the readline interface. 

For example, I hadd an issue where the `run()` function was infinitely calling itself following the prompt for user input. It was simply because I was forgetting that I needed to nest the `run()` call inside of the readline call so as to make the recursive call wait until the user actually gives input.

Other than this, the project went smoothly, and I have a much better understanding of how using async functions, await, and asynchronous logic all work together in practice.