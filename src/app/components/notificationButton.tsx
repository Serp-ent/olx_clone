'use client';
import { useEffect, useRef, useState } from "react";
import { BsBell, BsBellFill } from "react-icons/bs";

export default function NotificationButton() {
  const [showPopup, setShowPopup] = useState(false);
  const popupRef = useRef(null);

  const handleClickOutside = (e) => {
    if (popupRef.current && !popupRef.current.contains(e.target)) {
      setShowPopup(false);
    }
  }

  useEffect(() => {
    // Add event listener for clicks outside the popup
    document.addEventListener('mousedown', handleClickOutside);

    // Cleanup the event listener on component unmount
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="relative">
      <button
        onClick={() => setShowPopup(prev => !prev)}
        className="grow-0 text-primary"
      >
        {showPopup ? <BsBellFill size={22} /> : <BsBell size={22} />}
      </button >

      {showPopup && (
        <section
          className="absolute bg-blue-600 p-4 w-48 text-sm rounded-lg shadow-lg text-white right-0 mt-2 transition-opacity duration-200"
          ref={popupRef}
        >
          <h4 className="font-semibold">Notifications</h4>
          <p>This is some kind of notification</p>
          <button
            onClick={() => setShowPopup(false)} // Option to close the popup
            className="mt-2 text-blue-200 hover:underline"
          >
            Close
          </button>
        </section>
      )}
    </div>
  );
}