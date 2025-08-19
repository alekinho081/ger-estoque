import React from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router";


export const  Header = () => {
    let location = useLocation()
    let navigate = useNavigate();

    const currentPath = location.pathname

    console.log(currentPath)

    return (
        <header>
            <h1>Controle de Estoque</h1>

            
            {currentPath  === '/' ? console.log('legal') : <button onClick={() => {navigate(-1)}}> Voltar</button> }
        </header>
    )
}

export default Header