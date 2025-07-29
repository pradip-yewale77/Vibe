import React from 'react';
import { FolderPlus, FilePlus } from 'lucide-react';

const Actions = ({
  onAddFile,
  onAddFolder,
  disableActions = false,
}: {
  onAddFile: () => void;
  onAddFolder: () => void;
  disableActions?: boolean;
}) => {
  return (
    <ul className="flex justify-end items-center gap-2 mb-4">
      <li
        className={`flex items-center gap-1 cursor-pointer hover:text-primary ${disableActions ? 'opacity-50 pointer-events-none' : ''}`}
        onClick={onAddFile}
      >
        <FilePlus className="w-4 h-4" />
        <span className="text-sm">New File</span>
      </li>
      <li
        className={`flex items-center gap-1 cursor-pointer hover:text-primary ${disableActions ? 'opacity-50 pointer-events-none' : ''}`}
        onClick={onAddFolder}
      >
        <FolderPlus className="w-4 h-4" />
        <span className="text-sm">New Folder</span>
      </li>
    </ul>
  );
};

export default Actions;