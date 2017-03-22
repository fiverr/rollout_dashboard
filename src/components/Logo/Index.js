import React from 'react';
import './Logo.scss';

const Logo = () => {
    return (
        <div className="logo"> 
            <img src="./rollout.png" alt="Rollout dashboard"/>
            <img src="./gear.png" className="gear" alt="gear" />
        </div>
    );
} 

export default Logo;