import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../contexts/UserContext';

const Header = () => {
    const {user} = useContext(AuthContext);
    return (
        <div className="navbar bg-primary text-primary-content justify-start flex ">
            <a href='/' className="btn btn-ghost normal-case text-xl text-white decoration-none">daisyUI</a> 
            <Link className="btn btn-ghost normal-case text-xl text-white decoration-none" to='/'>Home</Link>
            <Link className="btn btn-ghost normal-case text-xl text-white decoration-none" to='/Register'>Register</Link>
            <Link className="btn btn-ghost normal-case text-xl text-white decoration-none" to='/orders'>Orders</Link>
            {
                user?.email ? <Link className="btn btn-ghost normal-case text-xl text-white decoration-none" to='/logout'>Log Out</Link>
                :
                <Link className="btn btn-ghost normal-case text-xl text-white decoration-none" to='/login'>Login</Link> 
            }
            {
                user?.email && <p>Welcome, {user.email}</p>
            }
        </div>
    );
};

export default Header;