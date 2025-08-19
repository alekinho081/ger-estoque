import React from "react";
import { useNavigate } from "react-router";


export const Menu = () => {
    let navigate = useNavigate();


    return(
        <div>
            
            
            <button onClick={() => navigate('/lancamento')}>Lançamentos</button>
            <button onClick={() => navigate('/estoque')}>Estoque</button>

        </div>

    )
}