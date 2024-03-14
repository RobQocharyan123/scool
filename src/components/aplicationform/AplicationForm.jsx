import React, { useState } from "react";
import ".././FormsApplication/formStyle.css";
import imageMain from "../../assets/imageApplicationForm.png";
import { useNavigate } from "react-router-dom";
import { CountDown } from "./../countdown/CountDown";
import { toast } from "react-toastify";

export default function AplicationForm() {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState({});
  const [infoForm, setInfoForm] = useState({
    marz: "",
    townOrCity: "",
    schoolName: "",
    personAdulctContact: "",
    personEmail: "",
    personPhone: "",
  });

  const [errorMarz, setErrorMarz] = useState(false);
  const [errorTownOrCity, setErrorTownOrCity] = useState(false);
  const [errorPersonPhone, setErrorPersonPhone] = useState(false);
  const [errorPersonAdulctContact, setErrorPersonAdulctContact] =
    useState(false);
  const [errorSchoolName, setErrorSchoolName] = useState(false);
  const [errorPersoneMail, setErrorPersoneMail] = useState(false);

  const validete = (values) => {
    let errors = true;
    const regExpMail = /^[\w.%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const regExpText = /^([Ա-ՖեևԵեA-Z])([ա-ֆևa-z])+$/;
    const regExpNameUsername =
      /^(?:[\u0531-\u0556\u0561-\u0586]+|[Ա-Ֆ][ա-ֆ'-]+)(?:\s(?:[\u0531-\u0556\u0561-\u0586]+|[Ա-Ֆ][ա-զ'-]+))*$/u;
    const regExpPhone =
      /^(091|097|096|099|043|077|093|094|098|049|055|095|041)\d{6}$/;
    const regExpSchoolName = /^[a-zA-Z0-9\s\-'\u0531-\u058F]+$/u;

    // Validation marz
    if (!values.marz) {
      toast.warning(" Մարզ դաշտը պարտադիր է․․․ ");
      errors = false;
      setErrorMarz(true);
    } else {
      setErrorMarz(false);
    }
    //

    // Validation town or city vailidation
    if (!values.townOrCity) {
      toast.warning("Քաղաք/Գյուղ դաշտը պարտադիր է․․․ ");
      errors = false;
      setErrorTownOrCity(true);
    } else if (!regExpText.test(values.townOrCity)) {
      toast.warning(" Քաղաք/Գյուղ Դաշտը պետք է լինի հայատառ․․․ ");
      errors = false;
      setErrorTownOrCity(true);
    } else {
      setErrorTownOrCity(false);
    }

    // Validation scool name
    if (!values.schoolName) {
      toast.warning(" Դպրոց դաշտը պարտադիր է");
      errors = false;
      setErrorSchoolName(true);
    } else if (!regExpSchoolName.test(values.schoolName)) {
      toast.warning(" Դպրոց դաշտը պետք է լինի հայատառ․․․ ");
      errors = false;
      setErrorSchoolName(true);
    } else {
      setErrorSchoolName(false);
    }
    //

    // Validation Adult Contact Person person
    if (!values.personAdulctContact) {
      toast.warning(" Մեծահասակի կոնտակտային տվյալներ դաշտը պարտադիր է․․․ ");
      errors = false;
      setErrorPersonAdulctContact(true);
    } else if (!regExpNameUsername.test(values.personAdulctContact)) {
      toast.warning(
        " Մեծահասակի կոնտակտային տվյալներ դաշտը պետք է լինի հայատառ․․․ "
      );
      errors = false;
      setErrorPersonAdulctContact(true);
    } else {
      setErrorPersonAdulctContact(false);
    }

    // Validation email
    if (!values.personEmail) {
      toast.warning(" Էլեկտրոնային Հասցե դաշտը պարտադիր է․․․");
      errors = false;
      setErrorPersoneMail(true);
    } else if (!regExpMail.test(values.personEmail)) {
      toast.warning("Էլեկտրոնային հասցեն սխալ է․․․ ");
      setErrorPersoneMail(true);
      errors = false;
    } else {
      setErrorPersoneMail(false);
    }

    // Validation Phone
    if (!values.personPhone) {
      toast.warning(" Հեռախոսահամար դաշտը պարտադիր է․․․ ");
      errors = false;
      setErrorPersonPhone(true);
    } else if (!regExpPhone.test(infoForm.personPhone)) {
      toast.warning(
        " Հեռախոսահամարը պետք է լինի oրինակին համապատասխան: 094-55-55-55"
      );
      errors = false;
      setErrorPersonPhone(true);
    } else {
      setErrorPersonPhone(false);
    }

    return errors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setInfoForm((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmitAl = (e) => {
    e.preventDefault();

    if (validete(infoForm)) {
      debugger;
      fetch("http://127.0.0.1:8000/info/users/", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(infoForm),
      })
        .then((res) => {
          if (res.ok) {
            toast.success("Հաջողվեց");
            navigate("/login");
          } else {
            toast.warning("Էլ-հասցեն սխալ է․․․");
            setErrorPersoneMail(true);
          }
        })
        .catch((err) => {
          toast.warning("Չհաջողվեց");
        });
    }
  };

  const clearErrors = (e) => {
    if (e) {
      e.preventDefault();
    }
    setErrorMessage({});
  };

  const handleClear = (e) => {
    e.preventDefault();

    // Reset other form fields as needed
    handleChange({ target: { name: "marz", value: "" } });
    handleChange({ target: { name: "townOrCity", value: "" } });
    handleChange({ target: { name: "schoolName", value: "" } });
    handleChange({ target: { name: "personAdulctContact", value: "" } });
    handleChange({ target: { name: "personBirthday", value: "" } });
    handleChange({ target: { name: "personEmail", value: "" } });
    handleChange({ target: { name: "personPhone", value: "" } });
    handleChange({ target: { name: "scoolClass", value: "" } });
    handleChange({ target: { name: "programs1", value: "" } });
    handleChange({ target: { name: "programs2", value: "" } });
    handleChange({ target: { name: "programs3", value: "" } });
    handleChange({ target: { name: "programs4", value: "" } });

    // Clear error messages by calling clearErrors function
    clearErrors();
  };

  return (
    <div className="formContainer">
      <div className="formContainerImage">
        <img src={imageMain} alt="image" />
      </div>
      <div className="scedule">
        <CountDown />
      </div>
      <div className="time-block"></div>
      <div className="formBlock">
        <form action="" onSubmit={handleSubmitAl}>
          <h2 className="formTitle">Գրանցման Դաշտ</h2>
          <div className="formItem">
            <label htmlFor="marz" className="formItemLabel1">
              Մարզ
            </label>
            <div className="select-wrapper">
              <select
                name="marz"
                onChange={handleChange}
                value={infoForm.marz}
                className={errorMarz ? "error" : ""}
              >
                <option value="">Ընտրել</option>
                <option value="Արագածոտն">Արագածոտն</option>
                <option value="Արարատ">Արարատ</option>
                <option value="Գեղարքունիք">Գեղարքունիք</option>
                <option value="Կոտայք">Կոտայք</option>
                <option value="Լոռի">Լոռի</option>
                <option value="Շիրակ">Շիրակ</option>
                <option value="Սյունիք">Սյունիք</option>
                <option value="Տավուշ">Տավուշ</option>
                <option value="Վայոց Ձոր"> Վայոց Ձոր</option>
                <option value="Երևան">Երևան </option>
              </select>
            </div>
          </div>
          <div className="formItem m-top">
            <label htmlFor="townOrCity" className="m-bottom formItemLabel1">
              Քաղաք/Գյուղ
            </label>
            <input
              type="text"
              placeholder="Քաղաք/գյուղ"
              name="townOrCity"
              className={`formItemInput1 ${errorTownOrCity ? "error" : ""}`}
              value={infoForm.townOrCity}
              onChange={handleChange}
            />
          </div>
          <div className="formItem m-top">
            <label htmlFor="schoolName" className="m-bottom formItemLabel1">
              Դպրոցի Անուն
            </label>
            <input
              type="text"
              placeholder="Դպրոց"
              name="schoolName"
              className={`formItemInput1 ${errorSchoolName ? "error" : ""}`}
              value={infoForm.schoolName}
              onChange={handleChange}
            />
          </div>
          <div className="formItem m-top">
            <label
              htmlFor="personAdulctContact"
              className="m-bottom formItemLabel1"
            >
              <span>
                Մեծահասակի կոնտակտային տվյալները (ուսուցիչ, դպրոցի ծրագրի
                համակարգող) (անուն, ազգանուն)
              </span>
            </label>
            <input
              type="text"
              placeholder="Անուն Ազգանուն"
              name="personAdulctContact"
              className={`formItemInput1 ${
                errorPersonAdulctContact ? "error" : ""
              }`}
              value={infoForm.personAdulctContact}
              onChange={handleChange}
            />
          </div>
          <div className="formItem m-top">
            <label htmlFor="personEmail" className="m-bottom formItemLabel1">
              Էլեկտրոնային Հասցե
            </label>
            <input
              type="text"
              placeholder="Էլ-փոստ..."
              name="personEmail"
              className={`formItemInput1 ${errorPersoneMail ? "error" : ""}`}
              value={infoForm.personEmail}
              onChange={handleChange}
            />
          </div>
          <div className="formItem m-top">
            <label htmlFor="personPhone" className="m-bottom formItemLabel1">
              Հեռախոսահամար ձևաչափը:094-55-45-56
            </label>
            <input
              type="text"
              placeholder="Հեռ:"
              name="personPhone"
              className={`formItemInput1 ${errorPersonPhone ? "error" : ""}`}
              value={infoForm.personPhone}
              onChange={handleChange}
            />
          </div>

          <div className="formBtnBlock">
            <button type="submit" className="btn-form">
              Ուղարկել
            </button>
            <input
              type="submit"
              onClick={handleClear}
              value="Մաքրել դաշտերը"
              className="bnt-clear-form"
            />
          </div>
        </form>
      </div>
    </div>
  );
}
