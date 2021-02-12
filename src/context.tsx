import React, {createContext, useState} from 'react'
import useSWR from 'swr'
import fetcher from './fetcher'

let Context = createContext()

function Provider(props) {
    const {data, error} = useSWR(`https://petstore.swagger.io/v2/pet/findByStatus?status=available`, fetcher)

    const initialState = {
        user: false,
        username: '',
        filter: 'available',
        pets: error? error : data
    }

    function update(newState) {
        console.log(newState, 'newState')
        updateState(newState)
        console.log('NEW STATEEEEEEEEEEEEEEEEEEEEEEEEEEEEE', state )
    }

    const [state, updateState] = useState(initialState)

    return (
        <Context.Provider value={{state:state, update:update}}>
            {props.children}
        </Context.Provider>
    )
}

const Consumer = Context.Consumer

export {Provider, Consumer, Context}