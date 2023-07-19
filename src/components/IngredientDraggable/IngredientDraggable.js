import React, {
    useRef
} from 'react'
import { useDrag,useDrop } from "react-dnd"
import styles from "../BurgerConstructor/BurgerConstructor.module.css";
import { ConstructorElement, DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";

const IngredientDraggable = ({item, index, deleteIngredient, moveIngredient}) => {
    const ref = useRef(null)
    const [{isDragging}, drag] = useDrag(() => ({
        type: 'ingredient',
        item: () => ({uid: item.uid, index}),
        collect: (monitor) => ({
          isDragging: monitor.isDragging()
        })
    }))
    const [,drop] = useDrop(() => ({
        accept: 'ingredient',
        drop: (item) => {},
        hover: (item, monitor) => {
            moveIngredient(item.index, index)
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
