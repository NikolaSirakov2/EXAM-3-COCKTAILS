class CocktailsManager {


    getAll = () => {

        let sessionId = JSON.parse(localStorage.getItem('loggedUser')).sessionId;

        return makeAPICall(SERVER_URL + "/favorite-cocktails", {
            headers: {
                "identity" : sessionId,
            },
        })
    }

    
    addToFavourites = (cocktailId) => {

        let sessionId = JSON.parse(localStorage.getItem('loggedUser')).sessionId;

        return makeAPICall(SERVER_URL + "/favorite-cocktails", {
            method: "POST",
            headers: {
                "identity" : sessionId,
                "Content-type" : "application/json"
            },
            body: JSON.stringify({
                "id": cocktailId
            })
        })
    }
}