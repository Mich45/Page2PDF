import Head from 'next/head'
import Image from 'next/image'
import React, { useEffect, useState } from "react";

export default function Home() {
  const [inputValue, setInputValue] = useState("");
  const [pdfLink, setPdfLink] = useState("");
  const [submit, isSubmitting] = useState(false);
  const [generate, setGenerate] = useState(false);

  const validator = (input) => {
    var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
    '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
    '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
    '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
  
  // Test the input string against the pattern
  return pattern.test(input);
  }

  useEffect(() => {
    const clearSpinner = () => {
      if (pdfLink) {
        isSubmitting(false);
      } 
    }
    clearSpinner();
  }, [pdfLink] )

  const handleSubmit = async (e) => {
    isSubmitting(true);
    e.preventDefault();

    const res = await fetch("/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ inputValue }),
    });
    const blob = await res.blob();
    
    const url = URL.createObjectURL(blob);

    setPdfLink(url);
    setInputValue("");
  };

  const handleDownload = () => {
    const downloadLink = document.createElement("a");
    downloadLink.href = pdfLink;
    downloadLink.download = "page.pdf";
    downloadLink.click();
  };

  return (
    <>
    <div className="flex flex-col items-center h-screen bg-[#212129]">
        <div className='flex flex-col items-center justify-center'><h1 className="text-4xl py-10 bg-clip-text bg-gradient-to-r from-green-400 to-blue-500 text-transparent md:text-8xl">Page2PDF</h1>
        <p className="text-gray-400">Convert any webpage to PDF in seconds. ⚡</p>
        </div>
    <div className="justify-center flex mt-[100px] items-center">
      <form onSubmit={handleSubmit} className="flex mr-3 flex-col md:flex-row">
        <input
          type="text"
          className="p-2 rounded-md outline-none border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          placeholder="Enter a URL here"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        {
              submit ? <Spinner/> : <button
              type="submit"
              className="bg-blue-500 mt-3 hover:bg-blue-600 text-white font-bold py-2 md:ml-3 px-4 rounded"
            >
              Submit
            </button>
          
        }
      </form>
    </div>
      <div className='my-10'>
      {pdfLink && (
        <button
          className="mt-4 bg-green-500 hover:bg-green-600 px-4 py-2 text-white rounded-md"
          onClick={handleDownload}
        >
          Download PDF
        </button>
      )}
      </div>
    </div>
    </>
  );
}

const Spinner = () => {
  return (
    <div className="flex justify-center items-center ml-3 mt-3 ">
<div className="w-8 h-8 rounded-full animate-spin border-4 border-solid border-green-600 border-t-transparent"></div>
    </div>
  );
}