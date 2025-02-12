import React, { useRef, useState } from "react";
import { Camera, RefreshCw, FlipHorizontal } from "lucide-react";

const CameraCapture = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [capturedImage, setCapturedImage] = useState(null);
  const [stream, setStream] = useState(null);
  const [error, setError] = useState(null);
  const [facingMode, setFacingMode] = useState("environment"); // 'environment' is back camera, 'user' is front camera

  const openCamera = async () => {
    try {
      setError(null);
      // Stop any existing stream
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }

      const constraints = {
        video: {
          facingMode: facingMode,
          width: { ideal: 1920 },
          height: { ideal: 1080 }
        }
      };

      const mediaStream = await navigator.mediaDevices.getUserMedia(constraints);
      
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
        // Ensure video is ready before allowing capture
        videoRef.current.onloadedmetadata = () => {
          videoRef.current.play();
        };
      }
      setStream(mediaStream);
    } catch (error) {
      console.error("Error accessing camera:", error);
      if (error.name === 'NotAllowedError') {
        setError("Camera access denied. Please check your browser permissions.");
      } else if (error.name === 'NotFoundError') {
        setError("No camera found. Please ensure your device has a camera.");
      } else {
        setError("Error accessing camera. Please try again.");
      }
    }
  };

  const switchCamera = async () => {
    setFacingMode(prevMode => prevMode === "environment" ? "user" : "environment");
    await openCamera();
  };

  const capturePhoto = () => {
    const canvas = canvasRef.current;
    const video = videoRef.current;
    if (canvas && video) {
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const context = canvas.getContext("2d");
      
      // Flip the image horizontally if using front camera
      if (facingMode === "user") {
        context.scale(-1, 1);
        context.translate(-canvas.width, 0);
      }
      
      context.drawImage(video, 0, 0, canvas.width, canvas.height);
      const imageData = canvas.toDataURL("image/jpeg", 0.8); // Using JPEG for smaller file size
      setCapturedImage(imageData);
      stopCamera();
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
  };

  const retakePhoto = () => {
    setCapturedImage(null);
    openCamera();
  };

  // Check if the device has multiple cameras
  const [hasMultipleCameras, setHasMultipleCameras] = useState(false);
  
  React.useEffect(() => {
    // Check available media devices when component mounts
    const checkDevices = async () => {
      try {
        const devices = await navigator.mediaDevices.enumerateDevices();
        const videoDevices = devices.filter(device => device.kind === 'videoinput');
        setHasMultipleCameras(videoDevices.length > 1);
      } catch (error) {
        console.error('Error checking media devices:', error);
      }
    };
    
    checkDevices();
  }, []);

  return (
    <div className="flex flex-col items-center w-full max-w-lg mx-auto p-4 space-y-4">
      <h2 className="text-2xl font-bold text-gray-800">Camera Capture</h2>
      
      {error && (
        <div className="w-full p-4 bg-red-50 text-red-600 rounded-lg">
          {error}
        </div>
      )}

      <div className="relative w-full aspect-[4/3] bg-gray-100 rounded-lg overflow-hidden">
        {!capturedImage ? (
          <video
            ref={videoRef}
            autoPlay
            playsInline
            className={`absolute inset-0 w-full h-full object-cover ${facingMode === "user" ? "scale-x-[-1]" : ""}`}
          />
        ) : (
          <img
            src={capturedImage}
            alt="Captured"
            className="absolute inset-0 w-full h-full object-cover"
          />
        )}
      </div>

      <div className="flex flex-wrap gap-4 w-full justify-center">
        {!capturedImage ? (
          <>
            {!stream && (
              <button
                onClick={openCamera}
                className="flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 w-full sm:w-auto"
              >
                <Camera className="w-5 h-5" />
                Open Camera
              </button>
            )}
            
            {stream && (
              <>
                <button
                  onClick={capturePhoto}
                  className="flex items-center justify-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 w-full sm:w-auto"
                >
                  Take Photo
                </button>

                {hasMultipleCameras && (
                  <button
                    onClick={switchCamera}
                    className="flex items-center justify-center gap-2 px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
                  >
                    <FlipHorizontal className="w-5 h-5" />
                    Switch Camera
                  </button>
                )}
              </>
            )}
          </>
        ) : (
          <button
            onClick={retakePhoto}
            className="flex items-center justify-center gap-2 px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 w-full sm:w-auto"
          >
            <RefreshCw className="w-5 h-5" />
            Retake Photo
          </button>
        )}
      </div>

      <canvas ref={canvasRef} className="hidden" />
    </div>
  );
};

export default CameraCapture;