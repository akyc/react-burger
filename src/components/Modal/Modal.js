import React, { useEffect } from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import ModalOverlay from '../ModalOverlay/ModalOverlay'
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './Modal.module.css'

const Modal = ({ children, header, onClose }) => {
    const modalRoot = document.getElementById('modals')
    const handleEscKey = (e) => {
        if (e.key === 'Escape') {
            onClose()
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

Modal.propTypes = {
    children: PropTypes.node.isRequired,
    header: PropTypes.string,
    onClose: PropTypes.func
}

export default Modal