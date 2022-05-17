import userTypes from "../../types/userTypes";

const initialState = {
    currentUser: null,
    users: [],
    userError: null,
    userSuccess: false,
}

const userReducer = (state = initialState, action) => {
    switch (action.type) {

        case userTypes.GET_USERS:
            return {
                ...state,
                users: action.payload
            }
        case userTypes.AUTH:
            return {
                ...state,
                currentUser: action.payload,
                userSuccess: !state.userSuccess,
                userError: null
            }
        case userTypes.CHECK_AUTH:
            console.log("in check")
            return {
                ...state,
                currentUser: action.payload,

            }
        case userTypes.REGISTER:
            console.log("in register")
            return {
                ...state,
                userError: null,
                userSuccess: !state.userSuccess
            }
        case userTypes.UPDATE:

            console.log("in update")
            const jwt = JSON.parse(localStorage.getItem("jwt"));
            const newJwt = { ...jwt, user: action.payload };
            localStorage.setItem("jwt", JSON.stringify(newJwt))

            return {
                ...state,
                currentUser: { ...state.currentUser, user: action.payload },
                userSuccess: !state.userSuccess

            }
        case userTypes.DELETE:
            const updateUsers = state.users.filter(
                (user) => user._id !== action.payload._id
            );

            return {
                ...state,
                users: updateUsers,
                currentUser: null,
                userSuccess: !state.userSuccess
            };
        case "USER_ERROR":
            return {
                ...state,
                userError: action.payload
            }
        case "USER_MESSAGE":
            return {
                ...state,
                userMessage: action.payload
            }
        case "TOGGLE_SUCCESS":
            return {
                ...state,
                userSuccess: !state.userSuccess
            }
        case "HIDE_USER_ERROR":
            return {
                ...state,
                userError: null
            }
        case "PREV_STATUT":
            return {
                userError: null,
                userSuccess: false,
            }
        default:
            return state;

    }
}

export default userReducer;