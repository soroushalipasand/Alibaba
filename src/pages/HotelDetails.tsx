import { useParams } from "react-router-dom";
import React, { lazy } from "react";
import { useHotelDetail } from "../hooks/useHotelDetail";
const MapComponent = lazy(() => import("../components/MapComponent"));
const HotelDetails = () => {
    const { id } = useParams();
    const { data: hotel, isLoading, error } = useHotelDetail(id);
    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error loading hotel details!</div>;
    return (
        <>
            {hotel && (
                <div>
                    <h2>{hotel.name}</h2>
                    <p>{hotel.description}</p>
                    <p>
                        Location:
                        {hotel.location
                            ? `${hotel.location.long}, ${hotel.location.lat}`
                            : "Location not available"}
                    </p>
                </div>
            )}
            {hotel && (
                <MapComponent
                    lat={hotel.location?.lat}
                    long={hotel.location?.long}
                    description={hotel.description}
                    name={hotel.name}
                />
            )}
        </>
    );
};

export default HotelDetails;
