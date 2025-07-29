'use client';

import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import CodeMirror from '@uiw/react-codemirror';
import { html } from '@codemirror/lang-html';
import { css } from '@codemirror/lang-css';
import { javascript } from '@codemirror/lang-javascript';
import { Extension } from '@codemirror/state';
import Link from 'next/link';
import axios from 'axios';
import Loader from '@/components/Loader';

type FileKey = 'index.html' | 'style.css' | 'index.js';

interface FileContent {
  code: string;
  language: Extension;
}

const BACKEND_URI = 'http://localhost:5000';

const defaultFiles: Record<FileKey, FileContent> = {
  'index.html': { language: html(), code: '' },
  'style.css': { language: css(), code: '' },
  'index.js': { language: javascript(), code: '' },
};

const Page: React.FC = () => {
  const [activeTab, setActiveTab] = useState<FileKey>('index.html');
  const [fileData, setFileData] = useState<Record<FileKey, FileContent>>(defaultFiles);
  const [loading, setLoading] = useState<boolean>(false);
  const [rawResponse, setRawResponse] = useState<string>('');
  const [prompt, setPrompt] = useState<string>('');

  useEffect(() => {
    const userPrompt = localStorage.getItem('prompt');
    console.log(`prompt is ${userPrompt}`);

    if (userPrompt) {
      setPrompt(userPrompt);
    } else {
      setPrompt('Create a portfolio website using HTML, CSS, and JavaScript');
    }
  }, []);

  const handlewebsiteGeneration = async () => {
    setLoading(true);
    setRawResponse('Generating your website...');

    try {
      const savedPrompt =
        localStorage.getItem('prompt') ||
        'Create a portfolio website using HTML, CSS, and JavaScript';

      const response = await axios.post(`${BACKEND_URI}/generate-code`, {
        prompt: savedPrompt,
      });

      const data = response.data;

      console.log('Backend Response:', data);

      const updatedFiles: Record<FileKey, FileContent> = {
        'index.html': {
          language: html(),
          code: data['index.html'] || '',
        },
        'style.css': {
          language: css(),
          code: data['style.css'] || '',
        },
        'index.js': {
          language: javascript(),
          code: data['index.js'] || '',
        },
      };

      setFileData(updatedFiles);

      setRawResponse(
        `HTML:\n${data['index.html']}\n\nCSS:\n${data['style.css']}\n\nJS:\n${data['index.js']}`
      );
    } catch (err) {
      console.error('Failed to generate website:', err);
      setRawResponse('⚠️ Error fetching generated code.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <Loader />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <Header />
      <div className="container mx-auto md:grid grid-cols-12 gap-2 py-4">
        <div className="col-span-3 w-full">
          <Link href="/test" className="text-blue-400 underline block mb-4">
            Preview
          </Link>
          <div className="w-full text-sm font-medium bg-gray-900 border border-gray-700 rounded-md">
            {Object.keys(fileData).map((file) => (
              <button
                key={file}
                onClick={() => setActiveTab(file as FileKey)}
                className={`block w-full px-4 py-2 border-b border-gray-700 text-left ${
                  activeTab === file ? 'bg-gray-800 text-white' : 'hover:bg-gray-700'
                } focus:outline-none focus:ring-2 focus:ring-blue-500`}
              >
                {file}
              </button>
            ))}
          </div>
        </div>

        <div className="col-span-9">
          <div className="p-2 bg-gray-900 border border-gray-700 rounded-lg mb-4">
            <h2 className="text-lg font-bold text-white mb-2">🤖 AI Response</h2>
            <pre className="text-sm text-green-300 whitespace-pre-wrap">{rawResponse}</pre>
          </div>

          <div className="p-2 bg-gray-900 border border-gray-700 rounded-lg">
            <CodeMirror
              value={fileData[activeTab].code}
              height="400px"
              theme="dark"
              extensions={[fileData[activeTab].language]}
              readOnly={false}
              basicSetup={{
                lineNumbers: true,
                foldGutter: true,
                highlightActiveLine: true,
              }}
            />
          </div>
          <div className="flex justify-center items-center py-4">
            <button
              onClick={handlewebsiteGeneration}
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded"
            >
              🚀 Generate Website
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
