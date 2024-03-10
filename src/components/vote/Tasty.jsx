import axios from "axios";
import React, { useContext, useState, useRef } from "react";
import { UserContext } from "../../UserContext";
import "./Vote.css";
import { Terms } from "./Terms";
import { toast } from 'react-toastify';

export const Tasty = () => {
  const [name1, setName1] = useState("");
  const [name2, setName2] = useState("");
  const [name3, setName3] = useState("");
  const [name4, setName4] = useState("");

  const [files, setFiles] = useState([]);
  const [filesPhotos, setFilesPhotos] = useState([]);
  const [filesPdf, setFilesPdf] = useState([]);
  const [filesVideo, setFilesVideo] = useState([]);
  const [showProgress, setShowProgress] = useState(false);
  const [disabled, setDisabled] = useState(false);

  // button click
  const fileInputRefMS = useRef();
  const fileInputRefPhotos = useRef();
  const fileInputRefPdf = useRef();
  const fileInputRefVideo = useRef();

  // upload files
  const [uploadedFiles1, setUploadedFiles1] = useState([]);
  const [uploadedFiles2, setUploadedFiles2] = useState([]);
  const [uploadedFiles3, setUploadedFiles3] = useState([]);
  const [uploadedFiles4, setUploadedFiles4] = useState([]);

  const { userState, userActions } = useContext(UserContext);

  const onClickInfo = (e) => {
    e.preventDefault();
    if(validationNames()){

      let arr = [
        {
          names: [
            { name1: name1 },
            { name2: name2 },
            { name3: name3 },
            { name4: name4 },
          ]
        }
      ];
      let obj = {
        files,
        filesPhotos,
        filesPdf,
        filesVideo,
      };

      console.log(obj, arr);
      toast.success("Success ");


      //   fetch("http://127.0.0.1:8000/info/users/", {
      //     method: "POST",
      //     headers: { "content-type": "application/json" },
      //     body: JSON.stringify(obj),
      //   })
      //     .then((res) => {
      //       toast.success("Success");
      //       navigate("/login");
      //       debugger;
      //     })
      //     .catch((err) => {
      //       toast.success("Fail: " + err.message);
      //     });
      
  }

  };

  // validation

  const validationNames = () => {
    let errorValidate = true;
    const letterRegex1 = /^[A-Za-z\u0400-\u04FF\u0531-\u058F]+$/u.test(name1);
    const letterRegex2 = /^[A-Za-z\u0400-\u04FF\u0531-\u058F]+$/u.test(name2);
    const letterRegex3 = /^[A-Za-z\u0400-\u04FF\u0531-\u058F]+$/u.test(name3);
    const letterRegex4 = /^[A-Za-z\u0400-\u04FF\u0531-\u058F]+$/u.test(name4);
    if (name1 === "" || name2 === "" || name3 === "" || name4 === "") {
      toast.warning("Fill in the participan's name, ");
      errorValidate = false;
    } else if (
      !letterRegex1 ||
      !letterRegex2 ||
      !letterRegex3 ||
      !letterRegex4
    ) {
      toast.warning(" The name must not contain a number, ");
      errorValidate = false;
    } else if (
      files.length === 0 ||
      filesPhotos.length === 0 ||
      filesPdf.length === 0 ||
      filesVideo.length === 0
    ) {
      toast.warning(" Upload all files");
      errorValidate = false;
    }

    return errorValidate;
  };


  const validationUploadMS = async (file, buttonId) => {
    const allowedExtensions = ["doc", "docx"];
    const maxSizeInBytes = 3 * 1024 * 1024; // 3 MB
    const allowedPages = 3;
    file = file[0];
    const fileExtension = file.name.split(".").pop().toLowerCase();
    if (!allowedExtensions.includes(fileExtension)) {
      toast.warning(
        "Invalid file type. Please upload a Word document (doc or docx)."
      );
      return;
    }

    if (file.size > maxSizeInBytes) {
      toast.warning(
        "File size exceeds the limit (3 MB). Please upload a smaller file."
      );
      return;
    }

    await uploadFile(file, buttonId);
  };

  const validationPhotos = async (file, buttonId) => {
    if (file.length <= 10) {
      const allowedExtensions = ["jpg", "jpeg"];
      const maxFiles = 10;

      for (let i = 0; i < file.length; i++) {
        const fileExtension = file[i].name.split(".").pop().toLowerCase();
        if (!allowedExtensions.includes(fileExtension)) {
          toast.warning(
            "Invalid file type. Please upload JPG or JPEG images."
          );
          return;
        }
      }

      const currentFilesCount = uploadedFiles1.length;
      if (currentFilesCount >= maxFiles) {
        toast.warning(
          `You can upload a maximum of ${maxFiles} photos.`
        );
        return;
      }

      await uploadFile(file, buttonId);
    } else {
      toast.warning(
        "take photos less 10"
      );
    }
  };

  const validationPdf = async (file, buttonId) => {
    const allowedExtensions = ["pdf"];
    const maxSizeInBytes = 10 * 1024 * 1024;
    file = file[0];

    const fileExtension = file.name.split(".").pop().toLowerCase();
    if (!allowedExtensions.includes(fileExtension)) {
      toast.warning(
        "Invalid file type. Please upload a PDF file."
      );
      return;
    }

    if (file.size > maxSizeInBytes) {
     
      toast.warning(
        "File size exceeds the limit (10 MB). Please upload a smaller file."
      );
      return;
    }

    await uploadFile(file, buttonId);
  };
  const validationVideo = async (file, buttonId) => {
    file = file[0];

    const allowedFormats = [
      "video/mp4",
      "video/quicktime",
      "video/x-ms-wmv",
      "video/avi",
    ];
    const maxDurationInSeconds = 180; // 3 minutes
    const maxFileSizeInBytes = 1 * 1024 * 1024 * 1024; // 1 GB

    if (!allowedFormats.includes(file.type)) {
      toast.warning(
        "Invalid video format. Please upload a video in MP4, MOV, WMV, or AVI format."
      );
      return;
    }

    if (file.size > maxFileSizeInBytes) {
      toast.warning(
        "File size exceeds the limit (1 GB). Please upload a smaller file."
      );
      return;
    }

    const videoDuration = await getVideoDuration(file);
    if (videoDuration > maxDurationInSeconds) {
      toast.warning(
        "Video duration exceeds the limit (3 minutes). Please upload a shorter video."
      );
      return;
    }

    await uploadFile(file, buttonId);
  };

  // video duration
  const getVideoDuration = async (file) => {
    return new Promise((resolve, reject) => {
      const video = document.createElement("video");
      video.preload = "metadata";
      video.onloadedmetadata = () => {
        resolve(Math.round(video.duration));
      };
      video.onerror = reject;
      video.src = URL.createObjectURL(file);
    });
  };
  const handleFileChange = (event, buttonId) => {
    const file = event.target.files;

    if (!file) {
      return;
    }

    switch (buttonId) {
      case 1:
        validationUploadMS(file, buttonId);
        break;
      case 2:
        validationPhotos(file, buttonId);
        break;
      case 3:
        validationPdf(file, buttonId);
        break;
      case 4:
        validationVideo(file, buttonId);
        break;
      default:
        break;
    }
  };

  const uploadFile = (file, buttonId) => {
    
    const formData = new FormData();
    for (let i = 0; i < file.length; i++) {
      const fileName =
        file[i].name.length > 12
          ? `${file[i].name.substring(0, 13)}... .${file[i].name.split(".")[1]}`
          : file[i].name;
      formData.append("file", file[i]);
    }

    switch (buttonId) {
      case 1:
        setFiles(file);
        break;
      case 2:
        setFilesPhotos(file);
        break;
      case 3:
        setFilesPdf(file);
        break;
      case 4:
        setFilesVideo(file);
        break;
      default:
        break;
    }
    setShowProgress(true);
  };

  const handleFileInputClickMS = () => {
    fileInputRefMS.current.click();
  };
  const handleFileInputClickPhotos = () => {
    fileInputRefPhotos.current.click();
  };
  const handleFileInputClickPdf = () => {
    fileInputRefPdf.current.click();
  };
  const handleFileInputClickVideo = () => {
    fileInputRefVideo.current.click();
  };

  return (
    <div className="lifestyle">
      <img
        src={require("../../assets/tasty.png")}
        alt=""
        className="children"
      />
      <h1>"Tasty and Healthy: My Favorite Healthy Recipes" Application form</h1>
      <div className="names">
        <h2>
          Fill in the names and surnames  of 4 team members (schoolchildren).
        </h2>
        <input
          type="text"
          placeholder="Your answer"
          onChange={(e) => setName1(e.target.value)}
        />
        <input
          type="text"
          placeholder="Your answer"
          onChange={(e) => setName2(e.target.value)}
        />
        <input
          type="text"
          placeholder="Your answer"
          onChange={(e) => setName3(e.target.value)}
        />
        <input
          type="text"
          placeholder="Your answer"
          onChange={(e) => setName4(e.target.value)}
        />
      </div>

      <div className="game">
        <div className="concept">
          <h2>Healthy Breakfast/Snack/Dish Recipe Concept:</h2>
          <span>
            the name and the detailed description of the Recipe (the recipe may
            exist, but note what makes your version unique).
          </span>
        </div>

        <div className="upload">
          <div className="upload-concept">
            <div>
              <input
                type="file"
                onChange={(e) => handleFileChange(e, 1)}
                name={"file"}
                hidden
                ref={fileInputRefMS}
              />
              <img
                src={require("../../assets/upload.png")}
                alt="Upload"
                title="Upload"
              />
              <p>{files.name}</p>
              
            </div>

            <div>
              <h4>
                Select a file or drag and drop here
                <p>
                  Upload a document in MS word (not more than three A4 pages,
                  Times New Roman 12).*
                </p>
              </h4>
            </div>
          </div>

          <div>
            <button className="select" onClick={handleFileInputClickMS}>
              Select file
            </button>
          </div>
        </div>

        <div className="info">
          <span>The concept should reflect:</span>
          <ul>
            <li>list and quantity of necessary ingredients;</li>
            <li>necessary equipment;</li>
            <li>cooking time;</li>
            <li>step-by-step description of cooking process;</li>
            <li>hints on having a better result (if there are).</li>
            <li>
              what will be needed for the game/requisite (models or drawings of
              necessary items or decorations, description of materials,
              instructions how to make them),
            </li>
            <li>safety of the game for players and the environment.</li>
          </ul>
          <span>Nutrition value:</span>
          <ul>
            <li>
              details regarding the nutritional content, including the
              description of what useful ingredients are contained in the dish.
            </li>
          </ul>
          <span>Relevance and traditions:</span>.
          <ul>
            <li>
              why this particular dish was chosen, its origin, historical roots
              (if known);
            </li>
            <li>what meal (time, holiday) can this dish be recommended for?</li>
            <li>
              whether any traditional ingredients or cooking secrets regarding
              preparation technique used while making the Recipe
            </li>
          </ul>
        </div>
      </div>

      <div className="photos">
        <div className="concept">
          <h2> Photos</h2>
          <span>
            that illustrate the whole list of the ingredients, the children in
            the process of making the dish, and the already prepared dish.*
          </span>
        </div>

        <div className="upload">
          <div className="upload-concept">
            <div>
              <input
                type="file"
                onChange={(e) => handleFileChange(e, 2)}
                name={"file"}
                hidden
                ref={fileInputRefPhotos}
                multiple
              />
              <img
                src={require("../../assets/upload.png")}
                alt="Upload"
                title="Upload"
              />
              {filesPhotos &&
                [filesPhotos].map((i, index) => {
                  return <p>{i[index] === undefined ? "" : i[index].name}</p>;
                })}
            </div>

            <div>
              <h4>
                Select a file or drag and drop here
                <p>Upload photos in JPG format (not more than 10 pcs.)</p>
              </h4>
            </div>
          </div>

          <div>
            <button className="select" onClick={handleFileInputClickPhotos}>
              Select file
            </button>
          </div>
        </div>

        <div className="info">
          <span>
            Please, upload photos that later can be used in the printing
            materials. The photos should be of good quality and made with good
            lighting. The photos should be taken from above on a white
            background. The dish should be photographed on a white plate without
            patterns.
          </span>
        </div>
      </div>

      <div className="leaflet">
        <div className="concept">
          <h2>Leaflet</h2>
        </div>

        <div className="upload">
          <div className="upload-concept">
            <div>
              <input
                type="file"
                onChange={(e) => handleFileChange(e, 3)}
                name={"file"}
                hidden
                ref={fileInputRefPdf}
              />
              <img
                src={require("../../assets/upload.png")}
                alt="Upload"
                title="Upload"
              />
              <p>{filesPdf.name}</p>
            </div>

            <div>
              <h4>
                Select a file or drag and drop here
                <p>
                  Upload a designed tri-fold* brochure ready to print (PDF
                  format required).{" "}
                  <small>
                    <span>*</span> Tri-fold brochure is two A4 pages (front and
                    back side), each side divided into three rectangular
                    sections
                  </small>
                </p>
              </h4>
            </div>
          </div>

          <div>
            <button className="select" onClick={handleFileInputClickPdf}>
              Select file
            </button>
          </div>
        </div>

        <div className="info">
          <span>Designed leaflet should include:</span>

          <ul>
            <li>
              The clear description of the recipe, emphasizing why it can be
              considered a healthy one.
            </li>
            <li>
              List of all the ingredients and kitchen utensils required to
              prepare the dish, ensuring accessibility and simplicity.
            </li>
            <li>
              Clear, step-by-step, easy-to-follow instructions for cooking the
              dish, ensuring clarity for the peers.
            </li>
          </ul>
        </div>
      </div>

      <div className="video">
        <div className="concept">
          <h2>Video presentation</h2>
        </div>

        <div className="upload">
          <div className="upload-concept">
            <div>
              <input
                type="file"
                onChange={(e) => handleFileChange(e, 4)}
                name={"file"}
                hidden
                ref={fileInputRefVideo}
              />
              <img
                src={require("../../assets/upload.png")}
                alt="Upload"
                title="Upload"
              />
              <p>{filesVideo.name}</p>
            </div>

            <div>
              <h4>
                Select a file or drag and drop here
                <p>
                  Upload a video no longer than 3 minutes.
                  <small>
                    <span>*</span>Video formats: MP4, MOV, WMV, AVI. Not more
                    than 1 GB
                  </small>
                </p>
              </h4>
            </div>
          </div>

          <div>
            <button className="select" onClick={handleFileInputClickVideo}>
              Select file
            </button>
          </div>
        </div>

        <div className="info">
          <span>The video should:</span>

          <ul>
            <li>show the ingredients and preparation instructions;</li>
            <li>show the process of the preparation of the Recipe;</li>
            <li>show the engagement of the children preparing;</li>

            <li> show the final dish; </li>
            <li>
              show the innovative cooking methods, or a unique culinary approach
              (if there are).
            </li>
          </ul>
        </div>
      </div>

      <div className="agree">
        <div className="agree-text">
          <input type="checkbox" onClick={() => setDisabled(!disabled)} />
          <span>i agree with </span>
        </div>
        <div className="term">
          <a href="javascript:void(0)" onClick={userActions.toggleModal}>
            Terms of use
          </a>
          <Terms />
        </div>
      </div>
      <div className="submit">
        {disabled && <button onClick={onClickInfo}>Submit</button>}
      </div>
    </div>
  );
};
