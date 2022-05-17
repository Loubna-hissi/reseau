import React from "react";
import { useHistory } from "react-router-dom";

export default function FollowComponent({ data }) {
    const history = useHistory();
    
    return (
        <div className="row mx-4">
            <div className="col-md-8 mx-auto">
                <div className="row">
                    {
                        data && data.length > 0 ? data.map((user) =>
                        (<div className="col-md-4"
                            style={{ cursor: "pointer" }}
                            key={user._id}
                            onClick={() => history.push(`/user/${user._id}`)}
                        >

                            <div className="align-items-center" >

                                <img src={`http://localhost:8888/api/user/photo/${user._id}`} alt={user && user.name } height="60" width="60" />
                                <p style={{ color: "blue" }}>
                                    {user && user.name}
                                </p>

                            </div>
                        </div>
                        )
                        )
                            :
                            
                            (<p className="alert alert-info">
                                
                                    No data found!
                                
                            </p>)
                    }
                </div>
            </div>
        </div>
    )
}