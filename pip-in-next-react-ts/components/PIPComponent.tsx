"use client";

import React, { useState, useEffect } from "react";
import "./PIPComponent.css";

const PIPComponent = () => {
  const [isPiPActive, setIsPiPActive] = useState(false);

  useEffect(() => {
    const video = document.getElementById("video");
    const pipButton = document.getElementById("pipButton");

    if (!video || !pipButton) {
      console.error("Video element or PiP button not found");
      return;
    }

    const handlePiPChange = () => {
      setIsPiPActive(document.pictureInPictureElement !== null);
    };

    pipButton.addEventListener("click", () => {
      if (document.pictureInPictureElement) {
        document.exitPictureInPicture().catch((error) => {
          console.error("Error while exiting PiP mode:", error);
        });
      } else {
        if (
          document.pictureInPictureEnabled &&
          video instanceof HTMLVideoElement
        ) {
          video.requestPictureInPicture().catch((error) => {
            console.error("Error while entering PiP mode:", error);
          });
        } else {
          console.error("Picture-in-Picture mode is not supported");
        }
      }
    });

    video.addEventListener("enterpictureinpicture", handlePiPChange);
    video.addEventListener("leavepictureinpicture", handlePiPChange);

    return () => {
      video.removeEventListener("enterpictureinpicture", handlePiPChange);
      video.removeEventListener("leavepictureinpicture", handlePiPChange);
    };
  }, []);

  return (
    <div className="video-container">
      <video
        id="video"
        controls
        src="https://rawcdn.githack.com/Freshman-tech/custom-html5-video/911e6fbfc39d670cb26e94d6f3013b9426f4a679/video.mp4"
      ></video>
      <button
        id="pipButton"
        className={`btn btn-lg btn-primary ${isPiPActive ? "active" : ""}`}
      >
        {isPiPActive
          ? "Exit Picture-in-Picture mode"
          : "Enter Picture-in-Picture mode"}
      </button>
    </div>
  );
};

export default PIPComponent;
