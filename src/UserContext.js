import { createContext, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const UserContext = createContext({});

const UserContextProvider = ({ children }) => {
  const [username, setName] = useState("");
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
  const [modalHome,setModalHome]  = useState(false)


  // ulpoad files
  const [upload, setUpload] = useState([]);
  const [tastyUpload, setTastyUpload] = useState([]);
  const [communityUpload, setCommunityUpload] = useState([]);
  const [discovering, setDiscoveringUpload] = useState([]);

  const navigate = useNavigate();

  const isValidate = () => {
    let isproccesd = true;
    const passRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d.,/$#]+$/.test(password);
    const emailRegex = /^[\w.%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);
    const phoneRegex = /^(091|097|096|099|043|077|093|094|098|049|055|095|041)\d{6}$/.test(phone);


    const usernameRegexArmenianLetter = /^[\u0531-\u0556\u0561-\u0587]+$/u.test(
      username
    );

  
    //

    if (username === null || username === "") {
      isproccesd = false;
      toast.warning(" Անուն դաշտը պարտադիր է․․․ ");
      setErrorName(true);
    } else if (!usernameRegexArmenianLetter) {
      isproccesd = false;
      toast.warning(" Անուն դաշտը պետք է պարունակի միայն Հայկական տառեր");
      setErrorName(true);
    } else if (username.length <= 2) {
      isproccesd = false;
      toast.warning(" Անուն դաշտը պետք է լինի ամենաքիչը 3 տառ");
      setErrorName(true);
    } else {
      setErrorName(false);
    }

    if (password === null || password === "") {
      isproccesd = false;
      toast.warning(" Գաղտնաբառ դաշտը պարտադիր է․․․ ");
      setErrorPassword(true);
      setErrorComfirmPassword(true);
    } else if (password !== comfirmPassword) {
      isproccesd = false;
      toast.warning(" Գաղտնաբառերը չեն համընկնում");
      setErrorComfirmPassword(true);
    } else if (!passRegex) {
      isproccesd = false;
      toast.warning(" Գաղտնաբառը պետք է լինի Լատինատառ եվ  պարունակի առնվազն մեկ փոքրատառ, մեկ մեծատառ և մեկ թիվ։ Օրինակ` Secret123");
      setErrorPassword(true);
    } else {
      setErrorPassword(false);
      setErrorComfirmPassword(false);
    }

    if (email === null || email === "") {
      isproccesd = false;
      toast.warning(" Էլեկտրոնային հասցեն պարտադիր է․․․ ");
      setErrorEmail(true);
    } else if (!emailRegex) {
      isproccesd = false;
      toast.warning(" Էլեկտրոնային հասցեն սխալ է․․․ ");
      setErrorEmail(true);
    } else {
      setErrorEmail(false);
    }
    if (phone === null || phone === "") {
      isproccesd = false;
      toast.warning(" Հեռախոսահմար դաշտը պարտադիր է․․․ ");
      setErrorPhone(true);
    } else if (!phoneRegex) {
      isproccesd = false;
      toast.warning(" Հեռախոսահամարը պետք է լինի oրինակին համապատասխան: 094555657");
      setErrorPhone(true);
    } else {
      setErrorPhone(false);
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
      username,
      password,
      comfirmPassword,
      email,
      phone,
    };

    if (isValidate()) {
      fetch("http://127.0.0.1:8000/info/users/", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(obj),
      })
        .then((res) => {
          if (res.ok) {
            toast.success("Success");
            navigate("/login");
          } else {
            toast.warning("write other email");
          }
        })
        .catch((err) => {
          toast.warning("Fail: " + err.message);
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
          let findEmail = result.find((email) => {
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
    let obj = {
      email,
    };
    if (isValidateForgetPass()) {
      fetch("http://127.0.0.1:8000/info/users/", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(obj),
      })
        .then((res) => {
          if (res.ok) {
            toast.success("Success");
            navigate("/login");
          } else {
            toast.warning("write other email");
          }
        })
        .catch((err) => {
          toast.warning("Fail: " + err.message);
        });
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
          username,
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
          modalHome
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
          setModalHome
        },
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserContextProvider };
