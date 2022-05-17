import React from 'react';
import { useDispatch, connect } from 'react-redux';
import { userLogin } from '../redux/actions/userActions';
import { Redirect } from "react-router-dom"


const Login = ({ userError, userSuccess }) => {

    const [user, setUser] = React.useState({
        email: "",
        password: ""
    })

    const [error, setError] = React.useState(null);
    const [success, setSuccess] = React.useState(false);

    const dispatch = useDispatch();

    React.useEffect(() => {

        if (userError && userError !== null) {
            setError(userError);
        }
        if (userSuccess) {
            setSuccess(userSuccess)
            dispatch({ type: "TOGGLE_SUCCESS" })
        }
        return () => {
            dispatch({ type: "HIDE_USER_ERROR" })
        }
    }, [dispatch, userError, userSuccess])


    function handleInputChange(event) {
        setError("");
        setUser({ ...user, [event.target.name]: event.target.value });
    }

    function showError() {
        return error && <div className="alert alert-danger">{error}</div>
    }


    function redirectUser() {
        return success && <Redirect to="/"></Redirect>
    }


    function handleFormSubmit(event) {
        event.preventDefault();
        dispatch(userLogin(user));
    }

    return (
        <div>
            <div className="create">
                <h2>User Login</h2>
                <form onSubmit={handleFormSubmit}>
                    {showError()}
                    {redirectUser()}
                    <label htmlFor="">user email</label>
                    <input
                        type="email"
                        name="email"
                        value={user.email}
                        onChange={((e) => handleInputChange(e))}
                        required />

                    <label htmlFor="">user password</label>
                    <input
                        type="password"
                        name="password"
                        value={user.password}
                        onChange={((e) => handleInputChange(e))}
                        required />

                    <button>
                        Validate
                    </button>
                </form>
            </div>
        </div>
    );
}

const mapStateToProps = ({
    user: { userError, userSuccess } }) => ({
        userError,
        userSuccess
    })
export default connect(mapStateToProps, null)(Login)


