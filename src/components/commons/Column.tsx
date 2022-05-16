import React from 'react'
import { useAppState } from '../../AppStateContext'
import { ColumnContainer, ColumnTitle } from '../../styles'
import { AddNewItem } from '../canban/AddNewItem'
import { Card } from './Card'

interface columnProps {
    text: string,
    index: number,
    id: string
}

export const Column = ({ text, index, id }: React.PropsWithChildren<columnProps>) => {
    const { state, dispatch } = useAppState()
    return (
        <ColumnContainer>
            <ColumnTitle>{text}</ColumnTitle>
            {state.lists[index].tasks.map((task, i) => (
                <Card text={task.text} key={task.id} index={i} />
            ))}
            <AddNewItem toggleButtonText='+ Add Another Task' onAdd={text => {
                console.log('on adding')
                dispatch({ type: "ADD_TASK", payload: { text, taskId: id } })
            }} dark={true} />
        </ColumnContainer>
    )
}
