import { combineReducers } from 'redux'

import { controlsReducer } from './controlsReducer'
import { videoReducer } from './videoReducer'


export const reducers = combineReducers({
    video: videoReducer,
    controls: controlsReducer
})