import React from "react";
import { subscribe, unsubscribe } from "../redux/actions/userActions";



export default function FollowButton({

    handleButtonClick,
    following,
    userId,
    token,
    followId
}) 

    {
        async function followUser() {
            const userData = await subscribe(userId,followId, token);
            //console.log(userData)
            if (userData.error) {
                console.log(userData.error)
            }
            else {
                handleButtonClick(userData.data)
            }
        }
    async function unFollowUser(){
        const userData = await unsubscribe(userId,followId, token);
        
        if (userData.error) {
            console.log(userData.error)
        }
        else {
            handleButtonClick(userData.data)
        }
    }

    return (

        <div className="row mx-2">
            <div className="col-md-4 mx-auto">
                {

                following ?
                <button className="btn btn-primary"
                onClick={()=>unFollowUser()}
                >
                    Unfollow
                </button>
                :
                <button className="btn btn-primary"
                onClick={()=>followUser()}
                >
                    follow
                </button>
            }
            </div>
        </div>
    ) 
}