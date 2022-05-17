import React from "react";
import { useHistory, useParams } from "react-router-dom";
import { isLogged, logout } from "../helpers/auth";
import { getUser } from '../redux/actions/userActions';
import { Link } from "react-router-dom";
import { checkAuth } from "../helpers/auth";
import FollowButton from "../components/FollowButton";
import FollowComponent from "../components/FollowCompenent";
import { deleteUser } from "../redux/actions/userActions";
import { useDispatch, connect } from 'react-redux';


const Profile = ({ userSuccess, userError }) => {

    const history = useHistory();
    const { userId } = useParams();
    // console.log(userId);
    const dispatch = useDispatch()
    const [error, setError] = React.useState(null);

    const [following, setFollowing] = React.useState(false);

    const [user, setUser] = React.useState(null)

    const jwt = isLogged();

    const date = user && user.createdAt ? new Date(user.createdAt) : null;
    
    function refreshPage() {
        window.location.reload(false);
    }
    React.useEffect(() => {
        if (userSuccess) {
            logout(() => {
                history.push(`/`);
            },() => {
                refreshPage()
            })
            dispatch({ type: "TOGGLE_SUCCESS" })
        }
        if (userError) {
            setError(userError)
        }
    }, [userError, history, userSuccess, dispatch]);


    React.useEffect(() => {

        function checkFollow(user) {
            const match = user.followers.find((follower) => {
                return follower._id === jwt.user._id
            })
            return match
        }

        async function getProfile() {

            const userData = await getUser(userId, jwt && jwt.token);
            // console.log(userData)
            if (userData.error) {
                setError(userData.error)
            }
            else {
                setUser(userData.data)
                setFollowing(checkFollow(userData.data))
            }

        }
        getProfile();

    }, [userId]);

    function showError() {
        return error && <div className="alert alert-danger">{error}</div>
    }



    function handleButtonClick(user) {
        setUser(user);
        setFollowing(!following)
    }
    return (
        <div className="container">
            <div className="row m-5">
                {error ? showError() :
                    <div className="align-items-center">
                        <img src={`http://localhost:8888/api/user/photo/${userId}?${new Date().getTime()}`} alt={user && user.name} height="80" width="80" />
                        <h3 style={{ color: "blue" }}>
                            {user && user.name}
                        </h3>
                        <h5 className="mt-2">
                            {user && user.email}
                        </h5>
                        <h5 className="mt-3">
                            {user && user.about}
                        </h5>
                        <h5>
                            Inscrit le : {date && date.toLocaleDateString()}
                        </h5>
                        {
                            checkAuth(userId) ? (<div className="list-group-item d-flex flex-row justify-content-between align-items-center">
                                <Link to={`/user/edit/${userId}`}>
                                    <i className="fa fa-edit btn-md btn btn-info"></i>
                                </Link>

                                <Link to="#" onClick={() => { dispatch(deleteUser(userId, jwt.token)) }}>
                                    <i className="fa fa-trash btn-md btn btn-danger"></i>
                                </Link>
                            </div>)
                                : <FollowButton
                                    following={following}
                                    handleButtonClick={handleButtonClick}
                                    token={jwt && jwt.token}
                                    followId={user && user._id}
                                    userId={jwt && jwt.user._id}

                                ></FollowButton>
                        }
                        <hr />
                        <h5 className="text-info">
                            Followers
                        </h5>
                        <hr />
                        <FollowComponent data={user && user.followers}></FollowComponent>
                        <h5 className="text-info">
                            Following
                        </h5>
                        <hr />
                        <FollowComponent data={user && user.following}></FollowComponent>

                    </div>
                }

            </div>
        </div>
    );
}

const mapStateToProps = ({ user: { userError, userSuccess } }) => ({
    userSuccess,
    userError
})

export default connect(mapStateToProps, null)(Profile);