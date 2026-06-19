import { useState  } from "react";  
import { FiSearch } from "react-icons/fi";

export default function SearchBar ({onSearch}) {
    const [query, setQuery] = useState("");

    const handleSearch = () => {
        if (!query.trim()) return;
        onSearch(query);
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            handleSearch();
        };
    };

    return (
        <div className="flex items-center gap-[10px] w-full lg:w-auto">

            <div className="relative flex-1 lg:flex-none">
                <input 
                    type="text" 
                    placeholder="Search Photos" 
                    value={query} 
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyDown={handleKeyDown}
                    className="w-full lg:w-[250px] h-[41px] px-[35px] border border-gray-300 rounded-[8px] outline-none focus:ring-2 focus:ring-blue-500"
                />

                <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            </div>

            <button
                onClick={handleSearch}
                className="px-[15px] h-[41px] bg-blue-600 text-white text-[18px] rounded-lg hover:bg-blue-700 transition">
                Search
            </button>
        </div>
    )
}