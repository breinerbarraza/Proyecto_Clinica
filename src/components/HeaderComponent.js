import React from 'react'
import './header.css';
import { Link } from 'react-router-dom'
export const HeaderComponent = () => {
    return (
        <div className="header">
            <Link to="/registro">
                    <button ><i className="fas fa-user-plus "></i></button>
            </Link>
                    <button><i className="fas fa-chart-line"></i></button>
        </div>
    )
}
