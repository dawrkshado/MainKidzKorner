import React, { useState,useEffect } from "react"
import { Route, Routes, Navigate } from "react-router-dom"
import { Helmet } from "react-helmet"
import api from "./api.js"
import { TimeProvider } from "./TimeProvider.jsx";
import LockOverlay from "./components/LockOverlay.jsx";
import UnlockOverlay from "./components/UnlockOverlay";


import Home from "./pages/Home.jsx"
import Login from "./pages/Login.jsx"
import About from "./pages/About.jsx"
import NotFound from "./pages/NotFound.jsx"
import ScrollToTop from "./components/ScrollToTop.jsx"

import Stories from "./pages/Stories.jsx"
import Story1 from "./pages/Story1.jsx"
import Story2 from "./pages/Story2.jsx"
import Story3 from "./pages/Story3.jsx"

import Shapes from "./pages/Shapes.jsx"
import ShapesEasy from "./pages/ShapesEasy.jsx"
import ShapesMedium from "./pages/ShapesMedium.jsx"
import ShapesHard from "./pages/ShapesHard.jsx"
import ShapesEasylevel1 from "./pages/ShapesEasyLevel1.jsx"
import ShapesEasylevel2 from "./pages/ShapesEasyLevel2.jsx"
import ShapesEasylevel3 from "./pages/ShapesEasyLevel3.jsx"
import ShapesMediumLevel1 from "./pages/ShapesMediumLevel1.jsx"
import ShapesMediumLevel2 from "./pages/ShapesMediumLevel2.jsx"
import ShapesHardLevel1 from "./pages/ShapesHardLevel1.jsx"

import Number from "./pages/Number.jsx"
import NumbersEasy from "./pages/numbersEasy.jsx"
import NumbersMedium from "./pages/numbersMedium.jsx"
import NumbersHard from "./pages/numbersHard.jsx"
import NumberGameEasy1 from "./pages/NumberGameEasy1.jsx"
import NumberGameEasy2 from "./pages/NumberGameEasy2.jsx"
import NumberGameEasy3 from "./pages/NumberGameEasy3.jsx"
import NumberGameMed1 from "./pages/NumberGameMed1.jsx"
import NumberGameMed2 from "./pages/NumberGameMed2.jsx"
import NumberHard1 from "./pages/NumberHard1.jsx"


import AlphabetsPlay from "./pages/AlphabetsPlay.jsx"
import AlphabetEasyTuts from "./pages/AlphabetEasyTuts.jsx";  
import AlphabetEasy from "./pages/AlphabetEasy.jsx"
import AlphabetMedium from "./pages/AlphabetMedium.jsx"
import AlphabetHard from "./pages/AlphabetHard.jsx"
import AlphabetEasy1 from "./pages/AlphabetEasy1.jsx"
import AlphabetEasy2 from "./pages/AlphabetEasy2.jsx"
import AlphabetEasy3 from "./pages/AlphabetEasy3.jsx"
import AlphabetMedium1 from "./pages/AlphabetMedium1.jsx"
import AlphabetMedium2 from "./pages/AlphabetMedium2.jsx"
import AlphabetHard1 from "./pages/AlphabetHard1.jsx"

import A from "./pages/A.jsx"
import B from "./pages/B.jsx"
import C from "./pages/C.jsx"
import D from "./pages/D.jsx"
import E from "./pages/E.jsx"
import F from "./pages/F.jsx"
import G from "./pages/G.jsx"
import H from "./pages/H.jsx"
import I from "./pages/I.jsx"
import J from "./pages/J.jsx"
import K from "./pages/K.jsx"
import L from "./pages/L.jsx"
import M from "./pages/M.jsx"
import N from "./pages/N.jsx"
import O from "./pages/O.jsx"
import P from "./pages/P.jsx"
import Q from "./pages/Q.jsx"
import R from "./pages/R.jsx"
import S from "./pages/S.jsx"
import T from "./pages/T.jsx"
import U from "./pages/U.jsx"
import V from "./pages/V.jsx"
import W from "./pages/W.jsx"
import X from "./pages/X.jsx"
import Y from "./pages/Y.jsx"
import Z from "./pages/Z.jsx"

import TeacherHomePage from "./pages/TeacherHomePage.jsx"
import UploadContents from "./pages/UploadContents.jsx"
import DashBoard from "./pages/DashBoard.jsx"
import StudentManagement from "./pages/StudentManagement.jsx"
import UserAccControl from "./pages/UserAccControl.jsx"
import ProtectedRoute from "../src/components/ProtectedRoute.jsx"
import Overview from "./pages/overview.jsx"
import Lessons from "./pages/Lessons.jsx"
import Animals from "./pages/Newcontent/ANIMALS/Animals.jsx"
import AnimalsLesson1 from "./pages/Newcontent/ANIMALS/Lesson1/AnimalsLesson1.jsx"
import AnimalsLesson1Activity1 from "./pages/Newcontent/ANIMALS/Lesson1/AnimalsLesson1Activity1.jsx"
import AnimalsLesson1Activity2 from "./pages/Newcontent/ANIMALS/Lesson1/AnimalsLesson1Activity2.jsx"

import AnimalsLesson2 from "./pages/Newcontent/ANIMALS/Lesson2/AnimalsLesson2.jsx"
import AnimalsLesson2Activity1 from "./pages/Newcontent/ANIMALS/Lesson2/AnimalsLesson2Activity1.jsx"
import AnimalsLesson2Activity2 from "./pages/Newcontent/ANIMALS/Lesson2/AnimalsLesson2Activity2.jsx"

import AnimalsLesson3 from "./pages/Newcontent/ANIMALS/Lesson3/AnimalsLesson3.jsx"
import AnimalsLesson3Activity1 from "./pages/Newcontent/ANIMALS/Lesson3/AnimalsLesson3Activity1.jsx"
import AnimalsLesson3Activity2 from "./pages/Newcontent/ANIMALS/Lesson3/AnimalsLesson3Activity2.jsx"

import AnimalsLesson4 from "./pages/Newcontent/ANIMALS/Lesson4/AnimalsLesson4.jsx"
import AnimalsLesson4Activity1 from "./pages/Newcontent/ANIMALS/Lesson4/AnimalsLesson4Activity1.jsx"
import AnimalsLesson4Activity2 from "./pages/Newcontent/ANIMALS/Lesson4/AnimalsLesson4Activity2.jsx"

import AnimalsLesson5 from "./pages/Newcontent/ANIMALS/Lesson5/AnimalsLesson5.jsx"
import AnimalsLesson5Activity1 from "./pages/Newcontent/ANIMALS/Lesson5/AnimalsLesson5Activity1.jsx"
import AnimalsLesson5Activity2 from "./pages/Newcontent/ANIMALS/Lesson5/AnimalsLesson5Activity2.jsx"




import Color from "./pages/Color.jsx"
import ColorEasy from "./pages/ColorEasy.jsx"
import ColorGameEasyLevel1 from "./pages/ColorGameEasyLevel1.jsx"
import ColorGameEasyLevel2 from "./pages/ColorGameEasyLevel2.jsx"
import ColorGameEasyLevel3 from "./pages/ColorGameEasyLevel3.jsx"
import ColorMedium from "./pages/ColorMedium.jsx"
import ColorGameMedLevel1 from "./pages/ColorGameMedLevel1.jsx"
import ColorGameMedLevel2 from "./pages/ColorGameMedLevel2.jsx"
import ColorHard from "./pages/ColorHard.jsx"
import ColorGameHardLevel1 from "./pages/ColorGameHardLevel1.jsx"

import ShapesGame from "./pages/ShapesGame.jsx"
import ColorGame from "./pages/ColorGame.jsx"
import NumberGame from "./pages/NumberGame.jsx"

import ParentsKorner from "./pages/ParentsKorner.jsx"
import ParentalGuidance from "./pages/ParentalGuidance.jsx"
import ParentsChildRegistration from "./pages/ParentsChildRegistration.jsx"
import ParentsDashboard from "./pages/ParentsDashboard.jsx"
import StudentFilesPage from "./pages/StudentFilePage.jsx"
import { ACCESS_TOKEN } from "./constants";

import Admin from "./pages/Admin.jsx"
import CreateAcc from "./pages/CreateAcc.jsx"
import ManageAcc from "./pages/ManageAcc.jsx"
import ManageChildren from "./pages/ManageChildren.jsx"







const Alphabets = React.lazy(() => import("./pages/Alphabets.jsx"))

function App() {
  const [role, setRole] = useState(() => localStorage.getItem("userRole"));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
  const checkUser = async () => {
    const token = localStorage.getItem(ACCESS_TOKEN);
    if (!token) {
      setRole(null);
      setLoading(false);
      return;
    }
    try {
      const res = await api.get("/api/user-profile/");
      const userRole = res.data.role;
      localStorage.setItem("userRole", userRole);
      setRole(userRole);
    } catch (err) {
      console.error("Not logged in:", err);
      localStorage.clear();
      setRole(null);
    } finally {
      setLoading(false);
    }
  };

  checkUser();

  const handleStorageChange = () => {
    const updatedRole = localStorage.getItem("userRole");
    setRole(updatedRole);
  };

  window.addEventListener("storage", handleStorageChange);
  return () => window.removeEventListener("storage", handleStorageChange);
}, []);

  if (loading && !role) {
    return (
      <div className="flex items-center justify-center h-screen text-xl text-[#3DA8CC] font-[coiny]">
        Loading...
      </div>
    );
  }



  return(
  <>  
    <Helmet>
      <title>KidzKorner | Fun Learning for Children - Educational Games & Activities</title>
      <meta
        name="description"
        content="KidzKorner is an interactive educational platform for children featuring alphabet, numbers, shapes, colors, animals, and story lessons. Engaging games and activities designed to make learning fun and effective."
      />
      <meta
        name="keywords"
        content="kids learning, educational games, children education, preschool activities, alphabet learning, number games, shape recognition, color learning, animal lessons, children stories, interactive learning, kid educational platform, early childhood education, learning games for kids"
      />
      <meta name="robots" content="index, follow" />
      <meta property="og:title" content="KidzKorner | Fun Learning for Children - Educational Games & Activities" />
      <meta property="og:description" content="KidzKorner is an interactive educational platform for children featuring alphabet, numbers, shapes, colors, animals, and story lessons. Engaging games and activities designed to make learning fun and effective." />
      <meta property="og:type" content="website" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="KidzKorner | Fun Learning for Children" />
      <meta name="twitter:description" content="Interactive educational platform for children with engaging games and activities" />
      <link rel="canonical" href="https://your-squarespace-domain.squarespace.com" />
    </Helmet>
    <ScrollToTop/>
      <div className="bg-[#3DA8CC] font-[coiny] justify-items-center align-middle h-screen w-screen content-center md:hidden">
        <img src="/responsive.png" alt="rotate Phone Background" />
        <h1 className="text-white">Rotate Phone to experience</h1>
      </div>
<div className="hidden md:block font-[coiny]">
  <TimeProvider>
      <Routes>    
            <Route path="/" element={<Navigate to="/login"/>} />
            <Route path="/login" element={<Login/>}/>

            {!role && <Route path="*" element={<Navigate to="/login" replace />} />}

           {role === "Teacher" && <>
            <Route path="/teacher" element={<TeacherHomePage />} />
            <Route path="/uploadcontents" element={<UploadContents />} />
            <Route path="/dashboard" element={<DashBoard />} />
            <Route path="/studentmanagement" element={<StudentManagement />} />
            <Route path="/usercontrol" element={<UserAccControl />} />
            <Route path="/" element={<Navigate to="/teacher"/>} />
            <Route path="overview" element={<Overview/>}></Route>
               <Route path="/dashboardparentz" element={<ParentsDashboard/>}/>
        </>}

         {role === "Parent" && <>
              <Route path="/home" element={<ProtectedRoute><Home/></ProtectedRoute>} />
              <Route path="/uploadedFiles" element={<StudentFilesPage/>}/>
              <Route path="/about" element={<About />} />
              <Route path="/stories" element={<Stories />} />
              <Route path="/stories/story1" element={<Story1 />} />
              <Route path="/stories/story2" element={<Story2 />} />
              <Route path="/stories/story3" element={<Story3 />} />
              <Route path="/shapes" element={<Shapes />} />
              <Route path="/shapes/easy" element={<ShapesEasy />} />
              <Route path="/shapes/easy/level1" element={<ShapesEasylevel1 />} />
              <Route path="/shapes/easy/level2" element={<ShapesEasylevel2 />} />
              <Route path="/shapes/easy/level3" element={<ShapesEasylevel3 />} />
              <Route path="/shapes/medium" element={<ShapesMedium />} />
              <Route path="/shapes/medium/level1" element={<ShapesMediumLevel1 />} />
              <Route path="/shapes/medium/level2" element={<ShapesMediumLevel2 />} />
              <Route path="/shapes/hard" element={<ShapesHard />} />
              <Route path="/shapes/hard/level1" element={<ShapesHardLevel1 />} />
              <Route path="/shapesgame" element={<ShapesGame />}/>
              

              <Route path="/number" element={<Number />} />
              <Route path="/numbereasy" element={<NumbersEasy />} />
              <Route path="/number/easy/level1" element={<NumberGameEasy1 />} />
              <Route path="/number/easy/level2" element={<NumberGameEasy2 />} />
              <Route path="/number/easy/level3" element={<NumberGameEasy3 />} />
              <Route path="/numbermedium" element={<NumbersMedium />} />
              <Route path="/number/medium/level1" element={<NumberGameMed1 />} />
              <Route path="/number/medium/level2" element={<NumberGameMed2 />} />
              <Route path="/numberhard" element={<NumbersHard />} />
              <Route path="/number/hard/level1" element={<NumberHard1 />} />
              <Route path="/numbergame" element={<NumberGame />} />
              
              <Route path="/alphabets" element={<Alphabets />} />
              <Route path="/alphabeteasy" element={<AlphabetEasy/>}/>
               <Route path="/alphabeteasytuts" element={<AlphabetEasyTuts />} />
              <Route path="/alphabetmedium" element={<AlphabetMedium/>}/>
              <Route path="/alphabethard" element={<AlphabetHard/>}/>
              <Route path="/alphabets/easy/level1" element={<AlphabetEasy1/>}/>
              <Route path="/alphabets/easy/level2" element={<AlphabetEasy2/>}/>
              <Route path="/alphabets/easy/level3" element={<AlphabetEasy3/>}/>
              <Route path="/alphabets/medium/level1" element={<AlphabetMedium1/>}/>
              <Route path="/alphabets/medium/level2" element={<AlphabetMedium2/>}/>
              <Route path="/alphabets/hard/level1" element={<AlphabetHard1/>}/>
              <Route path="/alphabets/play" element={<AlphabetsPlay />} />
              <Route path="/A" element={<A />} />
              <Route path="/B" element={<B />} />
              <Route path="/C" element={<C />} />
              <Route path="/D" element={<D />} />
              <Route path="/E" element={<E />} />
              <Route path="/F" element={<F />} />
              <Route path="/G" element={<G />} />
              <Route path="/H" element={<H />} />
              <Route path="/I" element={<I />} />
              <Route path="/J" element={<J />} />
              <Route path="/K" element={<K />} />
              <Route path="/L" element={<L />} />
              <Route path="/M" element={<M />} />
              <Route path="/N" element={<N />} />
              <Route path="/O" element={<O />} />
              <Route path="/P" element={<P />} />
              <Route path="/Q" element={<Q />} />
              <Route path="/R" element={<R />} />
              <Route path="/S" element={<S />} />
              <Route path="/T" element={<T />} />
              <Route path="/U" element={<U />} />
              <Route path="/V" element={<V />} />
              <Route path="/W" element={<W />} />
              <Route path="/X" element={<X />} />
              <Route path="/Y" element={<Y />} />
              <Route path="/Z" element={<Z />} />
              <Route path="/parentskorner" element={<ParentsKorner/>}/>
              <Route path="/lessons" element={<Lessons/>}/>
              <Route path="/lessons/animals" element={<Animals/>}/>

              <Route path="/lessons/animals/lesson1" element={<AnimalsLesson1/>}/>
              <Route path="/lessons/animals/lesson1/activity1" element={<AnimalsLesson1Activity1/>}/>
              <Route path="/lessons/animals/lesson1/activity2" element={<AnimalsLesson1Activity2/>}/>

              <Route path="/lessons/animals/lesson2" element={<AnimalsLesson2/>}/>
              <Route path="/lessons/animals/lesson2/activity1" element={<AnimalsLesson2Activity1/>}/>
              <Route path="/lessons/animals/lesson2/activity2" element={<AnimalsLesson2Activity2/>}/>

              <Route path="/lessons/animals/lesson3" element={<AnimalsLesson3/>}/>
              <Route path="/lessons/animals/lesson3/activity1" element={<AnimalsLesson3Activity1/>}/>
              <Route path="/lessons/animals/lesson3/activity2" element={<AnimalsLesson3Activity2/>}/>

              <Route path="/lessons/animals/lesson4" element={<AnimalsLesson4/>}/>
              <Route path="/lessons/animals/lesson4/activity1" element={<AnimalsLesson4Activity1/>}/>
              <Route path="/lessons/animals/lesson4/activity2" element={<AnimalsLesson4Activity2/>}/>


              <Route path="/lessons/animals/lesson5" element={<AnimalsLesson5/>}/>
              <Route path="/lessons/animals/lesson5/activity1" element={<AnimalsLesson5Activity1/>}/>
              <Route path="/lessons/animals/lesson5/activity2" element={<AnimalsLesson5Activity2/>}/>


              <Route path="/parentalGuidance" element={<ParentalGuidance/>}/>

              
              <Route path="/dashboardparentz" element={<ParentsDashboard/>}/>
              <Route path="/childRegistration" element={<ParentsChildRegistration/>}/>
              <Route path="/managechildren" element={<ManageChildren/>}/>
              <Route path="/" element={<Navigate to="/parentsKorner"/>} />
              <Route path="/color" element={<Color/>}/>
              <Route path="/colorgame" element={<ColorGame/>} />
              <Route path="/color/easy" element= {<ColorEasy/>}/>
              <Route path="/color/easy/level1" element={<ColorGameEasyLevel1/>}/>
              <Route path="/color/easy/level2" element={<ColorGameEasyLevel2/>}/>
              <Route path="/color/easy/level3" element={<ColorGameEasyLevel3/>}/>
              <Route path="/color/medium" element={<ColorMedium/>}/>
              <Route path="/color/medium/level1" element={<ColorGameMedLevel1/>}/>
              <Route path="/color/medium/level2" element={<ColorGameMedLevel2/>}/>
              <Route path="/color/hard" element={<ColorHard/>}/>
              <Route path="/color/hard/level1" element={<ColorGameHardLevel1/>}/>
          </>}
          {role == "Admin" && <>
              <Route path="/admin" element={<Admin/>}/>
              <Route path="/manageaccounts" element={<ManageAcc/>}/>
              <Route path="/createaccounts" element={<CreateAcc/>}/>
          </>}
          
        
        <Route path="*" element={<NotFound />} />


      </Routes>
      <UnlockOverlay />
       <LockOverlay />
      </TimeProvider>

</div>
    </>
  )

}

export default App