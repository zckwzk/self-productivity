import { useDrag } from "react-dnd"
import { useAppState } from "../../AppStateContext"
import { DragItem } from "../../components/DragItem"

export const useItemDrag = (item: DragItem) => {
    const { dispatch } = useAppState()
    const [, drag] = useDrag({
        type: item.type,
        item: () => {
            return [item,
                dispatch({
                    type: "SET_DRAGGED_ITEM",
                    payload: item
                }) //Need to return Item + action
            ]
        },
        end: () => dispatch({
            type: "SET_DRAGGED_ITEM", payload: undefined
        })
    })
    return { drag }
}