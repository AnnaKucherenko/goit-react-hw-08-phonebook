import React from "react";

export const ContactsSvgSelector = ({id})=>{
    switch (id){
        case 'address-book':
            return (
                <svg version="1.1"  xmlns="http://www.w3.org/2000/svg" width="16" height="15" viewBox="0 0 32 32">
                <title>address-book</title>
                <path d="M6 0v32h24v-32h-24zM18 8.010c2.203 0 3.99 1.786 3.99 3.99s-1.786 3.99-3.99 3.99-3.99-1.786-3.99-3.99 1.786-3.99 3.99-3.99v0zM24 24h-12v-2c0-2.209 1.791-4 4-4v0h4c2.209 0 4 1.791 4 4v2z " ></path>
                <path d="M2 2h3v6h-3v-6z"></path>
                <path d="M2 10h3v6h-3v-6z"></path>
                <path d="M2 18h3v6h-3v-6z"></path>
                <path d="M2 26h3v6h-3v-6z"></path>
                </svg>   
            );
    default:
        return <svg></svg>;
    }
}