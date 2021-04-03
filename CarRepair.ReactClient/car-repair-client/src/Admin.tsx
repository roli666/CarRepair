import React, { useEffect, useState } from 'react';
import { WeatherService } from './api/WeatherService';
import { JobGrid } from 'JobGrid';

export function Admin() {

    //initialization
    useEffect(() => {
        (async () => {
            
        })();
    }, []);

    return (
        <div>
            <h1>Administration</h1>
            <JobGrid></JobGrid>
        </div>
    );
}