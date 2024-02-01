import { AiOutlineClose } from "react-icons/ai";
import { useState, useEffect } from "react";

const Registracija = ({ toggleSignUp, handleTokenReg, handleNameReg }) => {
  const [onClick, setOnClick] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const [isToken, setIsToken] = useState(false);

  const handleFirstName = (event) => {
    setFirstName(event.target.value);
  };
  const handleLastName = (event) => {
    setLastName(event.target.value);
  };
  const handleEmail = (event) => {
    setEmail(event.target.value);
  };
  const handlePassword = (event) => {
    setPassword(event.target.value);
  };
  const handlePasswordConfiramtion = (event) => {
    setPasswordConfirmation(event.target.value);
  };

  const handleButtonClick = async () => {
    try {
      const response = await fetch(`http://localhost:3000/user`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",

        body: JSON.stringify({
          FirstName: firstName,
          LastName: lastName,
          Email: email,
          Password: password,
          PasswordConfirmation: passwordConfirmation,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        console.log("Successfully registered");
        handleNameReg(data.userName);
        //Da bih zatvorili prozor kada se registrujemo
        toggleSignUp(false);
        // Provera da li je token dostupan
        if (data.authenticated && data.tokenAvailable) {
          console.log("Token je dostupan");
          setIsToken(true);
          handleTokenReg(true);
        } else {
          console.log("Token nije dostupan");
          setIsToken(false);
          handleTokenReg(false);
        }

        setFirstName("");
        setLastName("");
        setEmail("");
        setPassword("");
        setPasswordConfirmation("");
        setIsError(false);
        setErrorMessage("");
      } else {
        // Handle error scenarios
        const errorData = await response.json();
        const errorMessage = errorData.message || "An error occurred";
        console.error(errorMessage);
        setErrorMessage(errorMessage);
        setIsError(true);
      }
    } catch (error) {
      console.error("An unexpected error occurred", error);
    }
  };

  const handleClick = () => {
    setOnClick(!onClick);
    toggleSignUp(onClick);
  };

  return (
    <div className="w-screen h-screen mt-20 fixed z-40  left-0  ">
      <div className="  bg-gray-300 contras-50 w-80 md:w-96 h450 mb-10 mx-auto my-auto text-black rounded-3xl ">
        <div className="w-full h-5 mr-10 relative mb-5 ">
          <AiOutlineClose
            className="w-5 h-5 absolute top-8 right-5 hover:text-black  transition duration-500 ease-in-out cursor-pointer"
            onClick={handleClick}
          />
        </div>
        <div className="flex flex-col justify-center items-center mt-10">
          <input
            type="text"
            placeholder="First Name"
            value={firstName}
            onChange={handleFirstName}
            className="w-4/5 h-10 m-2  rounded-2xl bg-gray-50 border-b-2 border-gray-600 outline-none text-black pl-4 hover:bg-gray-300 transition duration-500 ease-in-out hover:text-black"
          />
          <input
            type="text"
            placeholder="Last Name"
            value={lastName}
            onChange={handleLastName}
            className="w-4/5 h-10 m-2  rounded-2xl bg-gray-50 border-b-2 border-gray-600 outline-none text-black pl-4 hover:bg-gray-300 transition duration-500 ease-in-out hover:text-black"
          />

          <input
            type="text"
            placeholder="Email"
            value={email}
            onChange={handleEmail}
            className="w-4/5 h-10 m-2  rounded-2xl bg-gray-50 border-b-2 border-gray-600 outline-none text-black pl-4 hover:bg-gray-300 transition duration-500 ease-in-out hover:text-black"
          />
          <input
            type="text"
            placeholder="Password"
            value={password}
            onChange={handlePassword}
            className="w-4/5 h-10 m-2  rounded-2xl bg-gray-50 border-b-2 border-gray-600 outline-none text-black pl-4 hover:bg-gray-300 transition duration-500 ease-in-out hover:text-black"
          />
          <input
            type="text"
            placeholder="Confirm Password"
            value={passwordConfirmation}
            onChange={handlePasswordConfiramtion}
            className="w-4/5 h-10 m-2  rounded-2xl bg-gray-50 border-b-2 border-gray-600 outline-none text-black pl-4 hover:bg-gray-300 transition duration-500 ease-in-out hover:text-black"
          />
          {isError && (
            <p style={{ color: "red", textAlign: "center", margin: "0" }}>
              {errorMessage}
            </p>
          )}
          <button
            className=" w-2/5 h-10 mt-5  text-center rounded-2xl bg-gray-50 border-b-2 border-gray-600 outline-none text-black  hover:bg-gray-300 transition duration-500 ease-in-out hover:text-black"
            onClick={handleButtonClick}
          >
            Sign up
          </button>
        </div>
      </div>
    </div>
  );
};

export default Registracija;
