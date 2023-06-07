import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom';

function isMobileDevice () {
  return navigator.userAgent.match(/ipod|ipad|iphone|android/gi)
}

function Capture () {
  const videoRef = useRef<HTMLVideoElement|null>(null);
  const canvasRef = useRef<HTMLCanvasElement|null>(null);
  const [imageData, setImageData] = useState<string|undefined>()
  const [move, setMove] = useState<string>("");
  const navigate = useNavigate();

  useEffect(() => {
    getVideoStream()
  }, [videoRef])

  async function getVideoStream () {
    const stream = await navigator.mediaDevices.getUserMedia({
      video: {
        width: 300,
        facingMode: isMobileDevice() ? 'environment' : 'user'
      }
    })
    
    const video = videoRef.current;
    
    if (video) {
      video.srcObject = stream;
      video.play();
    }
  }

  function captureMove () {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');

    if (canvas && video && ctx) {
      const width = 320;
      const height = 240;
      
      canvas.width = width;
      canvas.height = height;

      ctx.drawImage(video, 0, 0, width, height);

      setImageData(canvas.toDataURL())
    }
  }

  function discardMove () {
    setImageData(undefined)
  }

  function selectMove(choice: string) {
    setMove(choice);
  }

  function submitMove() {
    if (move) {
      // Code to submit the move.
      navigate("/results");
    }
  }

  return (
    <div>
      <div>
        <button hidden={imageData ? true : false} onClick={() => captureMove()}>Capture Move</button>
        <button hidden={imageData ? false : true} onClick={() => discardMove()}>Discard Move</button>
        <br />
        <br />
        <video hidden={imageData ? true : false} ref={videoRef} autoPlay playsInline muted />
        <canvas hidden={imageData ? false : true} ref={canvasRef}></canvas>
        <br />
        <br />
        <button onClick={() => selectMove("rock")} >🪨</button>
        <button onClick={() => selectMove("paper")} >🧻</button>
        <button onClick={() => selectMove("scissors")} >✂️</button>
        <br />
        <br />
        <button onClick={submitMove}>Submit Move</button>
      </div>
      {move && <h2>You have selected {move}</h2>}
    </div>
  );
}

export default Capture;
