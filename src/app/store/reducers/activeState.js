
import { ActiveStates } from 'constants/game.constants';
import _ from 'lodash';

export default function activeState(state = '', action) {
    return action.type === '@@redux/INIT'
            ? ActiveStates.INITIALIZED
            : _.findKey(ActiveStates, (value) => value === action) || '<unknown>';
}