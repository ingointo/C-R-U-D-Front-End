import { NavLink, useNavigate } from "react-router-dom";
import {useEffect} from 'react'
function Navbar() {
    const navigate = useNavigate();
    let username = sessionStorage.getItem('username');
    useEffect(()=>{
        let username = sessionStorage.getItem('username');
        if (username==='' || username===null){
            navigate('/login')
        }
    },[])

    return <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
        <div className="navbar-brand">
            <h4>Medicine Store</h4>
        </div>
        <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
        >
            <span className="navbar-toggler-icon"></span>
        </button>
        <div
        className="collapse navbar-collapse mr-auto"
        id="navbarNav"
        style={{ float: "left" }}
        >
            <ul className="navbar-nav ml-auto" style={{ color: "#ffffff" }}>
                <li className="nav-item">
                <NavLink 
                to={"/"} 
                className={
                    'nav-link '+
                    (status => status.isActive ? 'active' : '')
                } 
                >
                    Home
                </NavLink>
                </li>
                <li className="nav-item">
                {username ? '' : <NavLink 
                to={"/login"} 
                className={
                    'nav-link '+
                    (status => status.isActive ? 'active' : '')
                } 
                >
                    Log In 
                </NavLink>}
                </li>
                <ul className="nav-item">
                 <NavLink style={{float: 'right'}}
                to={"/login"} 
                className={
                    'nav-link '+
                    (status => status.isActive ? 'active' : '')
                } 
                >
                    Log Out 
                </NavLink>
                </ul>
            </ul>
        </div>
    </nav>;
}

export default Navbar;