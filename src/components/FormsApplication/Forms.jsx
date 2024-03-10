import React, { useEffect, useState } from "react";
import "./formStyle.css";
import imageMain from "../../assets/imageApplicationForm.png";
import { useNavigate } from 'react-router-dom';
import { CountDown } from './../countdown/CountDown';

export default function Forms() {
    const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [infoForm, setInfoForm] = useState({
    marz: "",
    townOrCity: "",
    schoolName: "",
    personAdulctContact: "",
    personBirthday: "",
    personEmail: "",
    personPhone: "",
    scoolClass: "",
    programs1: "",
    programs2: "",
  });

  useEffect(() => {
    if (Object.keys(errorMessage).length === 0 && isSubmit) {
        if(infoForm.programs1){
            navigate("/lifestyle")
        }else if(infoForm.programs2){
            navigate('/tasty')
        }else if(infoForm.programs3){
            navigate('/discovering')
        }else if(infoForm.programs4){
            navigate('/community')
        }
    //   fetch("http://127.0.0.1:8000/info/users/", {
    //     method: "POST",
    //     headers: { "content-type": "application/json" },
    //     body: JSON.stringify(infoForm),
    //   })
    //     .then((res) => {
    //       toast.success("Success");
    //       navigate("/login");
    //       debugger;
    //     })
    //     .catch((err) => {
    //       toast.success("Fail: " + err.message);
    //     });
      console.log("Succesful", infoForm);
    }
  }, [errorMessage]);

  const validete = (values) => {
    const errors = {};
    const regExpMail = /^[^@\s\t\r\n]+@[^@\s\t\r\n]+\.[^@\s\t\r\n]/;
    const regExpText = /^([Ա-ՖA-Z])([ա-ֆa-z])+$/;
    const regExpNameUsername =
      /^(?:[\u0531-\u0556\u0561-\u0586]+|[Ա-Ֆ][ա-ֆ'-]+)(?:\s(?:[\u0531-\u0556\u0561-\u0586]+|[Ա-Ֆ][ա-զ'-]+))*$/u;
    const regExpPhone = /^0\d{8}$/;
    const regExpBirthDay = /^\d{1,2}\/\d{1,2}\/\d{4}$/;
    const regExpSchoolName = /^[a-zA-Z0-9\s\-'\u0531-\u058F]+$/u;

    // Validation marz
    if (!values.marz) {
      errors.marz = "Please choos state․";
    }
    //

    // Validation town or city vailidation
    if (!values.townOrCity) {
      errors.townOrCity = "Town/Village is requerd․";
    } else {
      if (!regExpText.test(values.townOrCity)) {
        errors.townOrCity =
          "You must use only letters and the first letter must be capitalized․";
      }
    }

    // Validation scool name
    if (!values.schoolName) {
      errors.schoolName = "Scool name is requerd.";
    } else {
      if (!regExpSchoolName.test(values.schoolName)) {
        errors.schoolName = "School name must be coorect no symbol.";
      }
    }
    //

    // Validation Adult Contact Person person
    if (!values.personAdulctContact) {
      errors.personAdulctContact = "Person Adulct Contact is requerd.";
    } else {
      if (!regExpNameUsername.test(values.personAdulctContact)) {
        errors.personAdulctContact = "Must be armenian charhacther․";
      }
    }

    //Validation birthdate
    if (!values.personBirthday) {
      errors.personBirthday = "Birthdate of the contact person is requerd";
    } else {
      if (!regExpBirthDay.test(values.personBirthday)) {
        errors.personBirthday = "Must be correct, Example` day/month/year ";
      }
    }
    //

    // Validation email
    if (!values.personEmail) {
      errors.personEmail = "Email is required.";
    } else {
      if (!regExpMail.test(values.personEmail)) {
        errors.personEmail = "Email must be correct.";
      }
    }

    // Validation Phone
    if (!values.personPhone) {
      errors.phone = "Phone is required";
    } else if (!regExpPhone.test(infoForm.personPhone)) {
      errors.phone = "Muste be number and example 098776348";
    }

    //Validetion sdool class
    if (!values.scoolClass) {
      errors.scoolClass = "Scool class is required.";
    }

    //Validetion sdool programs
    if (values.scoolClass == "5-6 grades") {
      if (!values.programs1 && !values.programs2) {
        errors.program = "Programs must be requerd";
      }
    } else if (values.scoolClass == "7-8 grades") {
      if (!values.programs3 && !values.programs4) {
        errors.program = "Programs must be requerd";
      }
    } else {
      if (
        !values.programs1 &&
        !values.programs2 &&
        !values.programs3 &&
        !values.programs4
      ) {
        errors.program = "Programs must be requerd";
      }
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
    setErrorMessage(validete(infoForm));
    setIsSubmit(true);
    validete(infoForm);
  };

  const clearErrors = (e) => {
    if (e) {
      e.preventDefault();
    }
    setErrorMessage({});
  };

  const [programsDisable, setProgramsDisable] = useState({
    programs1Disable: false,
    programs2Disable: false,
    programs3Disable: false,
    programs4Disable: false,
  });

  const [programsChecked, setProgramsChecked] = useState({
    programs1: false,
    programs2: false,
    programs3: false,
    programs4: false,
  });

  const handleClear = (e) => {
    e.preventDefault();
    // Reset all form fields to their initial state
    setProgramsChecked({
      programs1: false,
      programs2: false,
      programs3: false,
      programs4: false,
    });
    setProgramsDisable({
      programs1Disable: false,
      programs2Disable: false,
      programs3Disable: false,
      programs4Disable: false,
    });

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

  const handleProgramChange = (e) => {
    const targetName = e.target.name;
    const isChecked = e.target.checked;

    if (!isChecked) {
      e.target.value = "";
    }

    if (infoForm.scoolClass === "") {
      alert("Please choose school class before selecting programs.");
      return;
    }

    // Ensure only two programs are selected
    const selectedProgramsCount = Object.values(programsChecked).filter(
      (val) => val
    ).length;

    // Check if the selected school class is the 3rd option
    const isThirdOption =
      infoForm.scoolClass ===
      "We have 2 teams of both age groups (5-6 and 7-8 grades).";

    // If the selected school class is the 3rd option and more than 2 programs are already selected, prevent further selection
    if (isThirdOption && selectedProgramsCount >= 2 && isChecked) {
      alert("You can only 2 programs");
      return;
    }

    // Update the programsChecked state based on the checkbox name
    setProgramsChecked((prevState) => ({
      ...prevState,
      [targetName]: isChecked,
    }));

    handleChange(e);
  };

  const handleClassChange = (e) => {
    const selectedClass = e.target.value;
    let updatedDisableState = {};
    let updatedCheckedState = {
      programs1: false,
      programs2: false,
      programs3: false,
      programs4: false,
    };

    if (selectedClass === "5-6 grades") {
      updatedDisableState = {
        programs3Disable: true,
        programs4Disable: true,
        programs2Disable: false,
        programs1Disable: false,
      };

      infoForm.programs3 = "";
      infoForm.programs4 = "";
    } else if (selectedClass === "7-8 grades") {
      updatedDisableState = {
        programs1Disable: true,
        programs2Disable: true,
        programs3Disable: false,
        programs4Disable: false,
      };

      infoForm.programs1 = "";
      infoForm.programs2 = "";
    } else {
      updatedDisableState = {
        programs1Disable: false,
        programs2Disable: false,
        programs3Disable: false,
        programs4Disable: false,
      };

      infoForm.programs1 = "";
      infoForm.programs2 = "";
      infoForm.programs3 = "";
      infoForm.programs4 = "";
    }

    setProgramsChecked(updatedCheckedState);
    setProgramsDisable(updatedDisableState);
    handleChange(e);
  };

  return (
    <div className="formContainer">
      <div className="formContainerImage">
        <img src={imageMain} alt="image" />
      </div>
      <CountDown />
      {/* <pre>{JSON.stringify(infoForm, undefined, 2)}</pre> */}
      <div className="time-block"></div>
      <div className="formBlock">
        <form action="" onSubmit={handleSubmitAl}>
          <h2 className="formTitle">Application form</h2>
          <div className="formItem">
            <label htmlFor="marz" className="formItemLabel1">
              State
            </label>
            <div className="select-wrapper">
              <select name="marz" onChange={handleChange} value={infoForm.marz}>
                <option value="">Choose</option>
                <option value="Արագածոտն">Արագածոտն</option>
                <option value="Արարատ">Արարատ</option>
                <option value="Արմավիր">Գեղարքունիք</option>
                <option value="Կոտայք">Կոտայք</option>
                <option value="Լոռի">Լոռի</option>
                <option value="Շիրակ">Շիրակ</option>
                <option value="Սյունիք">Սյունիք</option>
                <option value="Տավուշ">Տավուշ</option>
                <option value="Վայոց Ձոր"> Վայոց Ձոր</option>
                <option value="Երևան">Երևան </option>
              </select>
            </div>
            <p className="errorMessge">{errorMessage.marz}</p>
          </div>
          <div className="formItem m-top">
            <label htmlFor="townOrCity" className="m-bottom formItemLabel1">
              Town/village
            </label>
            <input
              type="text"
              placeholder="Your answer"
              name="townOrCity"
              className={`formItemInput1 ${
                errorMessage.townOrCity ? "borderRed" : ""
              }`}
              value={infoForm.townOrCity}
              onChange={handleChange}
            />
            <p className="errorMessge">{errorMessage.townOrCity}</p>
          </div>
          <div className="formItem m-top">
            <label htmlFor="schoolName" className="m-bottom formItemLabel1">
              School Name
            </label>
            <input
              type="text"
              placeholder="Your answer"
              name="schoolName"
              className={`formItemInput1 ${
                errorMessage.schoolName ? "borderRed" : ""
              }`}
              value={infoForm.schoolName}
              onChange={handleChange}
            />
            <p className="errorMessge">{errorMessage.schoolName}</p>
          </div>
          <div className="formItem m-top">
            <label
              htmlFor="personAdulctContact"
              className="m-bottom formItemLabel1"
            >
              Adult Contact Person{" "}
              <span>(teacher, school project coordinator) (Name, surname)</span>
            </label>
            <input
              type="text"
              placeholder="Your answer"
              name="personAdulctContact"
              className={`formItemInput1 ${
                errorMessage.personAdulctContact ? "borderRed" : ""
              }`}
              value={infoForm.personAdulctContact}
              onChange={handleChange}
            />
            <p className="errorMessge">{errorMessage.personAdulctContact}</p>
          </div>
          <div className="formItem m-top">
            <label htmlFor="personBirthday" className="m-bottom formItemLabel1">
              Birthdate of the contact person
            </label>
            <input
              type="text"
              placeholder="Your answer"
              name="personBirthday"
              className={`formItemInput1 ${
                errorMessage.personBirthday ? "borderRed" : ""
              }`}
              value={infoForm.personBirthday}
              onChange={handleChange}
            />
            <p className="errorMessge">{errorMessage.personBirthday}</p>
          </div>
          <div className="formItem m-top">
            <label htmlFor="personEmail" className="m-bottom formItemLabel1">
              E-mail of the Contact Person
            </label>
            <input
              type="text"
              placeholder="Your answer"
              name="personEmail"
              className={`formItemInput1 ${
                errorMessage.personEmail ? "borderRed" : ""
              }`}
              value={infoForm.personEmail}
              onChange={handleChange}
            />
            <p className="errorMessge">{errorMessage.personEmail}</p>
          </div>
          <div className="formItem m-top">
            <label htmlFor="personPhone" className="m-bottom formItemLabel1">
              Phone number of the Contact Person
            </label>
            <input
              type="text"
              placeholder="Your answer"
              name="personPhone"
              className={`formItemInput1 ${
                errorMessage.phone ? "borderRed" : ""
              }`}
              value={infoForm.personPhone}
              onChange={handleChange}
            />
            <p className="errorMessge">{errorMessage.phone}</p>
          </div>

          <div className="formItem m-top">
            <label htmlFor="scoolClass" className="formItemLabel1">
              What classes will your team (teams) represent?
            </label>

            <div className="formScoolBlock">
              <div>
                <input
                  type="checkbox"
                  value="5-6 grades"
                  name="scoolClass"
                  onChange={handleClassChange}
                  checked={infoForm.scoolClass === "5-6 grades"}
                />
                <label htmlFor="scoolClass">5-6 grades</label>
              </div>
              <div>
                <input
                  type="checkbox"
                  name="scoolClass"
                  value="7-8 grades"
                  onChange={handleClassChange}
                  checked={infoForm.scoolClass === "7-8 grades"}
                />
                <label htmlFor="scoolClass">7-8 grades</label>
              </div>
              <div>
                <input
                  type="checkbox"
                  name="scoolClass"
                  value="We have 2 teams of both age groups (5-6 and 7-8 grades)."
                  onChange={handleClassChange}
                  checked={
                    infoForm.scoolClass ===
                    "We have 2 teams of both age groups (5-6 and 7-8 grades)."
                  }
                />
                <label htmlFor="scoolClass">
                  We have 2 teams of both age groups (5-6 and 7-8 grades).
                </label>
              </div>
            </div>
            <p className="errorMessge">{errorMessage.scoolClass}</p>
          </div>

          <div className="formItem m-top">
            <label htmlFor="scoolClass" className="formItemLabel1">
              What category are you planning to participate in?
            </label>
            <span className="programSpan"> you can choose only 2 programs</span>
            <div className="formScoolBlock">
              <div>
                <input
                  type="checkbox"
                  name="programs1"
                  value="Healthy lifestyle in a playful way"
                  disabled={programsDisable.programs1Disable}
                  onChange={handleProgramChange}
                  checked={programsChecked.programs1}
                />
                <label htmlFor="programs1">
                  "Healthy lifestyle in a playful way"
                </label>
              </div>
              <div>
                <input
                  type="checkbox"
                  name="programs2"
                  value="Tasty and Healthy: My Favorite Healthy Recipes"
                  disabled={programsDisable.programs2Disable}
                  onChange={handleProgramChange}
                  checked={programsChecked.programs2}
                />
                <label htmlFor="programs2">
                  "Tasty and Healthy: My Favorite Healthy Recipes"
                </label>
              </div>
              <div>
                <input
                  type="checkbox"
                  name="programs3"
                  value="Discovering the World of Healthy lifestyle: Our Research"
                  disabled={programsDisable.programs3Disable}
                  onChange={handleProgramChange}
                  checked={programsChecked.programs3}
                />
                <label htmlFor="programs3">
                  "Discovering the World of Healthy lifestyle: Our Research"
                </label>
              </div>
              <div>
                <input
                  type="checkbox"
                  name="programs4"
                  value="My Healthy Community"
                  disabled={programsDisable.programs4Disable}
                  onChange={handleProgramChange}
                  checked={programsChecked.programs4}
                />
                <label htmlFor="programs4">"My Healthy Community"</label>
              </div>
            </div>
            <p className="errorMessge">{errorMessage.program}</p>
          </div>
          <div className="formBtnBlock">
            <input type="submit" value="Next" className="btn-form" />
            <input
              type="submit"
              onClick={handleClear}
              value="Clear Form"
              className="bnt-clear-form"
            />
          </div>
        </form>
      </div>
      {/* <Link to={`/test/Form1`}>
               Hello
            </Link> */}
    </div>
  );
}
