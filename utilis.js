function getEl(id) {
    return document.getElementById(id)
}

function makeAPICall (url, options) {
    return fetch(url, options)
    .then(response => {
        if(response.ok) {
            return response.json()
        }

        return new Promise ((resolve, reject) => {
            response.json().then(body => {
            reject(new Error(body.message))
        })
    })     
    })
}

function debounce (action,second) {
    let timerId = null;
    return function(...event){
        clearTimeout(timerId);
        timerId = setTimeout(action, second, ...event);
    }
}

function createElement(tag) {
    return document.createElement(tag)
}

function easyFetch(url) {
    return fetch(url)
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        return Promise.reject("Error!!!");
      }
    });
  }