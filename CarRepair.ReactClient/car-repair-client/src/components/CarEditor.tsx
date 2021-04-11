import { Container } from '@material-ui/core';
import React, { useEffect } from 'react';
import { CarGrid } from './grids/CarGrid';

export function CarEditor() {

    //initialization
    useEffect(() => {
        (async () => {
            
        })();
    }, []);

    return (
        <Container>
            <h1>Car Editor</h1>
            <CarGrid></CarGrid>
        </Container>
    );
}