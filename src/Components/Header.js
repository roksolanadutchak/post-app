import React from 'react';
import { useHistory } from 'react-router';
import {Link} from 'react-router-dom';

function Header(){
    const history = useHistory();
    return (
            <div>
                <nav >
                    <ul className="nav-ul">
                        <li className="nav-li">
                            <Link to="/" className="nav-link">Home</Link>
                        </li>
                        <li className="nav-li">
                            <Link to="/posts" className="nav-link">List of posts</Link>
                        </li>
                        <li className="nav-li">
                            <Link to="/add" className="nav-link">Add new post</Link>
                        </li>
                    </ul>
                </nav>
            </div>
        )
}
export default Header