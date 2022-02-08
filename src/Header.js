import logo from './assets/images/hb-logo.png';
function Header() {
    return (
        <div className="header">
            <img src={logo} className="logo" alt="logo" />
            <div className="rightHeader">
                <span className="link">Link</span>
                <span className="vote">VOTE</span>
                <span> </span>
                <span className="challenge">Challenge</span>
            </div>

        </div>
    );
}

export default Header;
