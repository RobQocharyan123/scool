import React, { useContext, useState } from "react";
import "./Home.css";
import { UserContext } from "../../UserContext";
import "../register/Register.css";
import { toast } from "react-toastify";
import { CountDown } from "./../countdown/CountDown";
import { PdfImage } from './pdfImage/PdfImage';



let arr = [
  {
    id: "1",
    photoUrl: [{"1":"../../assets/community.png"},{"1":"../../assets/community.png"},{"1":"../../assets/discovering.png"},{"1":"../../assets/lifestyle.png"},{"1":"../../assets/tasty.png"}],
    pdfUrl: "../../assets/funk.pdf",
    msUrl: "",
    video: "url",
  },
  { id: "2", photoUrl: "", pdfUrl: "", msUrl: "", video: "url" },
  { id: "3", photoUrl: "", pdfUrl: "", msUrl: "", video: "url" },
  { id: "4", photoUrl: "", pdfUrl: "", msUrl: "", video: "url" },
];

export const Home = () => {
  const { userState, userActions } = useContext(UserContext);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [messages, setMessages] = useState("");

  const [errorName, setErrorName] = useState(true);
  const [errorEmail, setErrorEmail] = useState(true);
  const [errorMessages, setErrorMessages] = useState(true);

  const validationTouch = (obj) => {
    let errorMSG = "";
    let error = true;
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(
      email
    );
    if (name === "" || name === null) {
      errorMSG += " Name is required, ";
      setErrorName(false);
      error = false;
    } else if (name.length <= 2) {
      errorMSG += " Name must be at least 2 characters, ";
      error = false;
      setErrorName(false);
    } else {
      setErrorName(true);
    }

    if (!emailRegex) {
      errorMSG += " Write right Email, ";
      error = false;
      setErrorEmail(false);
    } else if (email === "" || email === null) {
      errorMSG += " Email is required, ";
      error = false;
      setErrorEmail(false);
    } else {
      setErrorEmail(true);
    }

    if (messages === "" || messages === null) {
      errorMSG += " Message is required, ";
      error = false;
      setErrorMessages(false);
    } else if (messages.length <= 10) {
      errorMSG += " Message must be no more than 3 words, ";
      error = false;
      setErrorMessages(false);
    } else {
      setErrorMessages(true);
    }
    if (!error) {
      toast.warning(errorMSG);
    }

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
          toast.success("Success");
        })
        .catch((err) => {
          toast.success("Fail: Urel Isn't work ");
        });
    }
  };


  return (
    <>
      <div className="home">
        <div className="partisipate">
          <div>
            <h1>The "Ambassador of a Healthy Lifestyle" Competition 2024</h1>
            <button>To Partisipate</button>
          </div>
        </div>
        <div className="introducion">
          <div className="introducion-info">
            <h4>Hello, future Champions of Healthy Lifestyle!</h4>
            <p>
              Did you know that our health and energy depend a lot on the way we
              live? Living without bad habits is a great start, but there's so
              much more to it! To feel less sick, stay strong, sharp, and ready
              for exciting adventures, we need a healthy lifestyle. And guess
              what? It's way more exciting than it might seem!
            </p>
            <p>
              A healthy lifestyle isn’t just a trend you pick up for a bit and
              then forget about. Sometimes people suddenly switch to vegetables
              and sports, but then they end up back on their favorite couch with
              popcorn and soda.
            </p>

            <p>
              But here's the secret: a healthy lifestyle is about making healthy
              choices a part of your daily routine. It's not a sudden impulse;
              it's a habit that makes life awesome! It's about eating healthy
              and nutritious, following a daily routine, balancing work and
              play, and moving our bodies every day.
            </p>
            <p>
              Now, imagine being a superhero inspiring others to live healthier!
              That's what the Healthy Lifestyle Ambassador competition is all
              about. We're calling on older students like you to become role
              models for the younger ones, sharing the amazing ideas of a
              healthy lifestyle.
            </p>

            <p>
              Here's the scoop: this competition is about creating super cool
              projects focused on healthy living. The creators of the best
              projects get to join a health camp for a whole week! Here, you'll
              become real ambassadors, learning cool ways to spread the word
              about living healthy and getting your whole community on board!
            </p>
            <p>
              Ready to be a part of something incredible? Join us in becoming
              champions of healthy living and inspiring others to live their
              best, healthiest lives!
            </p>
          </div>
          <div className="introducion-info">
            <h4>PARTICIPANTS</h4>
            <p>
              5-8 grade school children in teams of up to 4 people from all over
              Armenia. One team per school can participate in one age category:
              5th-6th graders and 7th-8th graders. Up to 2 teams can participate
              from one school.
            </p>
          </div>
          <div className="introducion-info">
            <h4>THE TASK</h4>

            <p>
              Participants (teams) should develop a project on a topic
              appropriate to their age group.
            </p>
            <p>The project will be consisted of t:</p>
            <p>
              The application form[1]  with all the necessary materials uploaded
              the description of the project
            </p>
            <p>
              The project presentation in a format appropriate to the topic for
              the related age category (description below).
            </p>

            <p>
              We will develop an application form for each category to ensure
              participants have an equal opportunity to participate.
            </p>
          </div>
        </div>

        <div className="scedule">
          <CountDown />
        </div>

        <div className="vote">
          <div className="vote-section">
           <PdfImage />
          </div>

          <div className="button">
            <button>Submit</button>
          </div>
        </div>

        <div className="touch">
          <div className="touch-div">
            <h2>Get in touch</h2>
            <div className="line"></div>

            <form onSubmit={handleSubmit}>
              <div className="name">
                <label>Name</label>
                <input
                  type="text"
                  placeholder="Enter youre name"
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                  className={errorName ? "" : "error"}
                />
              </div>
              <div className="email">
                <label>Email</label>
                <input
                  type="text"
                  placeholder="Enter your Email"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  className={errorEmail ? "" : "error"}
                />
              </div>

              <div className="textarea">
                <textarea
                  placeholder="Youre Messages"
                  className={errorMessages ? "" : "error"}
                  onChange={(e) => setMessages(e.target.value)}
                  value={messages}
                ></textarea>
              </div>

              <button type={"submit"}>Send</button>
              {/* <a href="">Back</a> */}
            </form>
          </div>
        </div>
      </div>
      {/* <Outlet /> */}
    </>
  );
};
