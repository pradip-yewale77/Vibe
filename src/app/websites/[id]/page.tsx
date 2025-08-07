

// app/websites/[id]/page.tsx
"use client";

import { notFound } from 'next/navigation';
import React, { useState, useRef, useEffect } from 'react';
import Editor from '@monaco-editor/react'
import axios from 'axios';
// import PreviewPane from '@/app/components/PreviewPane';


// Define types
type FileItem = {
  name: string;
  type: 'file';
  content: string;
  language?: string;
};

type FolderItem = {
  name: string;
  type: 'folder';
  children: Array<FileItem | FolderItem>;
  isOpen: boolean;
};

type FileStructureItem = FileItem | FolderItem;

// Initialize file structure with content and open states
const initialFileStructure: FileStructureItem[] = [
  {
    name: 'frontend',
    type: 'folder',
    isOpen: true,
    children: [
      {
        name: 'index.html',
        type: 'file',
        content: `<!DOCTYPE html>
<html lang="en" class="dark">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Dark Mode Editor</title>
  <link rel="stylesheet" href="css/style.css">
</head>
<body class="bg-gray-900 text-gray-100">
  <div class="container mx-auto p-6">
    <h1 class="text-3xl font-bold text-blue-400 mb-4">Dark Mode Editor</h1>
    <p class="text-gray-400">Create amazing websites with this dark theme editor</p>
  </div>
</body>
</html>`,
        language: 'html'
      },
      {
        name: 'contact.html',
        type: 'file',
        content: '<h1 class="text-2xl font-bold text-blue-400">Contact Page</h1>\n<p class="text-gray-400">Email: contact@example.com</p>',
        language: 'html'
      },
      {
        name: 'css',
        type: 'folder',
        isOpen: false,
        children: [
          {
            name: 'style.css',
            type: 'file',
            content: `:root {
  --primary: #6366f1;
  --secondary: #8b5cf6;
}

body {
  font-family: 'Inter', sans-serif;
  background-color: #0f172a;
  color: #e2e8f0;
  margin: 0;
  padding: 0;
}

header {
  background: linear-gradient(135deg, var(--primary), var(--secondary));
  color: white;
  padding: 2rem 0;
  text-align: center;
}`,
            language: 'css'
          }
        ]
      },
      {
        name: 'js',
        type: 'folder',
        isOpen: false,
        children: [
          {
            name: 'main.js',
            type: 'file',
            content: `console.log('Dark mode editor initialized');

document.addEventListener('DOMContentLoaded', () => {
  // Add interactive functionality here
  const header = document.querySelector('header');
  header.addEventListener('click', () => {
    alert('Welcome to the dark theme editor!');
  });
});`,
            language: 'javascript'
          }
        ]
      }
    ]
  },
  {
    name: 'backend',
    type: 'folder',
    isOpen: false,
    children: [
      {
        name: 'server.js',
        type: 'file',
        content: `const express = require('express');
const app = express();
const port = 3000;

app.use(express.static('public'));

app.get('/', (req, res) => {
  res.send('Dark mode editor backend running');
});

app.listen(port, () => {
  console.log(\`Server running at http://localhost:\${port}\`);
});`,
        language: 'javascript'
      }
    ]
  },
  {
    name: 'README.md',
    type: 'file',
    content: `# Dark Mode Editor Project\n\nThis is a website project built with the dark mode editor.`,
    language: 'markdown'
  }
];

import type { PageProps } from '../../../../.next/types/app/websites/[id]/page';

export default async function WebsitePage({ params }: PageProps) {
  const { id } = params ? await params : {};
  const [fileStructure, setFileStructure] = useState<FileStructureItem[]>(initialFileStructure);
  const [openTabs, setOpenTabs] = useState<FileItem[]>([]);
  const [activeTab, setActiveTab] = useState<string | null>(null);
  const [fileContent, setFileContent] = useState<Record<string, string>>({});
  const [isChatOpen, setIsChatOpen] = useState(true);
  const [messages, setMessages] = useState([
    { id: 1, text: "Welcome to the dark mode editor! How can I help with your project?", sender: "bot" }
  ]);
  const [newMessage, setNewMessage] = useState("");
  const [newItemType, setNewItemType] = useState<'file' | 'folder' | null>(null);
  const [newItemPath, setNewItemPath] = useState<string[]>([]);
  const [newItemName, setNewItemName] = useState("");
  const [isCreating, setIsCreating] = useState(false);
  const newItemInputRef = useRef<HTMLInputElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  if (!id) {
    notFound();
  }

  // Focus on input when creating new item
  useEffect(() => {
    if (isCreating && newItemInputRef.current) {
      newItemInputRef.current.focus();
    }
  }, [isCreating]);

  // Scroll to bottom of chat when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);


  useEffect(() => {
    const handleGenerateCodeFromApi = async () => {
      try {
        const response = await axios.get("http://localhost:5000/test-response_one");
        
        // Handle the backend response structure
        const data = JSON.parse(response.data);
        const convertedStructure = convertApiResponseToFileStructure(data);

        // Open the root folder by default
        const updatedStructure = convertedStructure.map(item =>
          item.type === 'folder' ? { ...item, isOpen: true } : item
        );

        setFileStructure(updatedStructure);
      } catch (error) {
        console.error("Error fetching API data:", error);
      }
    };

    handleGenerateCodeFromApi();
  }, []);

  // Toggle folder open/closed state
  const toggleFolder = (path: string[]) => {
    const updateStructure = (items: FileStructureItem[], currentPath: string[]): FileStructureItem[] => {
      return items.map(item => {
        if (item.type === 'folder' && item.name === currentPath[0]) {
          if (currentPath.length === 1) {
            return { ...item, isOpen: !item.isOpen };
          } else {
            return {
              ...item,
              children: updateStructure(item.children, currentPath.slice(1))
            };
          }
        }
        return item;
      });
    };

    setFileStructure(prev => updateStructure(prev, path));
  };

  // ...existing code...
  const convertApiResponseToFileStructure = (apiResponse: unknown): FileStructureItem[] => {
    // The API response is an array containing a single root folder object
    if (!Array.isArray(apiResponse)) {
      console.error("Invalid API response format. Expected an array.");
      return initialFileStructure; // Return default structure on error
    }

    // Helper to get language from filename
    const getLanguage = (filename: string): string | undefined => {
      const extension = filename.split('.').pop()?.toLowerCase();
      switch (extension) {
        case 'html': return 'html';
        case 'css': return 'css';
        case 'js': return 'javascript';
        case 'jsx': return 'javascript';
        case 'json': return 'json';
        case 'md': return 'markdown';
        case 'svg': return 'svg';
        case 'cjs': return 'javascript';
        default: return undefined;
      }
    };

    // Recursive function to convert backend items to frontend structure
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const convertItem = (item: any): FileStructureItem => {
      if (item.type === 'folder') {
        return {
          name: item.name,
          type: 'folder',
          isOpen: item.isOpen || false,
          children: item.children ? item.children.map(convertItem) : []
        };
      } else {
        return {
          name: item.name,
          type: 'file',
          content: item.content || '',
          language: item.language || getLanguage(item.name)
        };
      }
    };

    // Convert the root folder and its children
    try {
      const rootItems = apiResponse.map(convertItem);
      return rootItems;
    } catch (error) {
      console.error("Error converting API response:", error);
      return initialFileStructure; // Fallback to default structure
    }
  };

  // Open a file in a new tab
  const openFile = (file: FileItem) => {
    setFileContent(prev => ({
      ...prev,
      [file.name]: file.content
    }));

    if (!openTabs.some(tab => tab.name === file.name)) {
      setOpenTabs(prev => [...prev, file]);
    }
    setActiveTab(file.name);
  };

  // Close a tab
  const closeTab = (fileName: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const newTabs = openTabs.filter(tab => tab.name !== fileName);
    setOpenTabs(newTabs);

    if (activeTab === fileName) {
      setActiveTab(newTabs.length > 0 ? newTabs[0].name : null);
    }
  };

  // Save file content
  const saveFile = (fileName: string) => {
    const updateContent = (items: FileStructureItem[]): FileStructureItem[] => {
      return items.map(item => {
        if (item.type === 'file' && item.name === fileName) {
          return { ...item, content: fileContent[fileName] || item.content };
        } else if (item.type === 'folder') {
          return { ...item, children: updateContent(item.children) };
        }
        return item;
      });
    };

    setFileStructure(prev => updateContent(prev));
  };

  function getLanguageFromFileName(filename: string): string {
    const extension = filename.split('.').pop()?.toLowerCase() || '';
    switch (extension) {
      case 'js': return 'javascript';
      case 'jsx': return 'javascript';
      case 'ts': return 'typescript';
      case 'tsx': return 'typescript';
      case 'css': return 'css';
      case 'html': return 'html';
      case 'json': return 'json';
      case 'md': return 'markdown';
      case 'svg': return 'svg';
      case 'cjs': return 'javascript';
      default: return 'plaintext';
    }
  }

  // Start creating a new file or folder
  const startCreateItem = (type: 'file' | 'folder', path: string[]) => {
    setNewItemType(type);
    setNewItemPath(path);
    setNewItemName("");
    setIsCreating(true);
  };

  // Create a new file or folder
  const createNewItem = () => {
    if (!newItemName.trim()) return;

    const newItem: FileStructureItem = newItemType === 'file'
      ? {
        name: newItemName,
        type: 'file',
        content: newItemName.endsWith('.css') ? '/* New CSS file */' :
          newItemName.endsWith('.js') ? '// New JavaScript file' :
            newItemName.endsWith('.html') ? '<!DOCTYPE html>\n<html>\n<head>\n<title>New Page</title>\n</head>\n<body>\n</body>\n</html>' :
              newItemName.endsWith('.md') ? '# New Markdown File' :
                '// New file',
        language: newItemName.split('.').pop()
      }
      : {
        name: newItemName,
        type: 'folder',
        isOpen: false,
        children: []
      };

    const updateStructure = (items: FileStructureItem[], currentPath: string[]): FileStructureItem[] => {
      if (currentPath.length === 0) {
        return [...items, newItem];
      }

      return items.map(item => {
        if (item.type === 'folder' && item.name === currentPath[0]) {
          return {
            ...item,
            children: updateStructure(item.children, currentPath.slice(1))
          };
        }
        return item;
      });
    };

    setFileStructure(prev => updateStructure(prev, newItemPath));
    setIsCreating(false);

    // If it's a folder, open the parent folder
    if (newItemPath.length > 0) {
      toggleFolder([...newItemPath.slice(0, -1), newItemPath[newItemPath.length - 1]]);
    }
  };

  // Cancel creating new item
  const cancelCreateItem = () => {
    setIsCreating(false);
    setNewItemType(null);
  };

  // Send chat message
  const sendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim() === "") return;

    // Add user message
    const userMessage = {
      id: messages.length + 1,
      text: newMessage,
      sender: "user"
    };
    setMessages([...messages, userMessage]);
    setNewMessage("");

    // Simulate bot response after delay
    setTimeout(() => {
      const botResponses = [
        "I understand. What specifically do you need help with?",
        "That's an interesting question. Let me think how to best help you.",
        "Thanks for sharing. What's the main challenge you're facing?",
        "I can help with that. Could you provide more details?",
        "Great question! Here's what I suggest: ..."
      ];
      const botMessage = {
        id: messages.length + 2,
        text: botResponses[Math.floor(Math.random() * botResponses.length)],
        sender: "bot"
      };
      setMessages(prev => [...prev, botMessage]);
    }, 1000);
  };

  // Render file tree recursively
  const renderFileTree = (items: FileStructureItem[], path: string[] = []) => {
    return items.map((item, index) => {
      const currentPath = [...path, item.name];

      if (item.type === 'folder') {
        return (
          <div key={index} className="mb-1">
            <div
              className="flex items-center py-1.5 px-2 rounded hover:bg-gray-800 cursor-pointer select-none group"
              onClick={() => toggleFolder(currentPath)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={`h-4 w-4 mr-1 transition-transform duration-200 ${item.isOpen ? 'rotate-90 text-yellow-500' : 'text-gray-500'}`}
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>

              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 mr-2 text-yellow-500"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M2 6a2 2 0 012-2h5l2 2h5a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" />
              </svg>

              <span className="text-sm font-medium text-gray-200">{item.name}</span>

              <div className="ml-auto flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    startCreateItem('file', currentPath);
                  }}
                  className="text-gray-400 hover:text-blue-400 p-1 rounded hover:bg-gray-700"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    startCreateItem('folder', currentPath);
                  }}
                  className="text-gray-400 hover:text-blue-400 p-1 rounded hover:bg-gray-700"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </button>
              </div>
            </div>

            {item.isOpen && item.children && (
              <div className="ml-5 border-l border-gray-700 pl-2">
                {isCreating && newItemPath.join('/') === currentPath.join('/') && (
                  <div className="flex items-center py-1.5 px-2 mb-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className={`h-4 w-4 mr-2 ${newItemType === 'folder' ? 'text-yellow-500' : 'text-blue-500'}`}
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      {newItemType === 'folder' ? (
                        <path d="M2 6a2 2 0 012-2h5l2 2h5a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" />
                      ) : (
                        <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clipRule="evenodd" />
                      )}
                    </svg>
                    <input
                      ref={newItemInputRef}
                      type="text"
                      value={newItemName}
                      onChange={(e) => setNewItemName(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') createNewItem();
                        if (e.key === 'Escape') cancelCreateItem();
                      }}
                      placeholder={`New ${newItemType} name...`}
                      className="flex-1 bg-gray-800 text-white text-sm px-2 py-1 rounded border border-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                    <button
                      onClick={createNewItem}
                      className="ml-2 p-1 text-green-500 hover:text-green-400"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </button>
                    <button
                      onClick={cancelCreateItem}
                      className="ml-1 p-1 text-red-500 hover:text-red-400"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </div>
                )}
                {renderFileTree(item.children, currentPath)}
              </div>
            )}
          </div>
        );
      } else {
        return (
          <div
            key={index}
            className="flex items-center py-1.5 px-2 rounded hover:bg-gray-800 cursor-pointer text-sm"
            onClick={() => openFile(item)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 mr-2 text-blue-500"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clipRule="evenodd" />
            </svg>
            <span className="text-gray-200 truncate">{item.name}</span>
          </div>
        );
      }
    });
  };

  return (
    <div className="bg-gray-900 min-h-screen">
      {/* Chatbox Toggle Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={() => setIsChatOpen(!isChatOpen)}
          className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white p-3 rounded-full shadow-lg hover:opacity-90 transition-opacity flex items-center justify-center"
        >
          {isChatOpen ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
            </svg>
          )}
        </button>
      </div>

      {/* Chatbox */}
      {isChatOpen && (
        <div className="fixed bottom-24 right-6 w-96 h-[28rem] bg-gray-800 rounded-xl shadow-2xl z-50 flex flex-col border border-gray-700 overflow-hidden">
          <div className="bg-gradient-to-r from-blue-800 to-indigo-900 p-3 rounded-t-xl flex items-center justify-between">
            <div className="flex items-center">
              <div className="relative mr-2">
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-gray-900 z-10"></div>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-blue-100">Project Assistant</h3>
                <p className="text-xs text-blue-300 opacity-80">Online • Responding instantly</p>
              </div>
            </div>
            <div className="flex space-x-2">
              <button className="text-blue-200 hover:text-white p-1 rounded hover:bg-blue-700/30 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <button
                onClick={() => setIsChatOpen(false)}
                className="text-blue-200 hover:text-white p-1 rounded hover:bg-blue-700/30 transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          <div className="flex-1 p-3 overflow-y-auto bg-gray-900">
            <div className="mb-4 text-center">
              <span className="text-xs px-2 py-1 bg-gray-800 text-gray-400 rounded-full">
                Today, {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </span>
            </div>

            {messages.map(message => (
              <div
                key={message.id}
                className={`mb-4 ${message.sender === "user" ? "text-right" : ""}`}
              >
                <div className="flex items-start">
                  {/* Bot avatar */}
                  {message.sender === "bot" && (
                    <div className="flex-shrink-0 w-8 h-8 rounded-md bg-gradient-to-br from-indigo-800 to-purple-800 flex items-center justify-center mr-2">
                      <span className="text-xs font-bold text-indigo-200">AI</span>
                    </div>
                  )}

                  {/* Message bubble */}
                  <div
                    className={`${message.sender === "user"
                      ? "bg-gradient-to-r from-blue-700 to-indigo-700 text-white rounded-xl rounded-tr-none"
                      : "bg-gray-800 text-gray-200 rounded-xl rounded-tl-none"
                      } px-4 py-3 max-w-[80%]`}
                  >
                    <p className="text-sm">{message.text}</p>
                  </div>
                </div>

                {/* Timestamp */}
                <div className={`${message.sender === "user" ? "text-right" : ""} mt-1`}>
                  <span className="text-xs text-gray-500">
                    {message.sender === "bot" ? "Assistant" : "You"} •
                    {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
              </div>
            ))}

            <div ref={messagesEndRef} />
          </div>

          <form onSubmit={sendMessage} className="border-t border-gray-700 p-3 bg-gray-800">
            <div className="flex items-center space-x-2">
              <div className="flex-1 relative">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Ask about your project..."
                  className="w-full py-2.5 pl-4 pr-10 bg-gray-700 text-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 border border-gray-600 text-sm"
                />
              </div>
              <button
                type="submit"
                className="p-2.5 bg-gradient-to-r from-blue-700 to-indigo-700 text-white rounded-lg hover:opacity-90 transition-opacity"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="container mx-auto px-4 py-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-white">Dark Mode Editor</h1>
            <p className="text-gray-400">Editing: Website ID {id}</p>
          </div>
          <div className="flex items-center space-x-3">
            <button className="px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-lg hover:opacity-90 transition-opacity flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
              </svg>
              Run Project
            </button>
            <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              Save All
            </button>
          </div>
        </div>

        <div className="grid grid-cols-12 gap-5">
          {/* File Explorer Panel */}
          <div className="col-span-3 bg-gray-800 rounded-xl shadow-sm border border-gray-700 overflow-hidden">
            <div className="p-4 border-b border-gray-700 flex items-center justify-between">
              <div className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M2 6a2 2 0 012-2h4l2 2h4a2 2 0 012 2v1H8a3 3 0 00-3 3v1.5a1.5 1.5 0 01-3 0V6z" clipRule="evenodd" />
                </svg>
                <h2 className="font-semibold text-white">Project Files</h2>
              </div>
              <div className="flex space-x-1">
                <button
                  onClick={() => startCreateItem('file', [])}
                  className="text-gray-400 hover:text-blue-400 p-1 rounded hover:bg-gray-700"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </button>
                <button
                  onClick={() => startCreateItem('folder', [])}
                  className="text-gray-400 hover:text-blue-400 p-1 rounded hover:bg-gray-700"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </button>
              </div>
            </div>

            <div className="p-3 overflow-y-auto" style={{ maxHeight: 'calc(100vh - 200px)' }}>
              {isCreating && newItemPath.length === 0 && (
                <div className="flex items-center py-1.5 px-2 mb-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className={`h-4 w-4 mr-2 ${newItemType === 'folder' ? 'text-yellow-500' : 'text-blue-500'}`}
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    {newItemType === 'folder' ? (
                      <path d="M2 6a2 2 0 012-2h5l2 2h5a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" />
                    ) : (
                      <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clipRule="evenodd" />
                    )}
                  </svg>
                  <input
                    ref={newItemInputRef}
                    type="text"
                    value={newItemName}
                    onChange={(e) => setNewItemName(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') createNewItem();
                      if (e.key === 'Escape') cancelCreateItem();
                    }}
                    placeholder={`New ${newItemType} name...`}
                    className="flex-1 bg-gray-700 text-white text-sm px-2 py-1 rounded border border-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                  <button
                    onClick={createNewItem}
                    className="ml-2 p-1 text-green-500 hover:text-green-400"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </button>
                  <button
                    onClick={cancelCreateItem}
                    className="ml-1 p-1 text-red-500 hover:text-red-400"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </button>
                </div>
              )}
              {renderFileTree(fileStructure)}
            </div>
          </div>

          {/* Main Editor Area */}
          <div className="col-span-9 flex flex-col">
            {/* Tab Bar */}
            <div className="flex bg-gray-800 text-gray-300 rounded-t-lg overflow-x-auto">
              {openTabs.map(tab => (
                <div
                  key={tab.name}
                  className={`flex items-center py-2 px-4 border-r border-gray-700 cursor-pointer ${activeTab === tab.name ? 'bg-gray-700 text-white' : 'hover:bg-gray-700'
                    }`}
                  onClick={() => setActiveTab(tab.name)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 mr-2"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-sm whitespace-nowrap">{tab.name}</span>
                  <button
                    className="ml-2 text-gray-400 hover:text-white"
                    onClick={(e) => closeTab(tab.name, e)}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </button>
                </div>
              ))}
            
            </div>

            {/* Editor Content */}
            <div className="flex-1 bg-gray-900 rounded-b-lg overflow-hidden">
              {activeTab ? (
                <div className="h-full flex flex-col">
                  <div className="flex justify-between items-center px-4 py-2 bg-gray-800">
                    <div className="text-sm text-gray-400">{activeTab}</div>
                    <button
                      className="px-3 py-1 bg-gradient-to-r from-blue-600 to-indigo-700 text-white text-sm rounded hover:opacity-90 flex items-center"
                      onClick={() => saveFile(activeTab)}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M7.707 10.293a1 1 0 10-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 11.586V6h5a2 2 0 012 2v7a2 2 0 01-2 2H4a2 2 0 01-2-2V8a2 2 0 012-2h5v5.586l-1.293-1.293zM9 4a1 1 0 012 0v2H9V4z" />
                      </svg>
                      Save
                    </button>
                  </div>
                  <Editor
                    height="100%"
                    language={getLanguageFromFileName(activeTab)}
                    value={fileContent[activeTab] || ''}
                    theme="vs-dark"
                    onChange={(value) =>
                      setFileContent(prev => ({
                        ...prev,
                        [activeTab]: value || ''
                      }))
                    }
                  />
                </div>
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-gray-500">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mb-4 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <p className="text-lg text-gray-400">No file open</p>
                  <p className="mt-2 text-sm text-gray-600 max-w-md text-center">
                    Select a file from the project explorer to start editing.
                    JavaScript, HTML, and CSS files will be executable when you run the project.
                  </p>
                </div>
              )}
            </div>

            {/* Status Bar */}
            <div className="mt-3 flex items-center justify-between text-xs text-gray-500 bg-gray-800 px-4 py-2 rounded-lg">
              <div className="flex items-center">
                <div className="h-2 w-2 rounded-full bg-green-500 mr-2"></div>
                <span>Connected</span>
              </div>
              <div>
                {activeTab ? `Editing: ${activeTab}` : 'Ready'}
              </div>
              <div>
                Website ID: {id}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}