import Back from "../components/Back";
import bg from "../assets/Parents/registrationBg.webp";
import { useState } from "react";
import api from "../api"; 
import { ACCESS_TOKEN } from "../constants"; 

function ParentsChildRegistration() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [message, setMessage] = useState("");
  const [showMessage, setShowMessage] = useState();

  const [schedule,setSchedule] = useState("");

  const capitalizeFirst = str =>{
    return str.charAt(0).toUpperCase() + str.slice(1);
  };


  const calculateAge = (birthDate) => {
  const today = new Date();
  const birth = new Date(birthDate);
  let age = today.getFullYear() - birth.getFullYear();
  const monthDiff = today.getMonth() - birth.getMonth();
  
  // Adjust age if birthday hasn't occurred yet this year
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
    age--;
  }
  
  return age;
};
  
  const clearForm = () => {
    setFirstName("");
    setLastName("");
    setBirthDate("");

    setSchedule("")
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const age = calculateAge(birthDate);
    if (age !== 5) {
      setMessage(`Child must be 5 years old. Current age: ${age} years old.`);
      setShowMessage(false);
      setTimeout(() => setShowMessage(), 3000);
      return;
    }

    try {
      const response = await api.post(
        "/api/child_register/",
        {
          first_name: firstName,
          last_name: lastName,
          class_sched: schedule,
          birth_date: birthDate,

        },
      );
      setTimeout(() => setShowMessage(), 2000);
      setMessage("Child registered successfully!");
      setShowMessage(true)
      console.log(response.data);
      clearForm();
    } catch (error) {
      console.error(error);
      setShowMessage(false)
      if (error.response?.data?.error) {
        setMessage(` ${error.response.data.error}`);
      } else {
        setShowMessage(false)
        setMessage(" Something went wrong. Please try again.");
      }
    }
  };

  return (
    <>
      <Back />
      <div
        className="h-screen w-full flex items-center justify-center bg-cover bg-no-repeat bg-center absolute"
        style={{ backgroundImage: `url(${bg})` }}
      >
        <div className="bg-amber-300 p-10 rounded-2xl shadow-lg flex flex-col items-center justify-center gap-4 w-[400px]">
          <h2 className="text-xl font-bold mb-2">Register Child</h2>
          <form onSubmit={handleSubmit} className="w-full">
            <div className="m-3">
              <label className="block mb-1">First Name:</label>
              <input
                required
                type="text"
                value={firstName}
                onChange={
                  (e) => {
                    const value = e.target.value;
                    const capitalized = value.charAt(0).toUpperCase() + value.slice(1);
                    setFirstName(capitalized);
                  }

                }
                className="w-full p-2 rounded-md border capitalize"
              />
            </div>

            <div className="m-3">
              <label className="block mb-1">Last Name:</label>
              <input
                required
                type="text"
                value={lastName}
                onChange={(e) => {
                const value = e.target.value;
                const capitalized = value.charAt(0).toUpperCase() + value.slice(1);
                setLastName(capitalized);
                }}
                className="w-full p-2 rounded-md border capitalize"
              />
            </div>


                <div className="m-3">
              <label className="block mb-1">Class Schedule</label>
              <select
                required
                value={schedule}
                onChange={(e) => setSchedule(e.target.value)}
                className="w-full p-2 rounded-md border"
              >
                  <option value="">-- Select Schedule --</option>
                  <option value="8:00 AM to 11:00 AM"> Morning: 8:00 AM to 11:00 AM</option>
                  <option value="11:00 AM to 1:00 PM"> Noon: 11:00 AM to 1:00 PM</option>
              </select>
            </div>

            <div className="m-3">
              <label className="block mb-1">Birthdate:</label>
              <input
                required
                type="date"
                value={birthDate}
                onChange={(e) => setBirthDate(e.target.value)}
                className="w-full p-2 rounded-md border"
              />
            </div>

            <div className="flex gap-4 justify-center mt-4">
              <button
                type="submit"
                className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
              >
                Register
              </button>
              <button
                type="button"
                onClick={clearForm}
                className="bg-gray-300 text-black px-4 py-2 rounded-md hover:bg-gray-400"
              >
                Clear
              </button>
            </div>
          </form>

          {showMessage === true && <div className="absolute z-10 bg-green-400 opacity-90 rounded-2xl h-20 w-70 flex items-center justify-center"><p className="mt-4 text-lg font-semibold ">{message}</p></div>}
          {showMessage === false && <div className="absolute z-10 bg-red-500 rounded-2xl h-20 w-70 flex items-center justify-center"><p className="mt-4 text-lg font-semibold ">{message}</p></div>}
        </div>
      </div>
    </>
  );
}

export default ParentsChildRegistration;
