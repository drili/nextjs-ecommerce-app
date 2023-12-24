'use client';

import { Modal } from 'flowbite-react';

interface StoresModalProps {
    open: boolean;
    // onClose: () => void;
}

const StoresModal: React.FC<StoresModalProps> = ({ 
    open, 
    // onClose 
}) => {

    return (
        <div id='component_StoresModal'>
            <Modal show={open}>
                <Modal.Header className='modalHeaderStore'>Create your first store here!</Modal.Header>
                <Modal.Body>
                    <div className="space-y-6">
                        <p>You must create a store to continue. Please fill out the form.</p>
                    </div>
                </Modal.Body>
            </Modal>
        </div>
    );
}

export default StoresModal;