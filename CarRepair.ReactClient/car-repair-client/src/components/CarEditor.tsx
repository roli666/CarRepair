import { useEffect } from 'react';
import { CarGrid } from './grids/CarGrid';

export function CarEditor() {

    //initialization
    useEffect(() => {
        (async () => {
            
        })();
    }, []);

    return (
        <div>
            <h1>Car Editor</h1>
            <CarGrid></CarGrid>
        </div>
    );
}