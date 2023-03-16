import Head from 'next/head'
import Image from 'next/image'
import React, { useState } from "react";

export default function Home() {
  const [inputValue, setInputValue] = useState("");
  const [pdfLink, setPdfLink] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(inputValue);

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
        <div className='flex flex-col items-center justify-center'><h1 className="text-8xl py-10 bg-clip-text bg-gradient-to-r from-green-400 to-blue-500 text-transparent">Page2PDF</h1>
        <p className="text-gray-400">Convert any webpage to PDF in seconds. ⚡</p>
        </div>
    <div className="justify-center flex mt-[100px] items-center">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          className="p-2 rounded-md outline-none border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          placeholder="Enter a URL here"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <button
          type="submit"
          className="ml-2 bg-blue-500 hover:bg-blue-600 px-4 py-2 text-white rounded-md"
        >
          Submit
        </button>
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


