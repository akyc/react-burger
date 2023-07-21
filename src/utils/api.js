const PATH = "https://norma.nomoreparties.space/api"

const checkResponse = (res) => {
    return res.ok ? res.json() : Promise.reject(res);
};

const API = {
    getIngredientsRequest() {
        return fetch(`${PATH}/ingredients`).then(res => checkResponse(res))
    },
    storeOrder(ingredients){
        return fetch(`${PATH}/orders`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json;charset=utf-8",
            },
            body: JSON.stringify({ingredients})
            }).then(res => checkResponse(res))
    }
}

export default API
