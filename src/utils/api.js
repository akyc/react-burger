const PATH = "https://norma.nomoreparties.space/api"

const checkResponse = (res) => {
    return res.ok ? res.json() : Promise.reject(res);
};

const API = {
    getIngredientsRequest() {
        return fetch(`${PATH}/ingredients-`).then(res => checkResponse(res))
    }
}

export default API
