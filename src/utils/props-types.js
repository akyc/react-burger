import PropTypes from 'prop-types'

export const ingredientType = PropTypes.shape({
    _id: PropTypes.string,
    name: PropTypes.string,
    price: PropTypes.number,
    image_mobile: PropTypes.string,
    image_large: PropTypes.string,
    image: PropTypes.string,
    proteins: PropTypes.number,
    fat: PropTypes.number,
    calories: PropTypes.number,
    carbohydrates: PropTypes.number
})


