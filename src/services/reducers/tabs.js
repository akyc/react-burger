import { SELECT_TABS } from "../actions/tabs"

const initialState = {
    select: 'bun',
}

export const selectTabsReducer = (state = initialState, action) => {
    switch (action.type) {
        case SELECT_TABS: {
            return {
                ...state,
                select: action.select
            }
        }
        default: {
            return state
        }
    }
}
