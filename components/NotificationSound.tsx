"use client";

import { useEffect, useRef } from 'react';

const NotificationSound = () => {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audioElement = audioRef.current;
    if (audioElement) {
      audioElement.play();
    }
  }, []);

  return (
    <audio ref={audioRef} src="notification.mp3" preload="auto" />
  );
};

export default NotificationSound;
