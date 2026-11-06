
"use client";
import './model.css';

export default function ResultModal({status, setStatus, open, setOpen, modalContent}) {
  const data = modalContent[status];
  const colors = {
    green: "bg-green-600 hover:bg-green-700",
    yellow: "bg-yellow-500 hover:bg-yellow-600",
    red: "bg-red-600 hover:bg-red-700",
    blue: "bg-blue-600 hover:bg-blue-700",
  };
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-5">

      {/* Result Modal */}
      {open && (
        <div className="fixed inset-0 z-50 flex items-center
          justify-center bg-black/60 backdrop-blur-sm p-4">

          <div
            key={status}
            className={`w-full max-w-md bg-white rounded-3xl 
              shadow-2xl p-8 text-center ${data?.animation}`}
          >

            {/* Icon */}
            <div className="text-7xl mb-5 animate-bounce">
              {data?.icon}
            </div>

            {/* Heading */}
            <h2 className="text-3xl font-extrabold text-gray-800">
              {data?.title}
            </h2>

            {/* Message */}
            <p className="text-gray-500 mt-3 leading-7">
              {data?.message}
            </p>

            {/* Action */}
            <button
              onClick={() => {setOpen(false);window.location.reload();}}
              className={`w-full mt-8 py-3.5 rounded-xl cursor-pointer
                text-white font-bold transition-all
                duration-300 hover:scale-105
                ${colors[data?.color]}`}
            >
              {data?.button}
            </button>

            {/* Close */}
            <button
              onClick={() => {setOpen(false);window.location.reload();}}
              className="mt-4 text-sm text-gray-400 cursor-pointer
                hover:text-gray-700"
            >
              Close
            </button>

          </div>
        </div>
      )}

    </div>
  );
}
