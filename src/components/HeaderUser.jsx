import { useState, useRef, useEffect } from "react";

export default function HeaderUser({ navigate, handleLogout }) {
  const user = JSON.parse(localStorage.getItem("user")) || {};
  const inisial = user?.name?.charAt(0)?.toUpperCase() || "?";
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef();

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setShowDropdown((prev) => !prev)}
        className="bg-blue-600 text-white text-lg font-bold w-10 h-10 flex items-center justify-center rounded-full shadow focus:outline-none"
      >
        {inisial}
      </button>

      {showDropdown && (
        <div className="absolute right-0 mt-2 w-40 bg-white rounded-md shadow-lg z-50">
          <button
            onClick={() => {
              setShowDropdown(false);
              navigate("/profil");
            }}
            className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
          >
            Profil
          </button>
          <button
            onClick={() => {
              setShowDropdown(false);
              handleLogout();
            }}
            className="block w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
}
