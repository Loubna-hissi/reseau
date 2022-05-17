
import React from "react";
import { useDispatch, connect } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import { isLogged, checkAuth } from "../helpers/auth";
import { getUser } from "../redux/actions/userActions";
import { updateUser } from "../redux/actions/userActions";
// import { createUser } from "../redux/actions/userActions";

function EditProfile({ userError, userSuccess }) {
    const [user, setUser] = React.useState({
        name: "",
        email: "",
        password: "",
        about: "",
        image: "",
    });
    const [error, setError] = React.useState(null);
    const [loading, setLoading] = React.useState(true);
    const dispatch = useDispatch();
    const history = useHistory();
    const jwt = isLogged();
    const { userId } = useParams();
    const userData = new FormData();

    React.useEffect(() => {
        async function getProfile() {
            const userData = await getUser(userId, jwt && jwt.token);
            if (userData.error) {
                setError(userData.error);
            } else {
                setUser(userData.data);
            }
        }
        if (loading) {
            getProfile();
        }
        return () => {
            setLoading(false);
        };
    }, [userId, jwt, loading]);

    React.useEffect(() => {
        if (userSuccess) {
            history.push(`/user/${user && user._id}`);
            dispatch({ type: "TOGGLE_SUCCESS" });
        }
        if (userError) {
            console.log(userError)
            setError(userError);
        }
    }, [userError, userSuccess, history, user, dispatch]);

    function handleInputChange(event) {
        const value =
            event.target.name === "image"
                ? event.target.files[0]
                : event.target.value;
        setUser({ ...user, [event.target.name]: value });
    }

    function showError() {
        //console.log(error)
        if (error && typeof error === 'object') {
            return setError("faild to uplaod image!!!")
        }
        return error && <div className="alert alert-danger">{error}</div>;
    }

    function handleFormSubmit(event) {
        event.preventDefault();
        user.name && userData.append("name", user.name);
        user.email && userData.append("email", user.email);
        user.password && userData.append("password", user.password);
        user.about && userData.append("about", user.about);
        //console.log(user.image.name)
        user.image && user.image.name && userData.append("image", user.image);
        dispatch(updateUser(userData, jwt.token, userId));
    }

    if (!checkAuth(userId)) {
        history.push(`/user/${userId}`);
    }

    return (
        <div className="container">
            <div className="row my-5">
                <div className="col-md-6 mx-auto">
                    {showError()}
                    <h3 className="card-title">Modifier mon profile</h3>
                    <form
                        onSubmit={(event) => handleFormSubmit(event)}
                        className="card p-2"
                    >
                        <div className="form-group">
                            <img
                                width="200"
                                height="200"
                                src={`http://localhost:8888/api/user/photo/${userId}`}
                                alt={user && user.name}
                                className="img-fluid rounded"

                            />
                        </div>
                        <div className="form-group">
                            <input
                                // required
                                type="file"
                                accept="image/*"
                                name="image"
                                onChange={(event) => handleInputChange(event)}
                                className="form-control"
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="text"
                                name="name"
                                placeholder="Nom & Prénom"
                                value={user.name}
                                required
                                onChange={(event) => handleInputChange(event)}
                                className="form-control"
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="email"
                                name="email"
                                placeholder="Email"
                                required
                                value={user.email}
                                onChange={(event) => handleInputChange(event)}
                                className="form-control"
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="password"
                                name="password"
                                placeholder="Mot de passe"

                                value={user.password || ""}
                                onChange={(event) => handleInputChange(event)}
                                className="form-control"
                            />
                        </div>
                        <div className="form-group">
                            <textarea
                                row="5"
                                cols="30"
                                name="about"
                                placeholder="Bio"
                                required
                                value={user.about}
                                onChange={(event) => handleInputChange(event)}
                                className="form-control"
                            />
                        </div>
                        <div className="form-group">
                            <button type="submit" className="btn btn-outline-primary">
                                Valider
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
const mapStateToProps = ({ user: { userError, userSuccess } }) => ({
    userError,
    userSuccess,
});

export default connect(mapStateToProps, null)(EditProfile);

