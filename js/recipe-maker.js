var nameInput = document.getElementById("recipe-name");
var flourInput = document.getElementById("flour");
var waterInput = document.getElementById("water");
var saltInput = document.getElementById("salt");
var starterInput = document.getElementById("starter");
var oilInput = document.getElementById("oil");
var convertButton = document.getElementById("recipe-submit");
var placeHolder = document.getElementById("place-holder");

//find percentage of flour's weight for a given ingredient
var getBakersPercent = function(ingWeight, flourWeight) {
    var percent = Math.round(((ingWeight / flourWeight) * 100) * 10) / 10;
    if (isNaN(percent)) return "0";
    else return percent;
};

//check to see if browser supports localStorage
var supportsLocalStorage = function() {
    try {
        return "localStorage" in window && window["localStorage"] !== null;
    } catch (e) {
        return false;
    }
};

//remove saved recipe from DOM and localStorage
var deleteRecipe = function() {
    //delete recipe from DOM
    var recipeToDelete = this.parentNode;
    var containerDiv = recipeToDelete.parentNode;
    containerDiv.removeChild(recipeToDelete);
    //delete recipe from localStorage
    if (supportsLocalStorage) {
        var divToSave = placeHolder.innerHTML;
        localStorage.setItem("savedDiv", divToSave);
    };
};

//bind buttons of tasks to their corresponding functions
var bindTaskEvents = function(recipe) {
    var deleteButton = recipe.querySelector("button.delete-button");
    //bind deleteRecipe to deleteButton
    deleteButton.onclick = deleteRecipe;
};

//cycle through recipes to activate buttons
var activateButtons  = function(){
    for(var i = 0; i < placeHolder.children.length; i++) {
        //bind button to task
        bindTaskEvents(placeHolder.children[i]);
    }
};

//convert inputed ingredient weights and output a recipe
var createRecipe = function() {

    //add li to recipe ul containing name and converted weight of ingredient
    var ingLine = function(ing) {
        //create li
        var li = document.createElement("li");
        //convert ingredient to baker's percentage
        var convertedIng = getBakersPercent(parseFloat(ing.value), parseFloat(flourInput.value));
        //add name and converted number to li
        li.innerText = ing.id + ": " + convertedIng + "%";
        //append li to ul
        recipeList.appendChild(li);
    };

    //create a div for recipe
    var convertedRecipe = document.createElement("div");
    //add class to div
    convertedRecipe.classList.add("recipe-container");
    //create h2 for div
    var heading = document.createElement("h2");
    //save name input
    var name = nameInput.value;
    //if no name was entered, call it 'My Recipe'
    if (!name) name = "My Recipe";
    //assign name to heading
    heading.innerText = name;
    //add heading as child to div
    convertedRecipe.appendChild(heading);

    //add ul
    var recipeList = document.createElement("ul");
    //add class to ul
    recipeList.classList.add("converted-recipe-list");
    //add li to recipe ul containing name and converted weight of ingredient
    ingLine(flourInput);
    ingLine(waterInput);
    ingLine(saltInput);
    ingLine(starterInput);
    ingLine(oilInput);
    //append ul to div
    convertedRecipe.appendChild(recipeList);

    //create delete button
    var deleteButton = document.createElement("button");
    deleteButton.innerText = "Delete";
    //add class to button
    deleteButton.className = "delete-button";
    //append delete button to div
    convertedRecipe.appendChild(deleteButton);

    //append created div to placeHolder div in HTML
    placeHolder.appendChild(convertedRecipe);
    //add created div to localStorage
    if (supportsLocalStorage) {
        var divToSave = placeHolder.innerHTML;
        localStorage.setItem("savedDiv", divToSave);
    };
    //activate buttons on recipes
    activateButtons();
    //clear input fields
    nameInput.value = "";
    flourInput.value = "";
    waterInput.value = "";
    saltInput.value = "";
    starterInput.value = "";
    oilInput.value = "";
};

//pull up saved recipes from localStorage
if ("savedDiv" in localStorage) {
    placeHolder.innerHTML = localStorage.getItem("savedDiv");
    activateButtons();
};

//covert and save recipe when convert button is pressed
convertButton.addEventListener("click", createRecipe);















