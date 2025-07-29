'use client';

import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';

interface File {
    name: string;
    content: string;
}

interface SidebarProps {
    files: File[];
    activeFile: File;
    setActiveFile: React.Dispatch<React.SetStateAction<File>>;
}

const Sidebar: React.FC<SidebarProps> = ({ files, activeFile, setActiveFile }) => {
    return (
        <Card className="h-full w-full border-none rounded-none shadow-none bg-muted/30">
            <CardHeader className="pb-2">
                <CardTitle className="text-base font-semibold text-muted-foreground">
                    Files
                </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
                <ScrollArea className="h-[calc(100vh-100px)] px-2">
                    <ul className="space-y-1">
                        {files.map((file) => (
                            <li
                                key={file.name}
                                onClick={() => setActiveFile(file)}
                                className={cn(
                                    'cursor-pointer px-3 py-2 rounded-md text-sm font-medium transition-colors',
                                    file.name === activeFile.name
                                        ? 'bg-primary text-primary-foreground'
                                        : 'text-muted-foreground hover:bg-muted hover:text-primary'
                                )}

                            >
                                {file.name}
                            </li>
                        ))}
                    </ul>
                </ScrollArea>
            </CardContent>
        </Card>
    );
};

export default Sidebar;
