import React from 'react'
import { useAuth } from '../../context/AuthContext'

function Profile() {

    const { user } = useAuth();

    return (
        <div>
            <h1>Profile</h1>
            <code>{JSON.stringify(user)}</code>
        </div>
    )
}

export default Profile