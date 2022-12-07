var recipeBtn = document.querySelector(".recipeBtn");
var addIngredientBtn = document.querySelector(".add");
var recipeList = document.querySelector(".recipes-list");
var output = document.querySelector(".output");
var searchInputEl = document.querySelector("#search-input");
var ingredientList = document.querySelector("#ingredient-list");
var ingredients = [];
var recipeData, recipeInfo;

function handleSearchInput() {
	let searchInputVal = searchInputEl.value.trim();
	if (searchInputVal != "") {
		ingredients.push(searchInputVal);
		searchInputEl.value = "";
		
		if (ingredients.length <= 5){
			storeIngredients();
			appendIngredients();
		}
		else {
			alert("Maximum of 5 Ingredients")
		}
	}
}
function appendIngredients() {
	ingredientList.innerHTML = "";
	for (let i = 0; i < ingredients.length; i++) {
		let ingredient = ingredients[i];
		let div = document.createElement("div");
		let header = document.createElement("div");
		header.textContent = capitalFormat(ingredient);
		div.setAttribute("class", "message is-success");
		div.setAttribute("data-index", i);
		header.setAttribute("class", "message-header");
		let button = document.createElement("button");
		button.setAttribute("class", "delete");
		header.append(button);
		div.append(header);
		ingredientList.append(div);
	}


}
function removeIngredient(event) {
	let element = event.target;

	if (element.matches("button") === true) {
		let index = element.parentElement.parentElement.getAttribute("data-index");
		ingredients.splice(index, 1);
		storeIngredients();
		appendIngredients();

	}
};
function onEnterKey(event) {
	if (event.key === 'Enter') {
		event.preventDefault();
		addIngredientBtn.click();
		searchInputEl.value = "";
	}

};

function storeIngredients() {
	localStorage.setItem("ingredients", JSON.stringify(ingredients));
}

function searchRecipeByIngredients() {
		let apiUrl = "https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/findByIngredients?ingredients=";
		for (let i = 0; i < ingredients.length; i++) {
			apiUrl += "%2C" + ingredients[i];
		}
		apiUrl += "&number=5&ignorePantry=true&ranking=1";
	if (ingredients.length < 1){
		apiUrl = "https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/random?number=5";
	}
	console.log(apiUrl);
	fetch(apiUrl, {
		"method": "GET",
		"headers": {
			"x-rapidapi-key": "9aa92d7aa7msh77d7072478c9634p1b415cjsn6487488da0d0",
			"x-rapidapi-host": "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com"
		}
	})
		.then(function (response) {
			if (response.status == 200) {
				return response.json();
			}
		})
		.then(function (data) {
					recipeData = data;
					if (ingredients < 1){
						recipeData = data.recipes;
					}
			console.log(recipeData);
			if (recipeData != ""){
				fillSuggestedRecipes(recipeData);
			}
			else{
				alert("No recipes found")
				return;
			}
		})
		.catch(function (err) {
			console.error(err);
		});
}
function fillSuggestedRecipes() {
	unhideRecipeList();
	recipeList.innerHTML = "";
	createBackBtnSuggested();
	let div1 = document.createElement("div");
	div1.textContent = "Suggested Recipes";
	div1.setAttribute("class","column has-text-centered is-size-5 has-text-weight-semibold box has-background-success has-text-white");
	recipeList.append(div1);
	for (let i = 0; i < recipeData.length; i++) {
		var title = recipeData[i].title;
		var recipePicUrl = recipeData[i].image;

		columnLayout(title, recipePicUrl, i);
	}
	hideTile1();
}

function unhideRecipeList (){
	let tile2 = document.querySelector(".right-tile");
	if (tile2.classList.contains("is-hidden")){
		tile2.classList.remove("is-hidden")
	}
}

function hideTile1 (){
	let tile1 = document.querySelector(".left-tile");
	if (tile1.classList.contains("is-hidden") == false){
		tile1.classList.add("is-hidden");
	}

}

function createBackBtnSuggested (){
  let btnSpan = document.createElement("span");
  let innerSpan = document.createElement("span");
  let backBtn = document.createElement("button");
  let icon = document.createElement("i");
  btnSpan.setAttribute("class", "icon is-medium back");
  backBtn.setAttribute("class", "button is-success backBtn back");
  backBtn.setAttribute("style", "position: relative; margin-left: -.1rem; margin-top: -2rem; margin-bottom: 1rem; max-width: 6rem;");
  icon.setAttribute("class", "fas fa-chevron-left back");
  innerSpan.setAttribute("class", "back");
  innerSpan.textContent = "Back"
  backBtn.append(btnSpan);
  backBtn.append(innerSpan);
  btnSpan.append(icon);
  recipeList.append(backBtn);
}

function goBackIng (event){
	let tile1 = document.querySelector(".left-tile");
	let tile2 = document.querySelector(".right-tile");
	let clickTag = event.target;
  if (clickTag.classList.contains("back")){
		if (tile1.classList.contains("is-hidden")){
			tile1.classList.remove("is-hidden");
			tile2.classList.add("is-hidden");
		}
  }
}


function columnLayout(title, recipePicUrl, i) {
	var img = document.createElement("img");
	var div1 = document.createElement("div");
	var div2 = document.createElement("div");
	var div3 = document.createElement("div");
	img.setAttribute("src", recipePicUrl);
	img.setAttribute("data-id", recipeData[i].id);
	img.setAttribute("class", "roundedCorners mt-5");
	div1.setAttribute("class","column has-text-centered is-size-5 has-text-weight-semibold box has-background-success has-text-white");
	div2.setAttribute("class","columns");
	div3.setAttribute("class","column");
	recipeList.append(div1);
	div1.append(title);
	div1.append(div2);
	div2.append(div3);
	div3.append(img);
}

function getRecipeInfo(recipeId) {

	//TODO pass in recipe ID
	let apiUrl = "https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/informationBulk?ids=" + recipeId;
	console.log(apiUrl);
	
	fetch(apiUrl, {
		"method": "GET",
		"headers": {
			"x-rapidapi-key": "9aa92d7aa7msh77d7072478c9634p1b415cjsn6487488da0d0",
			"x-rapidapi-host": "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com"
		}
	})
		.then(function (response) {
			if (response.status == 200) {
				console.log(response);
				return response.json();
			}
		})
		.then(function (data) {
			console.log(data);
			//TODO have selected recipe call the api response only
			recipeInfo = data;
			displayRecipeCallback();
			console.log(recipeInfo);
			
		})
		.catch(function (err) {
			console.error(err);
		});
	}

function capitalFormat(searchInput) {
	var cap = searchInput.split(" ");
	for (let i = 0; i < cap.length; i++) {
		cap[i] = cap[i][0].toUpperCase() + cap[i].substr(1);
	}
	return (cap.join(' '));
}

searchInputEl.addEventListener("keyup", onEnterKey);

recipeBtn.addEventListener("click", searchRecipeByIngredients);
addIngredientBtn.addEventListener("click", handleSearchInput);
ingredientList.addEventListener("click", removeIngredient);
recipeList.addEventListener("click", goBackIng)
