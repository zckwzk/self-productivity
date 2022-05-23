
import React, { createContext, useContext, useReducer } from "react"
import { v4 as uuid } from 'uuid';
import { DragItem } from "./components/DragItem";
import { findItemIndexById } from "./utils/canban/findItemIndexById";
import { moveItem } from "./utils/canban/moveItem";

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
    ],
    draggedItem: undefined
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
    lists: List[],
    draggedItem: DragItem | undefined
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
    |
    {
        type: "SET_DRAGGED_ITEM"
        payload: DragItem | undefined
    }
    |
    {
        type: "MOVE_LIST"
        payload: {
            dragIndex: number
            hoverIndex: number
        }
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
        case "SET_DRAGGED_ITEM": {
            return { ...state, draggedItem: action.payload }
        }
        case "MOVE_LIST": {
            const { dragIndex, hoverIndex } = action.payload
            state.lists = moveItem(state.lists, dragIndex, hoverIndex)
            return { ...state }
        }
        default: {
            return state
        }
    }
}



