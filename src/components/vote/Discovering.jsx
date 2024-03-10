import axios from "axios";
import React, { useContext, useState, useRef } from "react";
import { UserContext } from "../../UserContext";
import "./Vote.css";
import { Terms } from "./Terms";
import { toast } from "react-toastify";

// Set the path to the worker script

export const Discovering = () => {
  const [name1, setName1] = useState("");
  const [name2, setName2] = useState("");
  const [name3, setName3] = useState("");
  const [name4, setName4] = useState("");

  const [files, setFiles] = useState([]);
  const [filesPresentation, setFilesPresentation] = useState([]);
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
  const fileInputRefPresentation = useRef();

  // upload files
  const [uploadedFiles1, setUploadedFiles1] = useState([]);
  const [uploadedFiles2, setUploadedFiles2] = useState([]);
  const [uploadedFiles3, setUploadedFiles3] = useState([]);
  const [uploadedFiles4, setUploadedFiles4] = useState([]);

  const { userState, userActions } = useContext(UserContext);

  const onClickInfo = (e) => {
    e.preventDefault();

    if (validationNames()) {
      let arr = [
        {
          names: [
            { name1: name1 },
            { name2: name2 },
            { name3: name3 },
            { name4: name4 },
          ],
        },
      ];
      let obj = {
        files,
        filesPresentation,
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
      filesPresentation.length === 0 ||
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
  const validationPresentation = async (file, buttonId) => {
    const allowedExtensions = ["pdf", "ppt"];
    const maxFileSizeInPages = 15;

    const fileExtension = file[0].name.split(".").pop().toLowerCase();
    if (!allowedExtensions.includes(fileExtension)) {
      toast.warning(
        "Invalid file type. Please upload a PDF or PowerPoint document."
      );
      return;
    }
    if (file[0].size > maxFileSizeInPages * 1024 * 1024) {
      toast.warning("File size exceeds the maximum limit of 15 pages.");
      return false;
    }

    await uploadFile(file, buttonId);
  };

  const validationPhotos = async (file, buttonId) => {
    if (file.length <= 5) {
      const allowedExtensions = ["jpg", "jpeg"];
      const maxFiles = 5;

      for (let i = 0; i < file.length; i++) {
        const fileExtension = file[i].name.split(".").pop().toLowerCase();
        if (!allowedExtensions.includes(fileExtension)) {
          toast.warning("Invalid file type. Please upload JPG or JPEG images.");
          return;
        }
      }

      const currentFilesCount = uploadedFiles1.length;
      if (currentFilesCount >= maxFiles) {
        toast.warning(`You can upload a maximum of ${maxFiles} photos.`);
        return;
      }

      await uploadFile(file, buttonId);
    } else {
      toast.warning("take photos less 5");
    }
  };

  const validationPdf = async (file, buttonId) => {
    const allowedExtensions = ["pdf"];
    const maxSizeInBytes = 10 * 1024 * 1024;
    file = file[0];

    const fileExtension = file.name.split(".").pop().toLowerCase();
    if (!allowedExtensions.includes(fileExtension)) {
      toast.warning("Invalid file type. Please upload a PDF file.");
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
      case 5:
        validationPresentation(file, buttonId);
      default:
        break;
    }
  };

  const uploadFile = (file, buttonId) => {
    const formData = new FormData();
    for (let i = 0; i < file.length; i++) {
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
      case 5:
        setFilesPresentation(file);
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
  const handleFileInputClickPresentation = () => {
    fileInputRefPresentation.current.click();
  };

  return (
    <div className="lifestyle">
      <img
        src={require("../../assets/discovering.png")}
        alt=""
        className="children"
      />
      <h1>
        "Discovering the World of Healthy lifestyle: Our Research" Application
        form
      </h1>
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
          <h2>Research Concept:</h2>

          <span>
            the detailed description of the idea and the  theme of the Research
            associated with a healthy lifestyle (healthy eating, physical
            activity, following a daily routine, mental and emotional health,
            etc.).
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
              {/* {files && files.map((i)=>{
              return  <p>{i.name}</p>
            }) } */}
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
            <li>the main questions that were set in the Research;</li>
            <li>what concerns brought to the necessity of the Research;</li>
            <li>relevance of the idea (problem or concern);</li>
            <li>practical significance;</li>
            <li>
              what methods and tools were used to conduct the Research:
              description of unique and creative methods, explanation of the
              Research methodology, including data collection methods, modern
              tools that were used;
            </li>
            <li>
              what conclusions were made in the result of the Research:
              description of the essential insights gained from the research and
              explanation how the Research findings can be practically applied
              in daily life to make it healthier.
            </li>
          </ul>
          <span>
            Please, mention the teacher who mentored you in your work.
          </span>
        </div>
      </div>

      <div className="game">
        <div className="concept">
          <h2>Presentation describing the research process.</h2>
        </div>

        <div className="upload">
          <div className="upload-concept">
            <div>
              <input
                type="file"
                onChange={(e) => handleFileChange(e, 5)}
                name={"file"}
                hidden
                ref={fileInputRefPresentation}
              />
              <img
                src={require("../../assets/upload.png")}
                alt="Upload"
                title="Upload"
              />
              <p>{[0].name}</p>
              {filesPresentation &&
                [filesPresentation].map((i, index) => {
                  return <p>{i[index] === undefined ? "" : i[index].name}</p>;
                })}
            </div>

            <div>
              <h4>
                Select a file or drag and drop here
                <p>
                  Upload a document in MS word, .pdf  or .ppt formats (maximum
                  15 pages)
                </p>
              </h4>
            </div>
          </div>

          <div>
            <button
              className="select"
              onClick={handleFileInputClickPresentation}
            >
              Select file
            </button>
          </div>
        </div>

        <div className="info">
          <span> Presentation should include the following sections:</span>

          <ul>
            <li>information analysis and literature review;</li>
            <li> experiments of interviews;</li>
            <li> data analysis;</li>
            <li>conclusions and findings</li>
          </ul>
        </div>
      </div>

      <div className="photos">
        <div className="concept">
          <h2> Photos</h2>
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
                <p>
                  UUpload photos/scans of the research process in JPG format
                  (not more than 5 pcs.)
                </p>
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
          <span>The leaflet should reflect:</span>

          <ul>
            <li>
              clear objectives and goals of the research, emphasizing how it
              promotes and encourages a healthy lifestyle.
            </li>
            <li>
              a brief overview of the methodology used in the research,
              including how data was collected and analyzed.
            </li>
            <li>
              the significant results and findings of the research in a clear
              and concise manner.
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
            <li>tell about the background;</li>
            <li>reveal the main questions of the Research,</li>
            <li>reveal the main questions of the Research,</li>
            <li>show the process of conducting the Research;</li>
            <li>some of the methods used;</li>
            <li>the process of conducting the results;</li>
            <li>the main conclusion.</li>
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