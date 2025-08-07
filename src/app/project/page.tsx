'use client';

import React, { useEffect, useState } from 'react';
import Editor from './components/Editor';
import Sidebar from './components/Sidebar';
import Header from '../components/Header';
import axios from 'axios';
const Page = () => {
  const [files, /* setFiles */] = useState([
    { name: 'index.html', content: '<h1>Hello</h1>' },
    { name: 'styles.css', content: 'body { background: black; }' },
    { name: 'script.js', content: 'console.log("Hello");' },
  ]);

  useEffect(() => {
    const fetchData = async () =>{
      const response = await axios.get("http://localhost:3001")
      console.log(`response`, response.data);
    }
    fetchData();
  },[]);

  const [activeFile, setActiveFile] = useState(files[0]);

  return (
    <>
      <Header />
      <div className="grid grid-cols-12 h-screen overflow-hidden">
        {/* Sidebar Section */}
        <div className="col-span-3 border-r flex flex-col">
          <Sidebar
            files={files}
            activeFile={activeFile}
            setActiveFile={setActiveFile}
          />
        </div>

        {/* Editor Section */}
        <div className="col-span-9">
          <Editor file={activeFile} />
        </div>
      </div>
    </>
  );
};

export default Page;
