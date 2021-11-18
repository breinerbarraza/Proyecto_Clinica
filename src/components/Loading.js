import React from 'react'
import { Spinner } from 'reactstrap';
import './Loading.css';

export const Loading = () => {
    return (
        <div className="divPadre">
            <div className="divHijo">
                <Spinner color="dark" />
            </div>
        </div>
    )
}
