
// import React from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useHotels } from '../hooks/useHotels';


const Hotels = () => {
    const { data: hotels, isLoading, error } = useHotels();
    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error loading hotels!</div>;
    }
    const [search, setSearch] = useState("");
    const filteredHotels = (hotels || []).filter((hotel: Hotel) => {
        return hotel.name.toLowerCase().includes(search.toLowerCase()) ||
            hotel.description.toLowerCase().includes(search.toLowerCase())
    }

    );
    return (
        <div>
            <h2>Hotels in Tehran</h2>
            <input
                type="text"
                placeholder="Search hotels..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />
            <ul>
                {filteredHotels.map((hotel: Hotel) => (
                    <li key={hotel.id}>
                        <h3>
                            <Link to={`/hotels/${hotel.id}`}>{hotel.name}</Link>
                        </h3>
                        <p>{hotel.description}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Hotels;



