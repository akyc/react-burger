import React, {FC} from 'react'
import styles from './ModalOverlay.module.css'

interface IModalOverlay{
    onClose: () => void;
}
const ModalOverlay: FC<IModalOverlay>= ({ onClose }) => {
    return (
        <div className={`${styles.overlay} clickable`} onClick={onClose}> </div>
    )
}

export default ModalOverlay
