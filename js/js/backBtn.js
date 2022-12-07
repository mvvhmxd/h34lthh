function createBackBtn (){
  let btnSpan = document.createElement("span");
  let innerSpan = document.createElement("span");
  let backBtn = document.createElement("button");
  let icon = document.createElement("i");
  btnSpan.setAttribute("class", "icon is-medium");
  backBtn.setAttribute("class", "button is-success backBtn");
  backBtn.setAttribute("style", "position: relative; margin-left: -2rem; margin-top: -3rem;");
  icon.setAttribute("class", "fas fa-chevron-left");
  innerSpan.textContent = "Back"
  backBtn.append(btnSpan);
  backBtn.append(innerSpan);
  btnSpan.append(icon);
  recipeList.append(backBtn);
}

function goBack (event){
  let recipeSelectedDiv = document.querySelector(".recipe-selected");
  let clickTag = event.target.tagName.toLowerCase();
  if (clickTag == "button" || clickTag == "span" || clickTag =="i"){
    recipeSelectedDiv.classList.add("is-hidden");
    recipeList.classList.remove("is-hidden");
  }
}

