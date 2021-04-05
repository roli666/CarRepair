import { useEffect } from 'react';
import { ClientGrid } from './grids/ClientGrid';

export function ClientEditor() {

    //initialization
    useEffect(() => {
        (async () => {
            
        })();
    }, []);

    return (
        <div>
            <h1>Client Editor</h1>
            <ClientGrid></ClientGrid>
        </div>
    );
}