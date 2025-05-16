import { CiSearch } from "react-icons/ci";
import React from "react";

const Search = ({ placeholder, value, onChange }) => {
    return (
        <div className="relative w-96">
            <input
                type="text"
                placeholder={placeholder}
                value={value} 
                onChange={onChange} 
                className="w-full px-4 py-2 pl-10 border border-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <CiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-txtCard text-xl" />
        </div>
    );
};

export default Search;
