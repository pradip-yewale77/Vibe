interface ProjectFile {
  id: string;
  name: string;
  type: 'file';
  language: 'html' | 'css' | 'js' | 'tsx' | 'json';
  content: string;
}

interface ProjectFolder {
  id: string;
  name: string;
  type: 'folder';
  children: (ProjectFile | ProjectFolder)[];
}

export type ProjectStructure = (ProjectFile | ProjectFolder)[];