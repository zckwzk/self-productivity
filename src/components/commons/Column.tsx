import React, { useRef } from 'react'
import { useDrop } from 'react-dnd'
import { useAppState } from '../../AppStateContext'
import { ColumnContainer, ColumnTitle } from '../../styles'
import { isHidden } from '../../utils/canban/isHidden'
import { useItemDrag } from '../../utils/hooks/useItemDrag'
import { AddNewItem } from '../canban/AddNewItem'
import { DragItem } from '../DragItem'
import { Card } from './Card'

interface columnProps {
    text: string,
    index: number,
    id: string
}

export const Column = ({ text, index, id }: React.PropsWithChildren<columnProps>) => {

    const { state, dispatch } = useAppState();
    const ref = useRef<HTMLDivElement>(null)
    const { drag } = useItemDrag({ type: 'COLUMN', id, index, text })
    const [, drop] = useDrop({
        accept: "COLUMN",
        hover(item: DragItem) {
            const dragIndex = item.index
            const hoverIndex = index
            if (dragIndex === hoverIndex) {
                return
            }
            dispatch({
                type: "MOVE_LIST", payload: { dragIndex, hoverIndex }
            })
            item.index = hoverIndex
        }
    })

    drag(drop(ref));



    return (
        <ColumnContainer ref={ref} isHidden={isHidden(state.draggedItem, "COLUMN", id)}>
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
