import { TOGGLE_MENY } from '../actions/actiontyper';

const initiellState = {
    visMeny: false,
};

export default function meny(state = initiellState, action) {
    switch (action.type) {
        case TOGGLE_MENY: {
            return Object.assign({}, state, {
                visMeny: !state.visMeny,
            });
        }
        default: {
            return state;
        }
    }
}
