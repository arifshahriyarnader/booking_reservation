import Modal from 'react-modal';
import UpdateForm from '../updateform/UpdateForm';

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        width: '80%',
        height: '90%',
        padding: '20px',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    },
};

Modal.setAppElement('#root')

const UpdateReservation = ({data, modalIsOpen, closeModal}) => {
    return (
        <div className='row w-100 container-fluid' style={{ height: '100vh'}}>
        <Modal
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            style={customStyles}
            contentLabel="Example Modal"

        >
            <UpdateForm data={data} closeModal={closeModal}></UpdateForm>
        </Modal>
    </div>
    );
};

export default UpdateReservation;