import * as d3 from "d3";
import { useRef, useEffect, useState } from "react";
import { useGetGreenBallot } from "../../shared/hooks/statistics/useGetGreenBallot";
import { io } from 'socket.io-client';
import Navbar from './../../components/Nabvar/Navbar';
import './Statistics.css';
import { PresidentialStatistics } from "../../components/PresidentialStatistics/PresidentialStatistics";
import { NationalListStatistics } from "../../components/NationaListStatistics/NationalListStatistics";
 
export const Statistics = () => {
    const { isLoading, greenBallot, getGreenBallotsApi } = useGetGreenBallot();
    const [data, setData] = useState([]);
    const [whiteData, setWhiteData] = useState([]);
    const [view, setView] = useState(1);
    const svgRef = useRef();
 
    const userName = 'Joshua Elí Isaac';
    const surname = 'Realiquez Sosa';
    const userDPI = '1234561010101';
    const pageTitle = 'ESTADISTICAS | 2024';
 
    return (
        <div className="page-container">
            <Navbar userName={userName} surname={surname} userDPI={userDPI} pageTitle={pageTitle} />
            <div className="outer-container" style={{backgroundColor: view==1 ? 'rgba(255, 255, 255, 0.925)' : 'rgba(200, 242, 179, 0.925)'}}>
                <div className="header-container">
                    <div className="header-content">
                        <img src="https://tse.org.gt/images/logo_TSE_-_PNG_TRANSPARENTE_-_200_DPI.png" alt="Tribunal Supremo Electoral" className="header-logo" />
                        <div className="header-text">
                            {view === 1 ? (
                                <h1>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; ELECCIÓN DE PRESIDENTE Y VICEPRESIDENTE -2024-</h1>
                            ) : (
                                <h1>ELECCIÓN DE DIPUTADOS AL CONGRESO DE LA REPÚBLICA POR LISTA NACIONAL -2024-</h1>
                            )}
                            <p>*Datos en vivo</p>
                        </div>
                    </div>
                    <div className="ballot-navigation">
                        <button className="btn button-white" onClick={() => setView(1)}>Presidenciables</button>
                        <button className="btn button-green" onClick={() => setView(2)}>Lista Nacional</button>
                    </div>
                </div>
 
                {view === 1 ? (
                    <PresidentialStatistics />
                ) : view === 2 ? (
                    <NationalListStatistics />
                ) : (
                    'Estadística no encontrada...'
                )}
            </div>
        </div>
    );
};
 
