import React,{useState} from 'react'
import { toast } from 'react-toastify';

export const Touch = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [messages, setMessages] = useState("");
  
    const [errorName, setErrorName] = useState(true);
    const [errorEmail, setErrorEmail] = useState(true);
    // const [errorMessages, setErrorMessages] = useState(true);
  
    const validationTouch = () => {
      let error = true;
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(
        email
      );
      if (name === "" || name === null) {
       toast.warning("Անուն դաշտը պարտադիր է․․․ ");
        setErrorName(false);
        error = false;
      } else if (name.length <= 2) {
        toast.warning("Անունը պետք է լինի 2 տառից ավել․․․");
        error = false;
        setErrorName(false);
      } else {
        setErrorName(true);
      }
  
      if (email === "" || email === null) {
        toast.warning(" Էլեկտրոնային հասցեն պարտադիր է․․․ ");
        error = false;
        setErrorEmail(false);
      } else if (!emailRegex) {
        toast.warning("Էլեկտրոնային հասցեն սխալ է․․․ ");
        error = false;
        setErrorEmail(false);
      } else {
        setErrorEmail(true);
      }
  
    //   if (messages === "" || messages === null) {
    //     toast.warning(" Message is required, ");
    //     error = false;
    //     setErrorMessages(false);
    //   } else if (messages.length <= 10) {
    //     toast.warning(" Message must be no more than 3 words, ");
    //     error = false;
    //     setErrorMessages(false);
    //   } else {
    //     setErrorMessages(true);
    //   }
     
  
      return error;
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
      let obj = {
        name,
        email,
        messages,
      };
  
      if (validationTouch()) {
        fetch("http://127.0.0.1:8000/info/users/", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify(obj),
        })
          .then((res) => {
            setName("");
            setEmail("");
            setMessages("");
            toast.success("Հաղորդագրությունը հաջողությամբ ուղարկվել է");
          })
          .catch((err) => {
            toast.success("Հաղորդագրությունը չի ուղարկվել");
          });
      }
    };
  
  
  return (
    <div className="touch">
              <a href="./" className='back'>Հետ</a>

          <div className="touch-div">
            <h2>Կապ հաստատել</h2>
            <div className="line"></div>

            <form onSubmit={handleSubmit}>
              <div className="name">
                <label>Անուն</label>
                <input
                  type="text"
                  placeholder="Անուն*"
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                  className={errorName ? "" : "error"}
                />
              </div>
              <div className="email">
                <label>Էլեկտրոնային հասցե</label>
                <input
                  type="text"
                  placeholder="Էլ-փոստ․․․"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  className={errorEmail ? "" : "error"}
                />
              </div>

              <div className="textarea">
                <textarea
                  placeholder="Ձեր հաղորդագրությունը"
                  onChange={(e) => setMessages(e.target.value)}
                  value={messages}
                ></textarea>
              </div>

              <button type={"submit"}>Ուղարկել</button>
            </form>
          </div>
        </div>
  )
}
