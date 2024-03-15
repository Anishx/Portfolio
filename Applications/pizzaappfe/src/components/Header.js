import React from 'react';
import LogoImage from '../img/pizzalogo.png';
import LogoTexture from '../img/textures/logotexture.png';

export default function Header(props) {
    const Logo = props => (
        <div>
            <img id="logo" src={LogoImage} alt="Pizza Inc." />
            <img id="logotexture" src={LogoTexture} alt="Pizzatexture Inc." />
        </div>
    );
    return (
        <>
            <Logo />
        </>
    )
}

