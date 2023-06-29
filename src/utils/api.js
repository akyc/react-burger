const PATH = "https://norma.nomoreparties.space/api"

const checkResponse = (res) => {
    return res.ok ? res.json() : Promise.reject(res);
};

const API = {
    getIngredients(state, setState) {
        fetch(`${PATH}/ingredients-`)
            .then(res => checkResponse(res))
            .then(({ data }) => console.log(data))//setState({ ...state, ingredients: data }))
            .catch(err => setState({ ...state, hasError: true, error: err.status }))
            .finally(() => setState({ ...state, isLoading: false }))
    }
}


export default API