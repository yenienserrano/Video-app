import React from 'react'
import { Provider } from 'react-redux'
import { DisplayComponent } from './components/DisplayComponent'
import { store } from './store/store'
import './styles.css'

export const VideoApp = () => {

    return (
        <Provider store={ store }>
            <DisplayComponent />
        </Provider>
    )
}
