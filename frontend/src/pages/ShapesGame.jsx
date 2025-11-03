
import { Link } from "react-router-dom";
import Seasy from "../assets/Shapes/Seasy.png";
import Smedium from "../assets/Shapes/Smedium.png";
import Shard from "../assets/Shapes/Shard.png";
import Back from "../components/Back.jsx";
import { useEffect } from "react";
import backgroundMusic from "../assets/Sounds/background.mp3"; 
import useSound from 'use-sound';
import clickSfx from '../assets/Sounds/button_click.mp3'; 

function ShapesGame() {
    const [playClick] = useSound(clickSfx, { volume: 0.5 });
    useEffect(() => {
               const bgSound = new Audio(backgroundMusic);
                bgSound.loop = true;
                bgSound.volume = 0.2;
        
                bgSound.play().catch((err) => {
                    console.log("Autoplay blocked. User must interact to enable sound.", err);
                });
        
                return () => {
                    bgSound.pause();
                    bgSound.currentTime = 0;
                };
            }, []); 

    return (
        <>
        <div className="hidden w-full h-full md:inline md:absolute h-auto overflow-hidden">
        <div > <Back/></div>
        <img
        src="./Bg/Shapes/shapegamebg.webp"
        alt="background"
        className="w-full"
        />
        <Link to="/shapes/easy" onClick={playClick}>
        <img
        src={Seasy}
        alt="Easy Button"
        className="absolute left-[5%] top-[15%] w-autocursor-pointer"
        />
        </Link>
        <Link to="/shapes/medium" onClick={playClick}>
        <img
        src={Smedium}
        alt="Medium Button"
        className="absolute left-[30%] top-[45%] w-auto cursor pointer"/>
        </Link>
        <Link to="/shapes/hard" onClick={playClick}>
        <img
        src={Shard}
        alt="Hard Button"
        className="absolute left-[55%] top-[75%] w-auto cursor pointer"/>
        </Link>

        </div>
        </>
    );
}

export default ShapesGame;
