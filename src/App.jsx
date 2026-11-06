import { useState,useRef } from 'react'
import './App.css';
import ResultModal from './model';

function App() {
  const [playerSpot, setPlayerSpot] = useState('ready');
  const [count, setCount] = useState(1);
  const [hasPlayed, setHasPlayed] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [status, setStatus] = useState("");
  const [open, setOpen] = useState(false);

  const audioRef = useRef(null);
  const modalContent = {
    success: {
      icon: "🏆",
      title: "You Won!",
      message: "Congratulations! You remembered every beat perfectly!",
      button: "Congrats",
      color: "green",
      animation: "success-pop",
    },
  
    almost: {
      icon: "🎯",
      title: "Almost There!",
      message: "You were so close! Just a little more practice and you'll master it.",
      button: "Try Again",
      color: "yellow",
      animation: "modal-pop",
    },
  
    failed: {
      icon: "💪",
      title: "Better Luck Next Time!",
      message: "Don't give up! Every attempt makes you better. Give it another shot!",
      button: "Play Again",
      color: "red",
      animation: "modal-pop",
    }
  };

  const playAudio = async () => {
    setIsPlaying(true);

    try {
      await audioRef.current.play();
    } catch (error) {
      console.error("Audio playback failed:", error);
      setHasPlayed(false);
      setIsPlaying(false);
    }
  };

  const handleAudioEnd = () => {
    setIsPlaying(false);
    setHasPlayed(true);
    setIsFinished(true);
  };
  const handleGameAction = (type) =>{
    setPlayerSpot(type);
  }
  const handleSubmit = () =>{
    setOpen(true);
    if(count == 8){
      setStatus('success');     
    }else if(count == 7 || count == 9){
      setStatus('almost');
    }else{
      setStatus('failed');
    }
  }
  return (

    <div className="min-h-screen bg-gradient-to-r from-[#141E30] via-[#243B55] to-[#4776E6] flex items-center justify-center overflow-x-hidden">
      <div className='min-w-[80%] min-h-[80vh]  bg-white/25 backdrop-blur-xl border border-white/20 rounded-2xl p-6 shadow-[0_0_35px_#4776E6] text-white' >
          {/* header section */}
          <div>
             <div className='text-center mt-5'>
                <h1 className='font-bold text-4xl'>Beat Finder Game</h1>
             </div>
             <div className='mx-20 mt-5'>
              <h5 className='font-bold text-xl p-2'>✨ GAME INSTRUCTION ✨</h5>
                <ul className='px-6'>
                  <li>Listen carefully to the audio file provided below. It contains a drumbeat rhythm.</li>
                  <li>Pay close attention to the beat pattern and try to memorize it.</li>
                  <li>Once you have listened to the audio, a counting section will appear.</li>
                  <li>Enter the number of beats you heard in the audio.</li>
                  <li>Submit your answer to check whether you remembered the drumbeat correctly.</li>
                </ul>
              <h6 className='mt-4 mx-2 font-extrabold animate-pulse text-[#F4B400]'>📢 Note: <span>You can listen to the beat only once, so listen carefully!</span></h6>
             </div>
          </div> 
          {/* body section */}
          <div className=' w-[90%] m-auto h-[400px] mt-5 flex items-center justify-center'>
          {/* Game ready section */}
          {playerSpot == 'ready' && 
          (<div className='items-center justify-center flex flex-col'>
            <p className='text-2xl font-bold'>Is everything clear? If so, let’s get started!</p>
              <button className="animate-[gameBounce_1s_ease-in-out_infinite]
                  text-center mt-8 px-10 py-4 rounded-xl
                  text-white text-lg font-extrabold
                  bg-gradient-to-r from-[#141E30] via-[#243B55] to-[#4776E6]
                  shadow-[0_0_20px_#4776E6]
                  hover:scale-105 hover:animate-none hover:shadow-[0_0_35px_#4776E6]
                  active:scale-95 transition-all duration-300 cursor-pointer"
                  onClick={() => handleGameAction('play')}>
                ▶ START GAME
              </button>
          </div>)}
          {/* Play section */}
          {playerSpot == 'play' && 
          (<div className='items-center justify-center flex flex-col'>
            {!hasPlayed && <p className='text-2xl font-bold'>🎵 Listen to the beat carefully!</p>}
            <div>
              {!hasPlayed && 
                <>
                  <audio
                ref={audioRef}
                src="/audio/drum-beat.mp3"
                onEnded={handleAudioEnd}
                preload="auto"
              />
                <button
                onClick={playAudio}
                disabled={hasPlayed}
                className={`text-center mt-8 px-10 py-4 rounded-xl
                  text-white text-lg font-extrabold
                  ${
                    hasPlayed
                      ? "bg-gray-600 text-gray-400 cursor-not-allowed"
                      : "bg-gradient-to-r from-[#141E30] via-[#243B55] to-[#4776E6] shadow-[0_0_20px_#4776E6] hover:scale-105 hover:animate-none hover:shadow-[0_0_35px_#4776E6]active:scale-95 transition-all duration-300 cursor-pointer"
                  }`}
              >
                {isPlaying ? "Playing..." : hasPlayed ? "Already Played" : "▶ Play Beat"}
              </button></>}

              {isFinished && (
                <div className="mt-8 text-center">
                  <p className="text-green-400 text-xl font-semibold">
                    Audio Completed!
                  </p>

                  <p className="text-gray-300 mt-2">
                    Now enter the number of beats you heard.
                  </p>

                <div className="flex items-center gap-5 bg-neutral-900 text-white rounded-xl p-3 w-fit mx-50 mt-3">
                    <button onClick={() => setCount(Math.max(0, count - 1))} className="w-10 h-10 rounded-lg border border-neutral-700 hover:bg-neutral-700" > − </button>
                    <span className="text-2xl font-bold">{count}</span>
                    <button onClick={() => setCount(count + 1)} className="w-10 h-10 rounded-lg bg-white text-black hover:bg-gray-200" > +</button>
                </div>
              </div>)}
              </div>
          </div>)}
        </div>
          {isFinished && <div className='float-right'>
              <button onClick={handleSubmit} className="text-center mt-8 px-10 py-4 rounded-xl
                  text-white text-lg font-extrabold
                  bg-gradient-to-r from-[#141E30] via-[#243B55] to-[#4776E6]
                  shadow-[0_0_20px_#4776E6]
                  hover:scale-105 hover:shadow-[0_0_35px_#4776E6]
                  active:scale-95 cursor-pointer">Submit</button>
          </div>}
      </div>
    {open && <ResultModal status={status} setStatus={setStatus} open={open} setOpen={setOpen} modalContent={modalContent}/>}
    </div>
  )
}

export default App
