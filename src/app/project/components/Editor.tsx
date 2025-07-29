import React from 'react';
import { Textarea } from '@/components/ui/textarea'; // Shadcn UI textarea (optional)

interface File {
  name: string;
  content: string;
}

interface EditorProps {
  file: File;
}

const Editor: React.FC<EditorProps> = ({ file }) => {
  return (
    <div className="p-4 h-full">
      <h2 className="text-lg font-semibold mb-2">{file.name}</h2>
      <Textarea
        value={file.content}
        className="w-full h-[80vh] font-mono text-sm"
        readOnly
      />
    </div>
  );
};

export default Editor;
