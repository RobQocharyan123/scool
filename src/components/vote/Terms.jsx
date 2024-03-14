import "../vote/Vote.css";
import React, { useState, useContext } from "react";
import { IoMdClose } from "react-icons/io";
import { UserContext } from "../../UserContext";

export const Terms = () => {
  const { userState, userActions } = useContext(UserContext);

  return (
    <>
      {userState.modal && (
        <div className="modal">
          <div className="overlay" onClick={userActions.toggleModal}></div>

          <div className="modal-content">
            <h2>
              I agree to allow the use of all the uploaded information by
              stating the following:
            </h2>
            <p>
                Within the framework of the "Ambassador of a healthy lifestyle"
              competition organized by RA Ministry of Health, RA Ministry of
              Education, Science, Culture and Sports, UN World Food Program
              (WFP), Social and Industrial Foodservice Institute (SIFI), "School
              Feeding and Children's Welfare" Agency, I confirm that I grant the
              above-mentioned organizations permission to process personal data,
              use text materials and images without territorial and time limits,
              for any purposes that do not contradict the current legislation of
              the Republic of Armenia.  
            </p>
            <p>
              I waive the right to correct text materials, videos/photos or
              interfere with the author's right to publish his/her text
              materials, videos/photos. I allow the editing of text material,
              video/photo processing, retouching, darkening in compositions,
              both intentional and unintentional, during the preparation of the
              final version of the textual material or video for publication. I
              confirm that I will not dispute the copyright and property rights
              of these text materials, videos/photos.
            </p>

            <IoMdClose
              className="close-modal"
              onClick={userActions.toggleModal}
            />
          </div>
        </div>
      )}
    </>
  );
};
