import './App.css';

function Modal(props) {
    function closeModal() {
        props.setModalData({status: 'close', data: {}});
    };

    function deleteListItem() {
        const filteredList = props.listItems.filter(function (item) {
            return (item.name !== props.modalData.item.name && item.url !== props.modalData.item.url);
        });
        props.setListItems(filteredList);
        localStorage.setItem("listItems", JSON.stringify(filteredList));
        closeModal();
    }

    return (
        <div className="modal">
            <div className="modalContainer">
                <div className="modalHeader">
                    <div className="modalTitle">Remove {props.modalData.item.name}</div>
                    <div className="modalCloseBtn" onClick={closeModal}>X</div>
                </div>
                <div className="modalContent">
                    Do you want to remove:
                    <br/>
                    {props.modalData.item.name}
                </div>
                <div className="modalBtns">
                    <div className="modalOkBtn" onClick={deleteListItem}>OK</div>
                    <div className="modalCancelBtn" onClick={closeModal}>CANCEL</div>
                </div>

            </div>
        </div>
    );
}

export default Modal;
