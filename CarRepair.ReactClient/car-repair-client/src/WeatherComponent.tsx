import React, { useEffect, useState } from 'react';
import { WeatherService } from './api/WeatherService';
import { WeatherForecast } from "./api/models/WeatherForecast"
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core';

export function Weather() {
    const [weatherData, setWeatherData] = useState<WeatherForecast[]>([])

    //initialization
    useEffect(() => {
        (async () => {
            const result = await WeatherService.getWeather()
            if (result)
                setWeatherData(result);
            else
                console.log("no data")
        })();
    }, []);

    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell align="center">Date</TableCell>
                        <TableCell align="center">Summary</TableCell>
                        <TableCell align="center">TemperatureC</TableCell>
                        <TableCell align="center">TemperatureF</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {weatherData.map((row, key) => (
                        <TableRow key={key}>
                            <TableCell>{row.Date}</TableCell>
                            <TableCell>{row.Summary}</TableCell>
                            <TableCell>{row.TemperatureC}</TableCell>
                            <TableCell>{row.TemperatureF}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}