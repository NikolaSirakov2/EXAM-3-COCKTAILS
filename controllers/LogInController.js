class LogInController {

    constructor(userManager) {
        this.userManager = userManager;
    }

    render = () => {
        
        let linkFilters = getEl("linkFilters");
        let linkCocktails = getEl("linkCocktails");
        
        linkFilters.innerText = "";
        linkCocktails.innerText = "";
        
        let userManag = getEl("userManag");

        userManag.innerText = "Dont have acount? Register here!";
        userManag.href = "#register";
        
        let form = getEl("loginForm");

        form.onsubmit = (event) => {
                event.preventDefault();

                const {username: {value: username}, 
                    password: {value: password}, 
                    } = event.currentTarget;

            

                this.userManager.logIn(username, password)
                .then(data => {
                    linkFilters.innerText = "Filters";
                    linkCocktails.innerText = "Cocktails";
                    userManag.innerText = "LogOut";
                    location.hash = 'cocktails';
                    
                })
                .catch(error => {
                    alert(error)
                })

                form.reset();
        }
    }
}