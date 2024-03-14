import React, { useState, useContext } from "react";
import "./ProgramAbout.css";
import closeImg from "../../assets/close.png";
import progrmas1Img from "../../assets/imagePrograms/programs1.png";
import progrmas2Img from "../../assets/imagePrograms/programs2.png";
import progrmas3Img from "../../assets/imagePrograms/programs3.png";
import progrmas4Img from "../../assets/imagePrograms/programs4.png";
import ReactVidioPlayer from "./ReactVidioPlayer";
import multik from "../../assets/videos/multik.mp4";
import { UserContext } from "../../UserContext";
import { useNavigate } from "react-router-dom";
import { CountDown } from "../countdown/CountDown";

const ProgramAbout = () => {
  const [all, setAll] = useState(false);
  const navigate = useNavigate();

  const [modalAboutProgram, setModalAboutProgram] = useState({
    program1: false,
    program2: false,
    program3: false,
    program4: false,
  });

  const toggleModalAboutProgram = (program) => {
    setModalAboutProgram(!modalAboutProgram);

    if (program === "Healthy lifestyle in a playful way") {
      let updateProgram = {
        program1: true,
      };

      setModalAboutProgram(updateProgram);
    } else if (
      program === "Discovering the World of Healthy lifestyle: Our Research"
    ) {
      let updateProgram = {
        program2: true,
      };

      setModalAboutProgram(updateProgram);
    } else if (program === "My Healthy Community") {
      let updateProgram = {
        program3: true,
      };

      setModalAboutProgram(updateProgram);
    } else {
      let updateProgram = {
        program4: true,
      };

      setModalAboutProgram(updateProgram);
    }
  };

  const toggleModalAboutProgramClose = () => {
    setModalAboutProgram({
      program1: false,
      program2: false,
      program3: false,
      program4: false,
    });
  };

  const toggleAllText = () => {
    setAll(!all);
  };

  const getInTouchClick = () => [navigate("./touch")];

  return (
    <div className="programAbout">
      <ReactVidioPlayer videoPath={multik} />
      <div className="programAboutRow">
        <div className="programAboutRowItem">
          <div className="programAboutRowItemBlock"  onClick={() =>
                  toggleModalAboutProgram("Healthy lifestyle in a playful way")
                }>
            <div className="programAboutRowItemImage">
              <img src={progrmas1Img} />
            </div>
            <div className="programAboutRowText">
              <p
               
              >
                Healthy lifestyle in a playful way
              </p>
            </div>
          </div>
          {modalAboutProgram.program1 && (
            <div className="modalProgramAbout">
              <div
                className="overlay"
                onClick={toggleModalAboutProgramClose}
              ></div>
              <div className="modalProgramAboutContent">
                <button
                  onClick={toggleModalAboutProgramClose}
                  className="close-btn close-btn-program"
                >
                  <img src={closeImg} />
                </button>
                <h2>Healthy lifestyle in a playful way</h2>
                <div
                  className={`modalProgramAboutContentTextBlock ${
                    all ? "heightNone" : "height"
                  }`}
                >
                  <p>
                    Did you know that our health and energy depend a lot on the
                    way we live? Living without bad habits is a great start, but
                    there's so much more to it! To feel less sick, stay strong,
                    sharp, and ready for exciting adventures, we need a healthy
                    lifestyle. And guess what? It's way more exciting than it
                    might seem! A healthy lifestyle isn’t just a trend you pick
                    up for a bit and then forget about. Sometimes people
                    suddenly switch to vegetables and sports, but then they end
                    up back on their favorite couch with popcorn and soda.{" "}
                  </p>

                  <p>
                    But here's the secret: a healthy lifestyle is about making
                    healthy choices a part of your daily routine. It's not a
                    sudden impulse; it's a habit that makes life awesome! It's
                    about eating healthy and nutritious, following a daily
                    routine, balancing work and play, and moving our bodies
                    every day.
                  </p>

                  <p>
                    {" "}
                    Now, imagine being a superhero inspiring others to live
                    healthier! That's what the Healthy Lifestyle Ambassador
                    competition is all about. We're calling on older students
                    like you to become role models for the younger ones, sharing
                    the amazing ideas of a healthy lifestyle. Here's the scoop:
                    this competition is about creating super cool projects
                    focused on healthy living. The creators of the best projects
                    get to join a health camp for a whole week! Here, you'll
                    become real ambassadors, learning cool ways to spread the
                    word about living healthy and getting your whole community
                    on board! Ready to be a part of something incredible? Join
                    us in becoming champions of healthy living and inspiring
                    others to live their best, healthiest lives! PARTICIPANTS
                    5-8 grade school children in teams of up to 4 people from
                    all over Armenia. One team per school can participate in one
                    age category: 5th-6th graders and 7th-8th graders. Up to 2
                    teams can participate from one school. THE TASK Participants
                    (teams) should develop a project on a topic appropriate to
                    their age group. The project will be consisted of t: The
                    application form[1]  with all the necessary materials
                    uploaded the description of the project The project
                    presentation in a format appropriate to the topic for the
                    related age category (description below). We will develop an
                    application form for each category to ensure participants
                    have an equal opportunity to participate.
                  </p>
                </div>
                <div className="modalProgramAboutContentBtnBlock">
                  <button onClick={getInTouchClick}> Get In Touch</button>
                </div>
              </div>
            </div>
          )}
        </div>
        <div className="programAboutRowItem">
          <div className="programAboutRowItemBlock"  onClick={() =>
                  toggleModalAboutProgram(
                    "Discovering the World of Healthy lifestyle: Our Research"
                  )
                }>
            <div className="programAboutRowItemImage">
              <img src={progrmas2Img} />
            </div>
            <div className="programAboutRowText">
              <p
               
              >
                Discovering the World of Healthy lifestyle: Our Research
              </p>
            </div>
          </div>
          {modalAboutProgram.program2 && (
            <div className="modalProgramAbout">
              <div
                className="overlay"
                onClick={toggleModalAboutProgramClose}
              ></div>
              <div className="modalProgramAboutContent">
                <button
                  onClick={toggleModalAboutProgramClose}
                  className="close-btn close-btn-program"
                >
                  <img src={closeImg} />
                </button>
                <h2>
                  Discovering the World of Healthy lifestyle: Our Research
                </h2>
                <div
                  className={`modalProgramAboutContentTextBlock ${
                    all ? "heightNone" : "height"
                  }`}
                >
                  <p>
                    Did you know that our health and energy depend a lot on the
                    way we live? Living without bad habits is a great start, but
                    there's so much more to it! To feel less sick, stay strong,
                    sharp, and ready for exciting adventures, we need a healthy
                    lifestyle. And guess what? It's way more exciting than it
                    might seem! A healthy lifestyle isn’t just a trend you pick
                    up for a bit and then forget about. Sometimes people
                    suddenly switch to vegetables and sports, but then they end
                    up back on their favorite couch with popcorn and soda.{" "}
                  </p>

                  <p>
                    But here's the secret: a healthy lifestyle is about making
                    healthy choices a part of your daily routine. It's not a
                    sudden impulse; it's a habit that makes life awesome! It's
                    about eating healthy and nutritious, following a daily
                    routine, balancing work and play, and moving our bodies
                    every day.
                  </p>

                  <p>
                    {" "}
                    Now, imagine being a superhero inspiring others to live
                    healthier! That's what the Healthy Lifestyle Ambassador
                    competition is all about. We're calling on older students
                    like you to become role models for the younger ones, sharing
                    the amazing ideas of a healthy lifestyle. Here's the scoop:
                    this competition is about creating super cool projects
                    focused on healthy living. The creators of the best projects
                    get to join a health camp for a whole week! Here, you'll
                    become real ambassadors, learning cool ways to spread the
                    word about living healthy and getting your whole community
                    on board! Ready to be a part of something incredible? Join
                    us in becoming champions of healthy living and inspiring
                    others to live their best, healthiest lives! PARTICIPANTS
                    5-8 grade school children in teams of up to 4 people from
                    all over Armenia. One team per school can participate in one
                    age category: 5th-6th graders and 7th-8th graders. Up to 2
                    teams can participate from one school. THE TASK Participants
                    (teams) should develop a project on a topic appropriate to
                    their age group. The project will be consisted of t: The
                    application form[1]  with all the necessary materials
                    uploaded the description of the project The project
                    presentation in a format appropriate to the topic for the
                    related age category (description below). We will develop an
                    application form for each category to ensure participants
                    have an equal opportunity to participate.
                  </p>
                </div>
                <div className="modalProgramAboutContentBtnBlock">
                  <button onClick={getInTouchClick}>Get In Touch</button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="programAboutRow">
        <div className="programAboutRowItem">
          <div className="programAboutRowItemBlock" onClick={() => toggleModalAboutProgram("My Healthy Community")}>
            <div className="programAboutRowItemImage">
              <img src={progrmas3Img} />
            </div>
            <div className="programAboutRowText"  >
              <p
               
              >
                My Healthy Community
              </p>
            </div>
          </div>
          {modalAboutProgram.program3 && (
            <div className="modalProgramAbout">
              <div
                className="overlay"
                onClick={toggleModalAboutProgramClose}
              ></div>
              <div className="modalProgramAboutContent">
                <button
                  onClick={toggleModalAboutProgramClose}
                  className="close-btn close-btn-program"
                >
                  <img src={closeImg} />
                </button>
                <h2>My Healthy Community</h2>
                <div
                  className={`modalProgramAboutContentTextBlock ${
                    all ? "heightNone" : "height"
                  }`}
                >
                  <p>
                    Did you know that our health and energy depend a lot on the
                    way we live? Living without bad habits is a great start, but
                    there's so much more to it! To feel less sick, stay strong,
                    sharp, and ready for exciting adventures, we need a healthy
                    lifestyle. And guess what? It's way more exciting than it
                    might seem! A healthy lifestyle isn’t just a trend you pick
                    up for a bit and then forget about. Sometimes people
                    suddenly switch to vegetables and sports, but then they end
                    up back on their favorite couch with popcorn and soda.{" "}
                  </p>

                  <p>
                    But here's the secret: a healthy lifestyle is about making
                    healthy choices a part of your daily routine. It's not a
                    sudden impulse; it's a habit that makes life awesome! It's
                    about eating healthy and nutritious, following a daily
                    routine, balancing work and play, and moving our bodies
                    every day.
                  </p>

                  <p>
                    {" "}
                    Now, imagine being a superhero inspiring others to live
                    healthier! That's what the Healthy Lifestyle Ambassador
                    competition is all about. We're calling on older students
                    like you to become role models for the younger ones, sharing
                    the amazing ideas of a healthy lifestyle. Here's the scoop:
                    this competition is about creating super cool projects
                    focused on healthy living. The creators of the best projects
                    get to join a health camp for a whole week! Here, you'll
                    become real ambassadors, learning cool ways to spread the
                    word about living healthy and getting your whole community
                    on board! Ready to be a part of something incredible? Join
                    us in becoming champions of healthy living and inspiring
                    others to live their best, healthiest lives! PARTICIPANTS
                    5-8 grade school children in teams of up to 4 people from
                    all over Armenia. One team per school can participate in one
                    age category: 5th-6th graders and 7th-8th graders. Up to 2
                    teams can participate from one school. THE TASK Participants
                    (teams) should develop a project on a topic appropriate to
                    their age group. The project will be consisted of t: The
                    application form[1]  with all the necessary materials
                    uploaded the description of the project The project
                    presentation in a format appropriate to the topic for the
                    related age category (description below). We will develop an
                    application form for each category to ensure participants
                    have an equal opportunity to participate.
                  </p>
                </div>
                <div className="modalProgramAboutContentBtnBlock">
                  <button onClick={getInTouchClick}>Get In Touch</button>
                </div>
              </div>
            </div>
          )}
        </div>
        <div className="programAboutRowItem">
          <div className="programAboutRowItemBlock" onClick={() =>
                  toggleModalAboutProgram(
                    "Tasty and Healthy: My Favorite Healthy Recipes"
                  )
                }>
            <div className="programAboutRowItemImage">
              <img src={progrmas4Img} />
            </div>
            <div className="programAboutRowText">
              <p
                
              >
                Tasty and Healthy: My Favorite Healthy Recipes
              </p>
            </div>
          </div>
          {modalAboutProgram.program4 && (
            <div className="modalProgramAbout">
              <div
                className="overlay"
                onClick={toggleModalAboutProgramClose}
              ></div>
              <div className="modalProgramAboutContent">
                <button
                  onClick={toggleModalAboutProgramClose}
                  className="close-btn close-btn-program"
                >
                  <img src={closeImg} />
                </button>
                <h2>Tasty and Healthy: My Favorite Healthy Recipes</h2>
                <div
                  className={`modalProgramAboutContentTextBlock ${
                    all ? "heightNone" : "height"
                  }`}
                >
                  <p>
                    Did you know that our health and energy depend a lot on the
                    way we live? Living without bad habits is a great start, but
                    there's so much more to it! To feel less sick, stay strong,
                    sharp, and ready for exciting adventures, we need a healthy
                    lifestyle. And guess what? It's way more exciting than it
                    might seem! A healthy lifestyle isn’t just a trend you pick
                    up for a bit and then forget about. Sometimes people
                    suddenly switch to vegetables and sports, but then they end
                    up back on their favorite couch with popcorn and soda.{" "}
                  </p>

                  <p>
                    But here's the secret: a healthy lifestyle is about making
                    healthy choices a part of your daily routine. It's not a
                    sudden impulse; it's a habit that makes life awesome! It's
                    about eating healthy and nutritious, following a daily
                    routine, balancing work and play, and moving our bodies
                    every day.
                  </p>

                  <p>
                    {" "}
                    Now, imagine being a superhero inspiring others to live
                    healthier! That's what the Healthy Lifestyle Ambassador
                    competition is all about. We're calling on older students
                    like you to become role models for the younger ones, sharing
                    the amazing ideas of a healthy lifestyle. Here's the scoop:
                    this competition is about creating super cool projects
                    focused on healthy living. The creators of the best projects
                    get to join a health camp for a whole week! Here, you'll
                    become real ambassadors, learning cool ways to spread the
                    word about living healthy and getting your whole community
                    on board! Ready to be a part of something incredible? Join
                    us in becoming champions of healthy living and inspiring
                    others to live their best, healthiest lives! PARTICIPANTS
                    5-8 grade school children in teams of up to 4 people from
                    all over Armenia. One team per school can participate in one
                    age category: 5th-6th graders and 7th-8th graders. Up to 2
                    teams can participate from one school. THE TASK Participants
                    (teams) should develop a project on a topic appropriate to
                    their age group. The project will be consisted of t: The
                    application form[1]  with all the necessary materials
                    uploaded the description of the project The project
                    presentation in a format appropriate to the topic for the
                    related age category (description below). We will develop an
                    application form for each category to ensure participants
                    have an equal opportunity to participate.
                  </p>
                </div>
                <div className="modalProgramAboutContentBtnBlock">
                  <button onClick={getInTouchClick}>Get In Touch</button>
                </div>
              </div>
            </div>
          )}
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
            it's a habit that makes life awesome! It's about eating healthy and
            nutritious, following a daily routine, balancing work and play, and
            moving our bodies every day.
          </p>
          <p>
            Now, imagine being a superhero inspiring others to live healthier!
            That's what the Healthy Lifestyle Ambassador competition is all
            about. We're calling on older students like you to become role
            models for the younger ones, sharing the amazing ideas of a healthy
            lifestyle.
          </p>

          <p>
            Here's the scoop: this competition is about creating super cool
            projects focused on healthy living. The creators of the best
            projects get to join a health camp for a whole week! Here, you'll
            become real ambassadors, learning cool ways to spread the word about
            living healthy and getting your whole community on board!
          </p>
          <p>
            Ready to be a part of something incredible? Join us in becoming
            champions of healthy living and inspiring others to live their best,
            healthiest lives!
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
            Participants (teams) should develop a project on a topic appropriate
            to their age group.
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
    </div>
  );
};

export default ProgramAbout;
