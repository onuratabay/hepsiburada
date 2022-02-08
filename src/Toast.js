import './App.css';

function Toast(props) {

    function closing() {
        props.setToastData({status: 'close', data: {}});
    }

    setTimeout(closing, 3000);
    return (
        <div className="toastMessage" onClick={closing}>
            <div>{props.toastData.item.name} Eklendi</div>
        </div>
    );
}

export default Toast;
