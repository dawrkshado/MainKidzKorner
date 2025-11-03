import { useEffect, useMemo } from "react";

export const useWithSound = (soundSource) => {
    const audio = useMemo(() => new Audio(soundSource), [soundSource]);
    useEffect(() => {
        audio.load();

        return () => {
            audio.pause();
            audio.currentTime = 0;
        };
    }, [audio]);
 
    const playSound = () => {
      
        audio.currentTime = 0; 
        
       
        audio.play().catch(error => {
            console.error("Audio playback blocked by browser:", error);
      
        });
    };
    
    const stopSound = () => {
        audio.pause();
        audio.currentTime = 0;
    };

    return { playSound, stopSound };
};