import React, {useEffect, useState} from 'react';

const Profile = (props) => {
    const [user, setUser] = useState([])

    useEffect(() => {
        console.log(props._id);
        fetch(`/users/${props._id}`)
        .then(response => response.json())
      .then(data =>{
        console.log(data);
        setUser(data);
      })
      .catch(error => console.error(error));
    }, [props._id])
    return (
        <div>
           <h1>{user.username}</h1> 
        </div>
    );
};

export default Profile;