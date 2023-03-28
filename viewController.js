class ViewController {
  constructor() {
    window.addEventListener("load", this.handleHashChange);
    window.addEventListener("hashchange", this.handleHashChange);
    this.userManager = new UserManager();
    this.cocktailsManager = new CocktailsManager();

    this.registerController = new RegisterController(this.userManager);
    this.logInController = new LogInController(this.userManager);
  }

  handleHashChange = (e) => {
    let header = document.getElementById("headerText");

    const hash = location.hash.slice(1) || PAGE_IDS[0];

    if (!PAGE_IDS.includes(hash)) {
      location.hash = "error";
      return;
    }

    PAGE_IDS.forEach((pageId) => {
      let element = getEl(pageId);
      if (hash === pageId) {
        element.style.display = "block";
      } else {
        element.style.display = "none";
      }
    });

    switch (hash) {
      case "register":
        this.registerController.render();
        break;
      case "login":
        localStorage.loggedUser = [];
        this.logInController.render();
        break;
      case "cocktails":
        this.renderCoctailsPage();
        break;

      // case "filter":
      //     this.renderFilterPage();
      //     break;
    }
  };

  renderCoctailsPage = () => {
    let coctailOfTheDay = getEl("coctailOfTheDay");
    let favorites = getEl("favorites");
    let cocktailsList = getEl("cocktailsList");
    let alternateName = "";

    let coctailOfDay = easyFetch(
      "https://thecocktaildb.com/api/json/v1/1/random.php"
    ).then((result) => {
      coctailOfTheDay.innerHTML = "";

      if (result.drinks[0].strDrinkAlternate !== null) {
        alternateName = `, ${result.drinks[0].strDrinkAlternate}`;
      }

      let card = document.createElement("div");
      card.classList.add("card");
      card.style.width = "200px";
      card.style.background = "khaki";

      card.innerHTML = `
            
            <img src="${result.drinks[0].strDrinkThumb}" class="card-img-top" alt="...">
          <div class="card-body">
            <h5 class="card-title">${result.drinks[0].strDrink}${alternateName}</h5>
            <p class="card-text">${result.drinks[0].strIngredient1}, ${result.drinks[0].strIngredient2}...</p>
            <p class="card-text">${result.drinks[0].strAlcoholic}</p>
          </div>
          `;

      let favoritesBtn = document.createElement("a");
      favoritesBtn.classList.add("btn", "btn-primary");
      favoritesBtn.style.background = "black";
      favoritesBtn.innerText = "Add to favorites";

      favoritesBtn.onclick = (e) => {
        e.preventDefault();
        console.log(result.drinks[0].idDrink);
        this.cocktailsManager.addToFavourites(result.drinks[0].idDrink);
      };

      let detailsBtn = document.createElement("a");
      detailsBtn.classList.add("btn", "btn-primary");
      detailsBtn.innerText = "Details";

      detailsBtn.onclick = (e) => {
        e.preventDefault();
        this.renderDetailsPage(result.drinks[0].idDrink);
        location.hash = "details";
      };

      card.append(favoritesBtn, detailsBtn);

      coctailOfTheDay.appendChild(card);
    });

    let favoritesCocktails = this.cocktailsManager.getAll().then((data) => {
      favorites.innerHTML = "";

      for (let k = 0; k < data.favorites.length; k++) {
        let element = easyFetch(
          `https://thecocktaildb.com/api/json/v1/1/lookup.php?i=${data.favorites[k]}`
        ).then((result) => {
          console.log(result.drinks);

          for (let i = 0; i < result.drinks.length; i++) {
            if (result.drinks[i].strDrinkAlternate !== null) {
              alternateName = `, ${result.drinks[0].strDrinkAlternate}`;
            }

            let card = document.createElement("div");
            card.classList.add("card");
            card.style.width = "200px";
            card.style.background = "pink";

            card.innerHTML = `
                      
                      <img src="${result.drinks[i].strDrinkThumb}" class="card-img-top" alt="...">
                    <div class="card-body">
                      <h5 class="card-title">${result.drinks[i].strDrink}${alternateName}</h5>
                      <p class="card-text">${result.drinks[i].strIngredient1}, ${result.drinks[i].strIngredient2}...</p>
                      <p class="card-text">${result.drinks[i].strAlcoholic}</p>
                    </div>
                    `;

            let detailsBtn = document.createElement("a");
            detailsBtn.classList.add("btn", "btn-primary");
            detailsBtn.innerText = "Details";

            detailsBtn.onclick = (e) => {
              e.preventDefault();
              this.renderDetailsPage(result.drinks[i].idDrink);
              location.hash = "details";
            };

            card.append(detailsBtn);

            favorites.appendChild(card);
          }
        });
      }
    });
    

    let cocktailsListCards = easyFetch(
      "https://thecocktaildb.com/api/json/v1/1/search.php?f=n"
    ).then((result) => {
      cocktailsList.innerHTML = "";

      for (let i = 0; i < result.drinks.length; i++) {
        if (result.drinks[i].strDrinkAlternate !== null) {
          alternateName = `, ${result.drinks[0].strDrinkAlternate}`;
        }

        let card = document.createElement("div");
        card.classList.add("card");
        card.style.width = "200px";
        card.style.background = "tomato";

        card.innerHTML = `
            
            <img src="${result.drinks[i].strDrinkThumb}" class="card-img-top" alt="...">
          <div class="card-body">
            <h5 class="card-title">${result.drinks[i].strDrink}${alternateName}</h5>
            <p class="card-text">${result.drinks[i].strIngredient1}, ${result.drinks[i].strIngredient2}...</p>
            <p class="card-text">${result.drinks[i].strAlcoholic}</p>
          </div>
          `;

        let favoritesBtn = document.createElement("a");
        favoritesBtn.classList.add("btn", "btn-primary");
        favoritesBtn.style.background = "black";
        favoritesBtn.innerText = "Add to favorites";

        favoritesBtn.onclick = (e) => {
          e.preventDefault();
          console.log(result.drinks[0].idDrink);
          this.cocktailsManager.addToFavourites(result.drinks[0].idDrink);
        };

        let detailsBtn = document.createElement("a");
        detailsBtn.classList.add("btn", "btn-primary");
        detailsBtn.innerText = "Details";

        detailsBtn.onclick = (e) => {
          e.preventDefault();
          this.renderDetailsPage(result.drinks[i].idDrink);
          location.hash = "details";
        };

        card.append(favoritesBtn, detailsBtn);

        cocktailsList.appendChild(card);
      }
    });
  };

  renderDetailsPage = (id) => {
    let coctailDetails = easyFetch(
      `https://thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`
    ).then((result) => {
      console.log(result.drinks[0]);

      let tags = "";

      if (result.drinks[0].strTags !== null) {
        tags = result.drinks[0].strTags;
      }

      let left = getEl("leftSide");
      let right = getEl("rightSide");
      let alternateName = "";

      left.innerHTML = "";
      right.innerHTML = "";

      let leftCard = document.createElement("div");
      leftCard.classList.add("card");
      leftCard.style.height = "600px";
      leftCard.style.width = "500px";
      leftCard.style.background = "khaki";

      leftCard.innerHTML = `
            
            <img src="${result.drinks[0].strDrinkThumb}" class="card-img-top" alt="...">
          <div class="card-body">
            <h3 class="card-title">${result.drinks[0].strAlcoholic}</h3>
          </div>
          `;

      left.appendChild(leftCard);

      let rightCard = document.createElement("div");
      rightCard.classList.add("card");
      rightCard.style.height = "600px";
      rightCard.style.width = "500px";
      rightCard.style.background = "yellow";

      rightCard.innerHTML = `
                <div class="card-body">
                <h3 class="card-title">${result.drinks[0].strDrink}${alternateName}</h3>
                <p class="card-text">${result.drinks[0].strTags}</p> 
                <p class="card-text">${result.drinks[0].strGlass}</p>
                <p class="card-text">${result.drinks[0].strInstructions}</p>  
                <p class="card-text">${result.drinks[0].strIngredient1}, ${result.drinks[0].strIngredient2}...</p>  
              </div>
              `;

      let favoritesBtn = document.createElement("a");
      favoritesBtn.classList.add("btn", "btn-primary");
      favoritesBtn.innerText = "Add to favorites";

      favoritesBtn.onclick = (e) => {
        e.preventDefault();
        console.log(result.drinks[0].idDrink);
        this.cocktailsManager.addToFavourites(result.drinks[0].idDrink);
      };

      rightCard.appendChild(favoritesBtn);

      right.appendChild(rightCard);
    });
  };
}

let viewController = new ViewController();
