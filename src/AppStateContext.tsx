
import React, { createContext, useContext, useReducer } from "react"
import { v4 as uuid } from 'uuid';
import { findItemIndexById } from "./utils/canban/findItemIndexById";

const appData: AppState = {
    lists: [
        {
            id: "0",
            text: "To Do",
            tasks: [{ id: "c0", text: "Generate app scaffold" }]
        },
        {
            id: "1",
            text: "In Progress",
            tasks: [{ id: "c2", text: "Learn Typescript" }]
        },
        {
            id: "2",
            text: "Done",
            tasks: [{ id: "c3", text: "Begin to use static typing" }]
        }
    ]
}


interface Task {
    id: string
    text: string
}
interface List {
    id: string
    text: string
    tasks: Task[]
}

export interface AppState {
    lists: List[]
}

interface AppStateContextProps {
    state: AppState,
    dispatch: React.Dispatch<Action>
}

const AppStateContext = createContext<AppStateContextProps>({} as AppStateContextProps);


export const AppStateProvider = ({ children }: React.PropsWithChildren<{}>) => {
    const [state, dispatch] = useReducer(appStateReducer, appData)
    return (
        <AppStateContext.Provider value={{ state, dispatch }}>
            {children}
        </AppStateContext.Provider>
    )
}

export const useAppState = () => {
    //console.log(useContext(AppStateContext));
    return useContext(AppStateContext)
}


type Action =
    | {
        type: "ADD_LIST"
        payload: string
    }
    | {
        type: "ADD_TASK"
        payload: { text: string; taskId: string }
    }

const appStateReducer = (state: AppState, action: Action): AppState => {
    switch (action.type) {
        case "ADD_LIST": {
            // Reducer logic here...
            return {
                ...state,
                lists: [
                    ...state.lists,
                    { id: uuid(), text: action.payload, tasks: [] }
                ]
            }
        }
        case "ADD_TASK": {
            console.log('add task');
            // Reducer logic here...
            const targetLaneIndex = findItemIndexById(
                state.lists,
                action.payload.taskId
            )
            console.log(targetLaneIndex + "land index");

            let newState = { ...state };
            newState.lists[targetLaneIndex].tasks.push({
                id: uuid(),
                text: action.payload.text
            })
            console.log(newState.lists[targetLaneIndex].tasks);
            return {
                ...newState
            }
        }
        default: {
            return state
        }
    }
}



