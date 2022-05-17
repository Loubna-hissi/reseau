import React, { useState } from 'react';
import { useDispatch, connect } from 'react-redux';
import { createUser } from '../redux/actions/userActions';
import { Redirect } from "react-router-dom"
import { validateFormRegister } from '../helpers/validation';

const Register = ({ userError, userSuccess }) => {

    console.log(userSuccess)

    const [user, setUser] = React.useState({
        name: "",
        email: "",
        password: "",
        city: "",
        relationship: "",
        birthday: "",
        gender: ""
    });

    const [inputInvalid, setInputInvalid] = useState({
        emailError: "",
        nameError: "",
        passwordError: ""
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
    }, [userError, userSuccess, dispatch])

    function handleInputChange(event) {
        setError("");
        setUser({ ...user, [event.target.name]: event.target.value });
    }

    function showError() {
        return error && <div className="alert alert-danger">{error}</div>
    }

    function redirectUser() {
        return success && <Redirect to="/login"></Redirect>
    }


    function handleFormSubmit(event) {

        event.preventDefault();
        dispatch(createUser(user));

        // //console.log(user)
        // const getErrors = validateFormRegister(user);
        // setInputInvalid(getErrors);
        // if (!getErrors.emailError && !getErrors.nameError && !getErrors.passwordError) {
        //     dispatch(createUser(user));
        // }

    }

    return (
        <div>
            <div className="create">
                <h2>Add a new user</h2>
                {showError()}
                {redirectUser()}
                <form onSubmit={handleFormSubmit}>

                    <label htmlFor="">user name</label>
                    <input
                        type="text"
                        name="name"
                        value={user.name}
                        onChange={((e) => handleInputChange(e))}
                    />
                    {inputInvalid.nameError}
                    <label htmlFor="">user email</label>
                    <input
                        type="email"
                        name="email"
                        value={user.email}
                        onChange={((e) => handleInputChange(e))}
                        required />

                    {inputInvalid.emailError}
                    <label htmlFor="">user password</label>
                    <input
                        type="password"
                        name="password"
                        value={user.password}
                        onChange={((e) => handleInputChange(e))}
                        required />
                    {inputInvalid.passwordError}
                    <label htmlFor="">user city</label>
                    <input
                        type="text"
                        name="city"
                        value={user.city}
                        onChange={((e) => handleInputChange(e))}
                    />

                    <label htmlFor="">user relationship</label>
                    <div onChange={((e) => handleInputChange(e))}>
                        <input type="radio" value="Single" name="relationship" /> Single
                        <input type="radio" value="Married" name="relationship" /> Married
                        <input type="radio" value="Engaged" name="relationship" /> Engaged
                    </div>

                    <label htmlFor="">user gender</label>
                    <div required onChange={((e) => handleInputChange(e))}>
                        <input type="radio" value="Male" name="gender" /> Male
                        <input type="radio" value="Female" name="gender" /> Female
                    </div>

                    <label htmlFor="">user birthday</label>
                    <input
                        type="date"
                        name="birthday"
                        value={user.birthday}
                        onChange={((e) => handleInputChange(e))}
                        required />
                    <br />
                    <button>
                        Confirm
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
export default connect(mapStateToProps, null)(Register)

// export default Register;

