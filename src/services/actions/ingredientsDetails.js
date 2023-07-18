
export const GET_INGREDIENT_DETAILS = 'GET_INGREDIENT_DETAILS '

export const getIngredientsDetails = (ingredient) => ({
    type: GET_INGREDIENT_DETAILS,
    ingredient,
})
