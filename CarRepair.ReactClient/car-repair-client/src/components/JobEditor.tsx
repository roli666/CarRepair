import React, { useEffect, useState } from 'react';
import { JobGrid } from './grids/JobGrid';

export function JobEditor() {

    //initialization
    useEffect(() => {
        (async () => {
            
        })();
    }, []);

    return (
        <div>
            <h1>Job Editor</h1>
            <JobGrid></JobGrid>
        </div>
    );
}