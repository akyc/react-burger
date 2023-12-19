import React, {
    FC,
    useRef
} from 'react'
import {
    useDrag,
    useDrop
} from "react-dnd"
import type { XYCoord, Identifier } from 'dnd-core';
import styles from "../BurgerConstructor/BurgerConstructor.module.css";
import { ConstructorElement, DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import {
    useDispatch
} from "../../utils/constants";
import {
    moveIngredient
} from "../../services/actions/constructor";
import {
    IIngredient
} from "../../utils/types";

interface IDragItem {
    id: string;
    index: number;
    type: string;
}
interface IIngredientDraggable {
    item: IIngredient;
    index: number;
    id: string;
    deleteIngredient: (item: IIngredient) => void;
}
const IngredientDraggable: FC<IIngredientDraggable> = ({item, index, id, deleteIngredient}) => {
    const ref = useRef<HTMLDivElement>(null)
    const dispatch = useDispatch()
    const [{isDragging}, drag] = useDrag(() => ({
        type: 'ingredient',
        item: { id, index },
        collect: (monitor) => ({
          isDragging: monitor.isDragging()
        })
    }))
    const [{handlerId},drop] = useDrop<IDragItem, void, { handlerId: Identifier | null }>(() => ({
        accept: 'ingredient',
        collect(monitor) {
            return {
                handlerId: monitor.getHandlerId(),
            }
        },
        hover: (item, monitor) => {
            const dragIndex = item.index
            const hoverIndex = index
            if (dragIndex === hoverIndex) {
                return
            }
            if (!ref.current) {
                return
            }
            const {bottom, top} = ref.current?.getBoundingClientRect()
            const hoverMiddleY = (bottom - top) / 2
            const clientOffset = monitor.getClientOffset()
            const hoverClientY = (clientOffset as XYCoord).y - top
            if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
                return
            }
            if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
                return
            }
            dispatch(moveIngredient(dragIndex, hoverIndex))
            item.index = hoverIndex
        }
    }))
    drag(drop(ref))
    const opacity = isDragging ? 0 : 1
    return (
        <div ref={ref} className={`${styles.draggableElement} d-flex`} style={{opacity}}>
            <DragIcon type='primary' />
            <ConstructorElement
                isLocked={false}
                text={item.name}
                price={item.price}
                thumbnail={item.image}
                handleClose={() => deleteIngredient(item)}
            />
        </div>
    )
}

export default IngredientDraggable
