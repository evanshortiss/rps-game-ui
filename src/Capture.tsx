import { useEffect, useRef, useState } from 'react'

function isMobileDevice () {
  return navigator.userAgent.match(/ipod|ipad|iphone|android/gi)
}

function Capture () {
  const videoRef = useRef<HTMLVideoElement|null>(null);
  const canvasRef = useRef<HTMLCanvasElement|null>(null);
  const [imageData, setImageData] = useState<string|undefined>()

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

  return (
    <div>
      <div>
        <button hidden={imageData ? true : false} onClick={() => captureMove()}>Capture Move</button>
        <button hidden={imageData ? false : true} onClick={() => discardMove()}>Discard Move</button>
        <br />
        <br />
        <video hidden={imageData ? true : false} ref={videoRef} autoPlay playsInline muted />
        <canvas hidden={imageData ? false : true} ref={canvasRef}></canvas>
      </div>
    </div>
  );
}

export default Capture