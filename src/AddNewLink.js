import './App.css';
import {useState} from "react";
import Toast from "./Toast";

function AddNewLink(props) {

    const [name, setName] = useState(null);
    const [url, setUrl] = useState(null);
    const [toastData, setToastData] = useState({status: 'close', item: {}});

    function returnToList() {
        props.setGoPage('mainPage');
        window.location.reload();
    }

    function openToast(name) {
        setToastData({status: 'open', item: {}})
    }

    function addLocalstorage(e) {
        const oldValues = [];
        Object.assign(oldValues, JSON.parse(localStorage.getItem("listItems")));
        const newObject = {
            name: name,
            url: url,
            vote: 0
        };
        oldValues.push(newObject);
        localStorage.setItem("listItems", JSON.stringify(oldValues));
        openToast(true);
        setName("");
        setUrl("");

    };
    return (
        <div className="addNewLink">
            {toastData.status === 'open' && <Toast toastData={toastData} setToastData={setToastData}/>}
            <div className="addNewLinkReturn" onClick={returnToList}>← Return to List
            </div>
            <br/>
            <div className="addNewLinkTitle">Add New Link</div>
            <br/>
            <div className="inputs">
                <label>Link Name:</label>
                <input type="text" name="name" value={name} onChange={(e) => setName(e.target.value)}
                       placeholder="e.g. Alphabet"/>
                <br/>
                <br/>
                <label>Link URL:</label>
                <input type="text" name="url" placeholder="e.g. http://abc.xyz" value={url}
                       onChange={(e) => setUrl(e.target.value)}/>
                <br/><br/>
                <button onClick={(e) => addLocalstorage(e)}>Submit</button>
            </div>
        </div>
    );
}

export default AddNewLink;
