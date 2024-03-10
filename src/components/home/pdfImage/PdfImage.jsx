import React from 'react'
import { useState } from 'react';

import { Document } from 'react-pdf';
import { Page } from 'react-pdf';
import pdfFile from "./Robert Kocharyan.pdf";

export const PdfImage = () => {
    const[numPages,setNumPages] = useState(null);
    const[pageNumber,setPageNumber] = useState(1);


    function onDocumentSuccess({numPages}){
        setNumPages(numPages)
    }
  return (
    <div>
        {/* <Document file={pdfFile} onLoadSuccess={onDocumentSuccess}>
            <Page pageNumber={pageNumber} />
        </Document> */}
    </div>
  )
}
