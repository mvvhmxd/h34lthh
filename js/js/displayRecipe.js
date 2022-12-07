var outputDivEl = document.querySelector(".output");
var recipeListEl = document.querySelector(".recipes-list");
var recipeSelectedEl = document.querySelector(".recipe-selected");
var ingredientsTableEl;
var ingredientsTbodyEl;
var nutritionTableEl;
var nutritionTbodyEl;
var nutritionEl;
var veganEl;
var vegetarianEl;
var glutenFreeEl;
var recipeSelected;
var idSelected;

function displayRecipe(event) {
	if (event.target.tagName.toLowerCase() != "img") {
		return;
	}

	createBackBtn();

	recipeListEl.classList.add("is-hidden");
	recipeSelectedEl.classList.remove("is-hidden");

	let imageSelected = event.target;
	idSelected = imageSelected.dataset.id;
	getRecipeInfo(idSelected);
}

function displayRecipeCallback(){
	
	for (let i = 0; i < recipeData.length; i++) {
		if (idSelected == recipeData[i].id) {
			recipeSelected = recipeData[i];
		}
	}

	let recipeName = document.createElement("h2");
	let imageHolder = document.createElement("div");
	let recipeImage = document.createElement("img");
	let recipeSummary = document.createElement("p");

	recipeName.textContent = recipeSelected.title;
	let titleDiv = document.createElement("div");
	titleDiv.setAttribute("class","column has-text-centered is-size-5 has-text-weight-semibold box has-background-success has-text-white mt-4 mb-3");
	recipeName.setAttribute("class", "has-text-centered is-size-5 has-text-white has-text-weight-semibold")
	imageHolder.setAttribute("class", "column fitImg box has-background-success my-4 p-5");
	recipeImage.setAttribute("src", recipeSelected.image);
	recipeImage.setAttribute("class", "column roundedCorners container");
	recipeSummary.setAttribute("class", "mb-5");
	recipeSummary.innerHTML = recipeInfo[0].summary;

	titleDiv.append(recipeName);
	imageHolder.append(recipeImage);
	recipeSelectedEl.append(titleDiv);
	recipeSelectedEl.append(imageHolder);
	recipeSelectedEl.append(recipeSummary);

	for (let i = 0; i < recipeSelected.missedIngredients.length; i++) {
		let trEl = document.createElement("tr");
		let tdQty = document.createElement("td");
		let tdName = document.createElement("td");

		let amount = recipeSelected.missedIngredients[i].amount;
		let productName = recipeSelected.missedIngredients[i].name;

		
		let ingredientIndex;
		
		for (let a = 0; a < recipeInfo[0].extendedIngredients.length; a++) {
			searchIndex = recipeInfo[0].extendedIngredients[a].name.indexOf(productName);
			if (searchIndex != -1) {
				ingredientIndex = a;
				break;
			}
		}
		
		let units = recipeInfo[0].extendedIngredients[ingredientIndex].unit;
		
		tdQty.innerHTML = "<b>" + amount + " " + units + "</b>";
		tdName.innerHTML = "<b>" + productName + "</b>";
		
		function fillIngredients (){
			trEl.appendChild(tdQty);
			trEl.appendChild(tdName);
			ingredientsTbodyEl.appendChild(trEl);
			
			for (let i = 0; i < recipeSelected.usedIngredients.length; i++) {
				let trEl = document.createElement("tr");
				let tdQty = document.createElement("td");
				let tdName = document.createElement("td");
				
				let amount = recipeSelected.usedIngredients[i].amount;
				let productName = recipeSelected.usedIngredients[i].name;
				
				for (let a = 0; a < recipeInfo[0].extendedIngredients.length; a++) {
					searchIndex = recipeInfo[0].extendedIngredients[a].name.indexOf(productName);
					if (searchIndex != -1) {
						ingredientIndex = a
						break;
					}
				}
				
				let units = recipeInfo[0].extendedIngredients[ingredientIndex].unit;
				
				tdQty.textContent = amount + " " + units;
				tdName.textContent = productName;
				
				trEl.appendChild(tdQty);
				trEl.appendChild(tdName);
				ingredientsTbodyEl.appendChild(trEl);
			}
			
		}
		if (recipeInfo[0].nutrients != undefined)	{
			createNutritionTable();
			
			displayNutritionInfo("Calories");
			displayNutritionInfo("Sugar");
			displayNutritionInfo("Fat");
			displayNutritionInfo("Protein");
			
		}
	}
	if (recipeInfo[0].extendedIngredients != undefined){
		
		createIngredientsTable();
		fillIngredients();
	}
	if (recipeInfo[0].analyzedInstructions != ""){
		displayPrepInstructions();
	}
			createNutritionFooter();
			setNutritionFooter();
}

function createIngredientsTable() {
	ingredientsTableEl = document.createElement("table");
	let ingredientsTrThEl = document.createElement("tr");
	let ingredientsThQtyEl = document.createElement("th");
	let ingredientsThIngEl = document.createElement("th");
	ingredientsTbodyEl = document.createElement("tbody");

	ingredientsTableEl.setAttribute("class", "ingredients table is-bordered is-striped -isnarrow is-hoverable container mb-3");
	ingredientsTbodyEl.setAttribute("class", "table-body");
	ingredientsThQtyEl.textContent = "Quantity";
	ingredientsThIngEl.textContent = "Ingredients";

	ingredientsTrThEl.append(ingredientsThQtyEl);
	ingredientsTrThEl.append(ingredientsThIngEl);
	ingredientsTableEl.append(ingredientsTrThEl);
	ingredientsTableEl.append(ingredientsTbodyEl);
	recipeSelectedEl.append(ingredientsTableEl);
}

function displayPrepInstructions(){
	let stepsEl = document.createElement("div");
	let stepsHeaderEl = document.createElement("div");
	let stepsBodyEl = document.createElement("div");
	let stepHeader = document.createElement("h3");
	let prepInfo = document.createElement("p");
	let prepMins;
	let readyIn;
	let servings;
	let cookingMins;

	stepHeader.textContent = "Cooking Instructions";
	prepMins = recipeInfo[0].preparationMinutes;
	readyIn = recipeInfo[0].readyInMinutes;
	servings = recipeInfo[0].servings;
	cookingMins = recipeInfo[0].cookingMinutes;
	// if (prepMins != "undefined"){
	// 	prepInfo.innerHTML = "Prep Mins: <b>" + prepMins + "</b> " 
	// }
	// else if (readyIn != "undefined"){
	// 	prepInfo.innerHTML += "Ready in Mins: <b>" + readyIn + "</b> "

	// }
	// else if (servings != "undefined"){
	// 	prepInfo.innerHTML += "Servings: <b>" + servings + "</b> "

	// }
	// else if (cookingMins != "undefined"){
	// 	prepInfo.innerHTML += "Cooking Mins: <b>" + cookingMins + "</b> "

	// }
	prepInfo.innerHTML = "Prep Mins: <b>" + prepMins + "</b> " +
	"Ready in Mins: <b>" + readyIn + "</b> " +
	"Servings: <b>" + servings + "</b> " +
	"Cooking Mins: <b>" + cookingMins + "</b>";
	stepsEl.setAttribute("class", "instruction-section");
	stepsHeaderEl.setAttribute("class", "instruction-header has-text-centered mb-3");
	stepsBodyEl.setAttribute("class", "instruction-body has-text-left")
	stepHeader.setAttribute("class", "is-size-5 is-underlined has-text-weight-semibold");
	
	stepsHeaderEl.append(stepHeader);
	stepsHeaderEl.append(prepInfo);
	stepsEl.append(stepsHeaderEl);
	recipeSelectedEl.append(stepsEl);

	for (let i = 0; i < recipeInfo[0].analyzedInstructions[0].steps.length; i++) {
		let instructionSteps = recipeInfo[0].analyzedInstructions[0].steps;
		let stepNo = instructionSteps[i].number;
		let description = instructionSteps[i].step;

		let instructionsUlEl = document.createElement("ul");
		let instructionsIlEl = document.createElement("il");

		instructionsIlEl.textContent = stepNo + " - " + description;

		instructionsUlEl.append(instructionsIlEl);
		stepsBodyEl.append(instructionsUlEl);
		stepsEl.append(stepsBodyEl);
	}
}

function createNutritionTable() {
	nutritionTableEl = document.createElement("table");
	let nutritionTrThEl = document.createElement("tr");
	let nutritionThNameEl = document.createElement("th");
	let nutritionThAmountEl = document.createElement("th");
	let nutritionThUnitEl = document.createElement("th");
	nutritionTbodyEl = document.createElement("tbody");

	nutritionTableEl.setAttribute("class", "nutrients table is-bordered is-striped -isnarrow is-hoverable container mt-3");
	nutritionTbodyEl.setAttribute("class", "table-body");
	nutritionThNameEl.textContent = "Name";
	nutritionThAmountEl.textContent = "amount";
	nutritionThUnitEl.textContent = "unit";

	nutritionTrThEl.append(nutritionThNameEl);
	nutritionTrThEl.append(nutritionThAmountEl);
	nutritionTrThEl.append(nutritionThUnitEl);
	nutritionTableEl.append(nutritionTrThEl);
	nutritionTableEl.append(nutritionTbodyEl);
	recipeSelectedEl.append(nutritionTableEl);
}

function displayNutritionInfo(nutrientName){
	let elementRow = document.createElement("tr");
	let elementName = document.createElement("td");
	let elementAmount = document.createElement("td");
	let elementUnit = document.createElement("td");
	
	let nutrients = recipeInfo[0].nutrition.nutrients;

	let nutrientIndex;
	for(let i = 0; i < nutrients.length; i++){
		if(nutrientName == nutrients[i].name){
			nutrientIndex = i;
		}
	}

	elementName.textContent = nutrients[nutrientIndex].name;
	elementAmount.textContent = nutrients[nutrientIndex].amount;
	elementUnit.textContent = nutrients[nutrientIndex].unit;

	elementRow.append(elementName);
	elementRow.append(elementAmount);
	elementRow.append(elementUnit);
	nutritionTbodyEl.append(elementRow);
}

function createNutritionFooter(){
	nutritionEl = document.createElement("div");
	veganEl = document.createElement("div");
	vegetarianEl = document.createElement("div");
	glutenFreeEl = document.createElement("div");

	nutritionEl.setAttribute("class", "columns container has-text-centered mt-4");
	veganEl.setAttribute("class", "vegan column");
	veganEl.textContent = "Vegan";
	vegetarianEl.setAttribute("class", " vegetarian column");
	vegetarianEl.textContent = "Vegetarian";
	glutenFreeEl.setAttribute("class", "gluttenFree column");
	glutenFreeEl.textContent = "Glutten Free";

	nutritionEl.append(veganEl);
	nutritionEl.append(vegetarianEl);
	nutritionEl.append(glutenFreeEl);
	recipeSelectedEl.append(nutritionEl);
}

function setNutritionFooter(){
	let veganStatus = recipeInfo[0].vegan;
	let vegetarianStatus = recipeInfo[0].vegetarian;
	let gluttenFreeStatus = recipeInfo[0].glutenFree;

	var veganIconStatus = getIcon(veganStatus);
	var vegetarianIconStatus = getIcon(vegetarianStatus);
	var gluttenFreeIconStatus = getIcon(gluttenFreeStatus);

	document.querySelector(".vegan").append(veganIconStatus);
	document.querySelector(".vegetarian").append(vegetarianIconStatus);
	document.querySelector(".gluttenFree").append(gluttenFreeIconStatus);
}

function getIcon(status){
	let iconSet = document.createElement("div");
	let iconContent;

	switch(status){
		case true:
			iconContent = getIconStatus("has-text-success", "fa-check-square", "Yes");
		break;

		case false:
			iconContent = getIconStatus("has-text-danger", "fa-exclamation-triangle", "No");
		break;

		default:
			iconContent = getIconStatus("has-text-danger", "fa-exclamation-triangle", "No information found");
		break;
	}
	iconSet.append(iconContent);
	return iconSet;
}

function getIconStatus(textType, iconType, status){
	let iconText = document.createElement("span");
	let iconSpan = document.createElement("span");
	let i = document.createElement("i");

	iconText.setAttribute("class", "icon-text " + textType);
	iconText.textContent = status;
	iconSpan.setAttribute("class", "icon");
	i.setAttribute("class", "fas " + iconType)

	iconSpan.append(i);
	iconText.append(iconSpan);
	return iconText;
}

function createBackBtn() {
	let btnSpan = document.createElement("span");
	let innerSpan = document.createElement("span");
	let backBtn = document.createElement("button");
	let icon = document.createElement("i");
	btnSpan.setAttribute("class", "back icon is-medium");
	backBtn.setAttribute("class", "back button is-success backBtn");
	backBtn.setAttribute("style", "back position: relative; margin-left: -.1rem; margin-top: -2rem; max-width: 6rem;");
	icon.setAttribute("class", "back fas fa-chevron-left");
	innerSpan.setAttribute("class", "back");
	innerSpan.textContent = "Back"
	backBtn.append(btnSpan);
	backBtn.append(innerSpan);
	btnSpan.append(icon);
	recipeSelectedEl.append(backBtn);
}

function goBack(event) {
	let clickTag = event.target;
	if (clickTag.classList.contains("back")) {
		recipeSelectedEl.classList.add("is-hidden");
		recipeListEl.classList.remove("is-hidden");
		recipeSelectedEl.innerHTML = "";
	}
}

recipeSelectedEl.addEventListener("click", goBack)
recipeListEl.addEventListener("click", displayRecipe);