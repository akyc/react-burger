import React, {
    useEffect,
    FC,
    ReactNode
} from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import ModalOverlay from '../ModalOverlay/ModalOverlay'
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './Modal.module.css'

interface IModal {
    header?: string;
    onClose: () => void;
    children: ReactNode;
}
const Modal: FC<IModal> = ({ children, header, onClose }) => {
    const modalRoot = document.getElementById('modals') as HTMLElement
    const handleEscKey = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
            if(onClose){
                onClose()
            }
        }
    }
    useEffect(() => {
        document.addEventListener('keydown', handleEscKey, false)

        return () => {
            document.removeEventListener('keydown', handleEscKey, false)
        }
    }, [])
    return ReactDOM.createPortal(
        (
            <>
                <div className={styles.modal}>
                    <div className={`${styles.modalContent} pt-10 pr-10 pb-15 pl-10 text-center`}>
                        <div className={`${styles.modalHeader} d-flex`}>
                            {header && <span className='text text_type_main-large'>{header}</span>}
                            {onClose !== undefined &&
                                <span className='clickable ml-auto'><CloseIcon type='primary' onClick={onClose} /></span>
                            }

                        </div>
                        {children}
                    </div>
                </div>
                <ModalOverlay onClose={onClose} />
            </>
        ),
        modalRoot
    )
}
export default Modal
