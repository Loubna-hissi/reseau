import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { logout } from "../helpers/auth";

export const Navbar = ({ currentUser }) => {

    function refreshPage() {
        window.location.reload(false);
    }

    const history = useHistory();
    let id = null;
    let name = null;
    if (!currentUser) {
        id = null;
        name = null
    }
    if(currentUser && currentUser.user) {
        id = currentUser.user._id;
        name = currentUser.user.name;
    }
    return (
        <nav className="navbar">
            <div className="links">
                {
                    !currentUser ?
                        <div>
                            <Link to="/">Home</Link>
                            <Link to="/login">Sign In</Link>
                            <Link to="/register">Sign Up</Link>
                        </div>
                        :
                        <div>
                            <Link to="/">Home</Link>
                            <Link to={`/user/${currentUser ? id : null}`}>{name}</Link>
                            <Link to="/users">Users</Link>
                            <Link
                                onClick={() => {
                                    logout(() => {
                                        history.push("/login")
                                    }, () => {
                                        refreshPage()
                                    }
                                    )
                                }}
                                to="#"
                            >Logout</Link>
                        </div>
                }


            </div>
        </nav>
    )

    // // console.log(currentUser)
    // if (!currentUser) {
    //     console.log("noo");
    //     return (
    //         <nav className="navbar">
    //             <div className="links">
    //                 <Link to="/">Home</Link>
    //                 <Link to="/login">Sign In</Link>
    //                 <Link to="/register">Sign Up</Link>
    //             </div>
    //         </nav>
    //     );
    // }
    // else {

    //     console.log("yees");
    //     // console.log(currentUser)
    //     return (
    //         <nav className="navbar">
    //             <div className="links">
    //                 <Link to="/">Home</Link>
    //                 <Link to="/logout"
    //                     onClick={() => {
    //                         logout(() => {
    //                             history.push("/login")

    //                         })
    //                     }}
    //                 >
    //                     Log out</Link>
    //                 <Link to={`/user/${currentUser && currentUser._id}`}>profile</Link>
    //             </div>
    //         </nav>
    //     );
    // }

}

export default Navbar;