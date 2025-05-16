import React from 'react'
import { CiFacebook } from "react-icons/ci";
import { FaInstagram } from "react-icons/fa";

const Footer = () => {
    return (
        <footer className="bg-gradientPrimary ">
            <div className="w-full mx-auto max-w-screen-xl p-4 flex items-center justify-between">
                <span className="text-xl text-txtCard">© 2025 HVHK - Nhóm 06</span>
                <ul className="flex items-center text-3xl font-medium text-txtCard space-x-4">
                    <li><CiFacebook /></li>
                    <li><FaInstagram /></li>
                </ul>
            </div>
        </footer>
    )
}

export default Footer