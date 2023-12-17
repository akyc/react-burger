import { SELECT_TABS } from "../actions/tabs"
import {
    TUnionAction
} from "../actions";

type TInitialState = {
    select: string
}


const initialState: TInitialState = {
    select: 'bun',
}

export const selectTabsReducer = (state : TInitialState = initialState, action : TUnionAction) : TInitialState => {
    switch (action.type) {
        case SELECT_TABS: {
            return {
                ...state,
                select: action.payload
            }
        }
        default: {
            return state
        }
    }
}
