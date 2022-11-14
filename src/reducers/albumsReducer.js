import { FETCH_ALBUMS, TOGGLE_FAVOURITE } from "../actions/types";

const initialState = {
    items: [],
    item: {}
};

export default function (state = initialState, action) {
    switch (action.type) {
        case FETCH_ALBUMS:
            return {
                ...state,
                items: action.payload
            };
        case TOGGLE_FAVOURITE:
            let newState = {...state}
            newState.items.forEach((item)=>{
                if(item.position === action.payload){
                    item.isFavourite = !item.isFavourite
                }
            })
            return {
                 ...newState
            }
        default:
            return state;
    }
} 