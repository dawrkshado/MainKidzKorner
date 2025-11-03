import 'react-router-dom'
import Back from '../components/Back';
import api from '../api';

function StudentManagement(){
    


    return(
        <div className="hidden md:inline md:absolute   overflow-x-hidden">
            <Back/>

            <img src="./Bg/bground.webp" alt="background" className="w-full"/>
        </div>
    );
}
export default StudentManagement;