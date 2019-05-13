import { combineReducers } from 'redux'

import books from './books';
import user from './users';

const rootReucer = combineReducers({
    user,
    books
})

export default rootReucer;