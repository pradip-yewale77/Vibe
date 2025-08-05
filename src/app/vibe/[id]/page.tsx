'use client'
import React, { useEffect, useState, useRef } from 'react'
import { useParams } from 'next/navigation'
import { supabase } from '@/lib/supabaseClient'
import dynamic from 'next/dynamic'
import JSZip from 'jszip'
import { saveAs } from 'file-saver'
import { CopyIcon, DownloadIcon } from 'lucide-react'
import Link from 'next/link'
import { Monaco } from '@monaco-editor/react'

// Dynamically import Monaco Editor to avoid SSR issues
const MonacoEditor = dynamic(
  () => import('@monaco-editor/react').then(mod => mod.default),
  { ssr: false, loading: () => <div className="h-full bg-gray-900 flex items-center justify-center">Loading editor...</div> }
)

interface FileData {
  id: string;
  filename: string;
  content: string;
  created_at: string;
  project_id: string;
}

const Page = () => {
  const params = useParams()
  const projectId = params.id as string
  const editorRef = useRef<Monaco>(null)
  
  const [files, setFiles] = useState<FileData[]>([])
  const [selectedHtml, setSelectedHtml] = useState<FileData | null>(null)
  const [selectedFile, setSelectedFile] = useState<FileData | null>(null)
  const [previewHtml, setPreviewHtml] = useState<string>('')
  const [viewMode, setViewMode] = useState<'preview' | 'source'>('preview')
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)
  const [isCopying, setIsCopying] = useState(false)

  useEffect(() => {
    const fetchFiles = async () => {
      if (!projectId) {
        setError('Project ID not found in URL')
        setLoading(false)
        return
      }

      setLoading(true)
      setError(null)
      
      try {
        const { data, error: fetchError } = await supabase
          .from('website_files')
          .select('*')
          .eq('project_id', projectId)
          .order('created_at', { ascending: false })

        if (fetchError) {
          throw fetchError
        }

        if (!data || data.length === 0) {
          setError('No files found for this project')
          return
        }
        
        setFiles(data)
        
        // Find the main HTML file
        const htmlFile = data.find(f => 
          f.filename.endsWith('.html') && 
          (f.filename.toLowerCase() === 'index.html' || !data.some(f2 => f2.filename.toLowerCase() === 'index.html'))
        ) || data.find(f => f.filename.endsWith('.html'))

        if (htmlFile) {
          setSelectedHtml(htmlFile)
          setSelectedFile(htmlFile)
        }
      } catch (err: unknown) {
        console.error('Error fetching files:', err)
        setError(`Error loading project: ${(err as Error).message}`)
      } finally {
        setLoading(false)
      }
    }

    fetchFiles()
  }, [projectId])

  // Combine HTML with its CSS and JS
  useEffect(() => {
    if (!selectedHtml) return

    const cssFiles = files.filter(f => f.filename.endsWith('.css'))
    const jsFiles = files.filter(f => f.filename.endsWith('.js'))

    let html = selectedHtml.content

    // Inject CSS into <head>
    const allCss = cssFiles.map(f => `<style>${f.content}</style>`).join('\n')
    html = html.replace('</head>', `${allCss}</head>`)

    // Inject JS before </body>
    const allJs = jsFiles.map(f => `<script>${f.content}</script>`).join('\n')
    html = html.replace('</body>', `${allJs}</body>`)

    setPreviewHtml(html)
  }, [selectedHtml, files])

  const handleEditorDidMount = (editor: Monaco) => {
    editorRef.current = editor
  }

  const copyToClipboard = async () => {
    if (!editorRef.current) return
    
    try {
      setIsCopying(true)
      const content = editorRef.current.getValue()
      await navigator.clipboard.writeText(content)
      setTimeout(() => setIsCopying(false), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  const exportAsZip = () => {
    const zip = new JSZip()
    
    // Add all files to ZIP
    files.forEach(file => {
      zip.file(file.filename, file.content)
    })
    
    // Generate and download ZIP
    zip.generateAsync({ type: 'blob' })
      .then(content => {
        saveAs(content, `codeseed-${projectId}.zip`)
      })
      .catch(err => {
        console.error('Error generating ZIP:', err)
      })
  }

  const getLanguage = (filename: string) => {
    if (filename.endsWith('.html')) return 'html'
    if (filename.endsWith('.css')) return 'css'
    if (filename.endsWith('.js')) return 'javascript'
    return 'plaintext'
  }

  if (error) {
    return (
      <div className="bg-black text-gray-300 min-h-screen flex flex-col items-center justify-center p-4">
        <div className="bg-gray-900 rounded-xl p-8 max-w-md text-center">
          <div className="text-red-500 mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">Project Not Found</h2>
          <p className="text-gray-400 mb-6">{error}</p>
          <Link
            href="/"
            passHref
            legacyBehavior
          >
            <a
              className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-md transition-colors text-white"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd" />
              </svg>
              Go Back to Projects
            </a>
          </Link>
        </div>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="bg-black text-gray-300 min-h-screen flex flex-col items-center justify-center p-4">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500 mb-4"></div>
        <h2 className="text-xl font-semibold text-white">Loading Project Files</h2>
        <p className="text-gray-500">Please wait while we fetch your project...</p>
      </div>
    )
  }

  return (
    <div className="bg-black text-gray-300 min-h-screen p-4 grid grid-cols-1 md:grid-cols-[30%_70%] gap-4">

      {/* File List */}
      <div className="bg-gray-900 rounded-xl p-4 overflow-y-auto h-[calc(100vh-2rem)]">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-white">Project Files</h1>
            <p className="text-xs text-gray-500 truncate mt-1" title={projectId || ''}>
              Project ID: {projectId}
            </p>
          </div>
          <button
            onClick={exportAsZip}
            className="flex items-center gap-1 bg-blue-600 hover:bg-blue-700 px-3 py-1.5 rounded-md text-sm transition-colors"
          >
            <DownloadIcon size={16} />
            Export ZIP
          </button>
        </div>

        {files.length === 0 ? (
          <div className="bg-gray-800/50 border-2 border-dashed border-gray-700 rounded-xl p-8 text-center">
            <span className="text-gray-500">No files found in project</span>
          </div>
        ) : (
          <ul className="space-y-3">
            {files.map((file) => (
              <li
                key={file.id}
                className={`
                  border p-4 rounded-lg transition-all duration-200 cursor-pointer 
                  hover:bg-gray-800 hover:border-blue-500/50
                  ${selectedFile?.id === file.id
                    ? 'bg-gray-800 border-blue-500 shadow-lg'
                    : 'border-gray-700'}
                `}
                onClick={() => {
                  if (file.filename.endsWith('.html')) {
                    setSelectedHtml(file)
                  }
                  setSelectedFile(file)
                  setViewMode('source')
                }}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      {file.filename.endsWith('.html') ? (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clipRule="evenodd" />
                        </svg>
                      ) : file.filename.endsWith('.css') ? (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M5 12H19" />
                          <path d="M5 12C3 12 2 10 2 9C2 8 3 6 5 6C7 6 10 6 12 8C14 6 17 6 19 6C21 6 22 8 22 9C22 10 21 12 19 12" />
                          <path d="M19 12C21 12 22 14 22 15C22 16 21 18 19 18C17 18 14 18 12 16C10 18 7 18 5 18C3 18 2 16 2 15C2 14 3 12 5 12" />
                        </svg>
                      ) : file.filename.endsWith('.js') ? (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-amber-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M2 2v20h20V2H2zm12 16.5l-3-2-3 2V8l3 1.5 3-1.5v10.5zm-3-5.5l-3-2-3 2V3l3 2 3-2v10z" />
                        </svg>
                      ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
                        </svg>
                      )}
                      <p className="font-mono text-blue-400 truncate max-w-[70%]">{file.filename}</p>
                    </div>
                    <p className="text-xs text-gray-500 mt-2">
                      {new Date(file.created_at).toLocaleString()}
                    </p>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded ${
                    file.filename.endsWith('.html') 
                      ? 'bg-blue-900/30 text-blue-400' 
                      : file.filename.endsWith('.css')
                        ? 'bg-green-900/30 text-green-400'
                        : file.filename.endsWith('.js')
                          ? 'bg-amber-900/30 text-amber-400'
                          : 'bg-gray-700 text-gray-400'
                  }`}>
                    {file.filename.split('.').pop()?.toUpperCase()}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Preview/Source Panel */}
      <div className="bg-gray-900 rounded-xl overflow-hidden flex flex-col h-[calc(100vh-2rem)]">
        <div className="p-4 border-b border-gray-800 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-white">
            {viewMode === 'preview' ? 'Live Preview' : 'Source Code'}
          </h2>
          
          <div className="flex items-center gap-4">
            {selectedHtml && (
              <div className="flex gap-2 text-sm">
                <span className="bg-blue-900/30 text-blue-400 px-3 py-1 rounded-full">
                  {files.filter(f => f.filename.endsWith('.html')).length} HTML
                </span>
                <span className="bg-green-900/30 text-green-400 px-3 py-1 rounded-full">
                  {files.filter(f => f.filename.endsWith('.css')).length} CSS
                </span>
                <span className="bg-amber-900/30 text-amber-400 px-3 py-1 rounded-full">
                  {files.filter(f => f.filename.endsWith('.js')).length} JS
                </span>
              </div>
            )}
            
            <div className="flex items-center gap-3">
              {viewMode === 'source' && selectedFile && (
                <div className="flex gap-2">
                  <button
                    onClick={copyToClipboard}
                    className={`flex items-center gap-1 px-3 py-1.5 rounded-md text-sm transition-colors ${
                      isCopying 
                        ? 'bg-green-600 text-white' 
                        : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                    }`}
                  >
                    <CopyIcon size={16} />
                    {isCopying ? 'Copied!' : 'Copy'}
                  </button>
                  
                  <div className="relative">
                    <select
                      value={selectedFile.id}
                      onChange={(e) => {
                        const file = files.find(f => f.id === e.target.value)
                        if (file) setSelectedFile(file)
                      }}
                      className="bg-gray-800 border border-gray-700 text-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 pr-8 appearance-none"
                    >
                      {files.map(file => (
                        <option key={file.id} value={file.id}>
                          {file.filename}
                        </option>
                      ))}
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500">
                      <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                        <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                      </svg>
                    </div>
                  </div>
                </div>
              )}
              
              <div className="inline-flex rounded-md bg-gray-800 p-1" role="group">
                <button
                  onClick={() => setViewMode('preview')}
                  className={`px-4 py-2 text-sm rounded-l-md transition-colors ${
                    viewMode === 'preview'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-700 text-gray-400 hover:bg-gray-700/80'
                  }`}
                >
                  Preview
                </button>
                <button
                  onClick={() => setViewMode('source')}
                  className={`px-4 py-2 text-sm rounded-r-md transition-colors ${
                    viewMode === 'source'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-700 text-gray-400 hover:bg-gray-700/80'
                  }`}
                >
                  Source
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="flex-grow bg-black">
          {viewMode === 'preview' ? (
            selectedHtml ? (
              <iframe
                className="w-full h-full bg-white"
                sandbox="allow-scripts allow-same-origin"
                srcDoc={previewHtml}
              />
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-gray-500 border-2 border-dashed border-gray-800">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <p className="text-lg">Select an HTML file to preview</p>
                <p className="text-sm mt-2 text-gray-600">Files will appear in the left panel</p>
              </div>
            )
          ) : (
            selectedFile ? (
              <MonacoEditor
                height="100%"
                language={getLanguage(selectedFile.filename)}
                value={selectedFile.content}
                theme="vs-dark"
                options={{
                  minimap: { enabled: false },
                  fontSize: 14,
                  scrollBeyondLastLine: false,
                  automaticLayout: true,
                  readOnly: true,
                  wordWrap: 'on',
                }}
                onMount={handleEditorDidMount}
              />
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-gray-500 border-2 border-dashed border-gray-800">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <p className="text-lg">Select a file to view source code</p>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  )
}

export default Page