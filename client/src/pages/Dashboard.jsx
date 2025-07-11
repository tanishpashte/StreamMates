import React from 'react'
import { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';

const Dashboard = () => {

    const {state} = useContext(AuthContext);
    const [rooms, setRooms] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [newRoomName, setNewRoomName] = useState('');

    useEffect(() => {
        const fetchRooms = async () => {
            try {
                const config = {
                    headers: {'x-auth-token': state.token}
                };
                const res = await axios.get('http://localhost:5000/api/rooms', config);
                setRooms(res.data);
                setNewRoomName('');
            } catch (error) {
                setError('Failed to fetch rooms.');
                if (error.response) {
                console.error(error.response.data);
                } else {
                console.error(error.message);
                }
            } finally {
                setLoading(false);
            }
        };

        if (state.token) {
            fetchRooms();
        }
    }, [state.token]);

    const handleCreateRoom = async (e) => {
        e.preventDefault();
        try {
            const config = {
                headers: { 'x-auth-token': state.token }
            };
            const body = { name: newRoomName };
            const res = await axios.post('http://localhost:5000/api/rooms', body, config);
            setRooms([...rooms, res.data]);
            setNewRoomName('');
        } catch (error) {
           setError('Failed to create room.');
            if (err.response) {
            console.error(err.response.data);
            } else {
            console.error(err.message);
            }
        }
    };

    if(loading){
        return <h1>Loading...</h1>
    }

    if(error){
        return <h1>Error: {error}</h1>
    }

    return (
        <div>
            <h1>Dashboard</h1>
            <p>Welcome, {state.user.username}</p>

            <h2>Create a New Room</h2>
            <form onSubmit={handleCreateRoom}>
                <input 
                    type="text"
                    placeholder='Room Name'
                    value={newRoomName}
                    onChange={(e) => setNewRoomName(e.target.value)}
                    required
                />
                <button type='submit'>Create Room</button>
            </form>
            <hr />

            <h2>Your Rooms</h2>
            {rooms.length === 0 ? (
                <p>You are not in any rooms yet. Create one!</p>
            ) : (
                <ul>
                    {rooms.map(room => (
                        <li key={room._id}>
                            {room.name}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default Dashboard