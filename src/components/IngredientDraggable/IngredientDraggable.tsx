import React, {
    useRef
} from 'react'
import { useDrag,useDrop } from "react-dnd"
import styles from "../BurgerConstructor/BurgerConstructor.module.css";
import { ConstructorElement, DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import {
    useDispatch
} from "react-redux";
import {
    MOVE_INGREDIENT
} from "../../services/actions/constructor";

const IngredientDraggable = ({item, index, id, deleteIngredient, moveIngredient}) => {
    const ref = useRef(null)
    const dispatch = useDispatch()
    const [{isDragging}, drag] = useDrag(() => ({
        type: 'ingredient',
        item: { id, index },
        collect: (monitor) => ({
          isDragging: monitor.isDragging()
        })
    }))
    const [{handlerId},drop] = useDrop(() => ({
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
            const {bottom, top} = ref.current.getBoundingClientRect()
            const hoverMiddleY = (bottom - top) / 2
            const clientOffset = monitor.getClientOffset()
            const hoverClientY = clientOffset.y - top
            if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
                return
            }
            if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
                return
            }
            dispatch({type: MOVE_INGREDIENT, dragIndex, hoverIndex})
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
