import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const UserContext = createContext({});

const UserContextProvider = ({ children }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [comfirmPassword, setComfirmPassword] = useState("");
  const [errorName, setErrorName] = useState(false);
  const [errorEmail, setErrorEmail] = useState(false);
  const [errorPhone, setErrorPhone] = useState(false);
  const [errorPassword, setErrorPassword] = useState(false);
  const [errorComfirmPassword, setErrorComfirmPassword] = useState(false);

  const [nameUsers, setNameUsers] = useState(null);

  // modal
  const [modal, setModal] = useState(false);

  // ulpoad files
  const [upload, setUpload] = useState([]);
  const [tastyUpload, setTastyUpload] = useState([]);
  const [communityUpload, setCommunityUpload] = useState([]);
  const [discovering, setDiscoveringUpload] = useState([]);
  console.log(upload, tastyUpload, communityUpload, discovering);

  const navigate = useNavigate();

  const isValidate = () => {
    let isproccesd = true;
    let errorMessage = "Please enter the value in ";
    const passRegex = /^(?=.*[A-Za-z0-9])[A-Za-z0-9]{3,10}$/.test(password);
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(
      email
    );
    const phoneRegex = /^0\d{8}$/.test(phone);

    if (name === null || name === "") {
      isproccesd = false;
      errorMessage += " Name";
      setErrorName(true);
    } else {
      setErrorName(false);
    }

    if (password === null || password === "") {
      isproccesd = false;
      errorMessage += " Password";
      setErrorPassword(true);
      setErrorComfirmPassword(true);
    } else if (password !== comfirmPassword) {
      isproccesd = false;
      errorMessage = " Passwords do not match";
      setErrorComfirmPassword(true);
    } else if (!passRegex) {
      isproccesd = false;
      errorMessage =
        " Password must contain at least one lowercase letter, one uppercase letter and one number Example abc123 / xyz567";
      setErrorPassword(true);
    } else {
      setErrorPassword(false);
      setErrorComfirmPassword(false);
    }

    if (email === null || email === "") {
      isproccesd = false;
      errorMessage += " Email";
      setErrorEmail(true);
    } else if (!emailRegex) {
      isproccesd = false;
      errorMessage += " Write correct Email";
      setErrorEmail(true);
    } else {
      setErrorEmail(false);
    }
    if (phone === null || phone === "") {
      isproccesd = false;
      errorMessage += " Phone";
      setErrorPhone(true);
    } else if (!phoneRegex) {
      isproccesd = false;
      errorMessage += " Phone Format: 094-55-55-55";
      setErrorPhone(true);
    } else {
      setErrorPhone(false);
    }
    if (!isproccesd) {
      toast.warning(errorMessage);
    }

    return isproccesd;
  };

  const isValidateLogin = () => {
    const passRegex = /^(?=.*[A-Za-z0-9])[A-Za-z0-9]{3,10}$/.test(password);
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(
      email
    );
    let isproccesd = true;
    let errorMessage = "Please enter the value in ";

    if (password === null || password === "") {
      isproccesd = false;
      errorMessage += " password";
      setErrorPassword(true);
      setErrorComfirmPassword(true);
    } else if (!passRegex) {
      isproccesd = false;
      errorMessage =
        " Password must contain at least one lowercase letter, one uppercase letter and one number Example abc123 / xyz567";
      setErrorPassword(true);
    } else {
      setErrorPassword(false);
    }

    if (email === null || email === "") {
      isproccesd = false;
      errorMessage += " Email";
      setErrorEmail(true);
    } else if (!emailRegex) {
      isproccesd = false;
      errorMessage += " Write correct Email";
      setErrorEmail(true);
    } else {
      setErrorEmail(false);
    }

    if (!isproccesd) {
      toast.warning(errorMessage);
    }

    return isproccesd;
  };

  const isValidateForgetPass = () => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(
      email
    );
    let isproccesd = true;
    let errorMessage = "Please enter the value in ";

    if (email === null || email === "") {
      isproccesd = false;
      errorMessage += " Email";
      setErrorEmail(true);
    } else if (!emailRegex) {
      isproccesd = false;
      errorMessage += " Write correct Email";
      setErrorEmail(true);
    } else {
      setErrorEmail(false);
    }

    if (!isproccesd) {
      toast.warning(errorMessage);
    }

    return isproccesd;
  };

  const isValidatePasswords = () => {
    let isproccesd = true;
    let errorMessage = "Please enter the value in ";
    const passRegex = /^(?=.*[A-Za-z0-9])[A-Za-z0-9]{3,10}$/.test(password);

    if (password === null || password === "") {
      isproccesd = false;
      errorMessage += " password";
      setErrorPassword(true);
      setErrorComfirmPassword(true);
    } else if (password !== comfirmPassword) {
      isproccesd = false;
      errorMessage = " Passwords do not match";
      setErrorComfirmPassword(true);
    } else if (!passRegex) {
      isproccesd = false;
      errorMessage =
        " Password must contain at least one lowercase letter, one uppercase letter and one number Example abc123 / xyz567";
      setErrorPassword(true);
    } else {
      setErrorPassword(false);
      setErrorComfirmPassword(false);
    }

    if (!isproccesd) {
      toast.warning(errorMessage);
    }

    return isproccesd;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let obj = {
      name,
      password,
      comfirmPassword,
      email,
      phone,
    };

    // json-server --watch db.json --port 8000
    if (isValidate()) {
      fetch("http://127.0.0.1:8000/info/users/", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(obj),
      })
        .then((res) => {
          toast.success("Success");
          navigate("/login");
          debugger;
        })
        .catch((err) => {
          toast.success("Fail: " + err.message);
        });
    }
  };

  const handleSubmitLogin = (e) => {
    e.preventDefault();
    if (isValidateLogin()) {
      const fetchData = async () => {
        try {
          const response = await fetch("https://api.example.com/data");
          const result = await response.json();
          let findEmail = result.find((userEmail) => {
            return "userEmail";
          });

          if (findEmail) {
            toast.success("Success");
            navigate("/schoolPage");
          }
        } catch (error) {
          toast.success("Write right Email and Password");
        }
      };

      fetchData();
    }
  };

  const handleSubmitForgetPass = (e) => {
    e.preventDefault();
    if (isValidateForgetPass()) {
      const fetchData = async () => {
        try {
          const response = await fetch("https://api.example.com/data");
          const result = await response.json();
          let findEmail = result.find((userEmail) => {
            return "userEmail";
          });

          if (findEmail) {
            toast.success("Success");
          }
        } catch (error) {
          toast.success("Write right Email");
        }
      };

      fetchData();
    }
  };

  const handleSubmitPasswords = (e) => {
    e.preventDefault();
    if (isValidatePasswords()) {
      toast.success("Success");
      navigate("/login");
      setPassword("");
    }
  };

  // Modal func

  const toggleModal = () => {
    setModal(!modal);
  };


  
  return (
    <UserContext.Provider
      value={{
        userState: {
          name,
          email,
          phone,
          password,
          comfirmPassword,
          errorName,
          errorEmail,
          errorPassword,
          errorComfirmPassword,
          errorPhone,
          nameUsers,
          modal,
          upload,
          tastyUpload,
          discovering,
        },
        userActions: {
          setName,
          setEmail,
          setPhone,
          setPassword,
          setComfirmPassword,
          handleSubmit,
          handleSubmitLogin,
          handleSubmitForgetPass,
          handleSubmitPasswords,
          setNameUsers,
          setModal,
          toggleModal,
          setUpload,
          setTastyUpload,
          setCommunityUpload,
          setDiscoveringUpload,
        }
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserContextProvider };
