import {useEffect, useState} from "react";
import AddNewLink from "./AddNewLink";
import Modal from "./Modal";
import Toast from "./Toast";
import Pagination from "./Pagination";

function Content(props) {
    const [voteCount, setVoteCount] = useState(0);
    const [goPage, setGoPage] = useState('mainPage');
    const [modalData, setModalData] = useState({status: 'close', item: {}});
    const [toastData, setToastData] = useState({status: 'close', item: {}});
    const [listItems, setListItems] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [postPerPage] = useState(5);
    useEffect(() => {
        setListItems(JSON.parse(localStorage.getItem("listItems")));
    }, []);

    function incrementVote(index) {
        const tempList = [];
        Object.assign(tempList, listItems);
        tempList[index].vote = tempList[index].vote + 1;
        setListItems(tempList);
        localStorage.setItem("listItems", JSON.stringify(tempList));
    }

    const decrementVote = (index) => {
        const tempList = [];
        Object.assign(tempList, listItems);
        tempList[index].vote = tempList[index].vote - 1;
        setListItems(tempList);
        localStorage.setItem("listItems", JSON.stringify(tempList));

    }

    function sortAsc() {
        const tempList = [];
        Object.assign(tempList, listItems);
        setListItems(tempList.sort(function (a, b) {
            return (b.vote - a.vote);
        }));
    }

    function sortDesc() {
        const tempList = [];
        Object.assign(tempList, listItems);
        setListItems(tempList.sort(function (a, b) {
            return (a.vote - b.vote);
        }));
    }

    function openModal(item) {
        setModalData({status: 'open', item: item});
    };
    const indexOfLastPost = currentPage * postPerPage;
    const indexOfFirstPost = indexOfLastPost - postPerPage;
    const currentPosts = listItems.slice(indexOfFirstPost, indexOfLastPost);
    const paginate = (pageNumber) => setCurrentPage(pageNumber);
    console.log(currentPosts,'onur');

    return (
        <div className="content">
            {modalData.status === 'open' && <Modal modalData={modalData} setModalData={setModalData}
                                                   listItems={listItems} setListItems={setListItems}/>}
            {toastData.status === 'open' && <Toast toastData={toastData} setToastData={setToastData}/>}

            {goPage === 'mainPage' && <div className="container">
                <div className="contentSubmitLink">
                    <div className="rectangleBtn" onClick={() => {
                        setGoPage('addLink')
                    }}>+
                    </div>
                    <div className="contentSubmitLinkLabel">SUBMIT A LINK</div>
                </div>
                <div className="borderLine"></div>
                <div className="mainContent">
                    <div className="sorting">
                        <select name="order" placeholder="Order By">
                            <option value="ASC" onChange={sortAsc}>Most Voted (Z > A)</option>
                            <option value="DSC" onChange={sortDesc}>Less Voted (A > Z)</option>
                        </select>
                        <button onClick={sortAsc}>SORT ASC</button>
                        <button onClick={sortDesc}>SORT DESC</button>
                    </div>
                    <div className="listing">
                        {currentPosts?.length > 0 && currentPosts.map(function (item, index) {
                            return (<div className="listItem">
                                <div className="rectangleVote">
                                    <div>{item.vote}</div>
                                    <span>POINTS</span>
                                </div>
                                <div className="listContent">
                                    <div className="delete" onClick={() => openModal(item)}>X</div>
                                    <div className="listTitle">{item.name}</div>
                                    <div className="listUrl" title={item.url}> {item.url}</div>
                                    <div className="listVote">
                                        <div className="upVote" onClick={() => {
                                            incrementVote(index)
                                        }}>↑ Up Vote
                                        </div>
                                        <div className="downVote" onClick={() => {
                                            decrementVote(index)
                                        }}>↓ Down Vote
                                        </div>
                                    </div>

                                </div>

                            </div>)
                        })
                        }

                        <Pagination postsPerPage={postPerPage} totalPosts={listItems.length} paginate={paginate}/>
                    </div>
                </div>

            </div>
            }
            {goPage === 'addLink' && <AddNewLink setGoPage={setGoPage}/>}


        </div>
    );
}

export default Content;
