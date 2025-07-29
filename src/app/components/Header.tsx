import React from 'react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { RefreshCw, ExternalLink, ChevronLeft, GitBranch, Crown, Upload, Home } from 'lucide-react';
import Link from 'next/link';
const Header = () => {
  return (
    <header className="w-full px-4 py-2 border-b bg-muted flex items-center justify-between">
      {/* Left controls */}
      <div className="flex items-center space-x-2">
        <Button variant="ghost" size="icon">
            <Link href="/"><Home className="h-4 w-4" /></Link>
          
        </Button>
        <Button variant="ghost" size="icon">
          <ExternalLink className="h-4 w-4" />
        </Button>

        {/* Path / Current File */}
        <div className="ml-4 px-3 py-1 border rounded-md text-sm text-muted-foreground flex items-center space-x-2">
          <div className="w-4 h-4 border rounded-sm bg-muted-foreground" />
          <span>/</span>
        </div>
      </div>

      {/* Right controls */}
      <div className="flex items-center space-x-2">
        {/* Avatar + Invite */}
        <div className="flex items-center space-x-2 px-2 py-1 bg-muted rounded-full">
          <Avatar className="w-6 h-6">
            <AvatarFallback className="text-xs">A</AvatarFallback>
          </Avatar>
          <span className="text-sm font-medium">Invite</span>
        </div>

        {/* Back */}
        <Button variant="ghost" size="icon">
          <ChevronLeft className="h-4 w-4" />
        </Button>

        {/* Lightning bolt (status) */}
        <Button variant="ghost" size="icon">
          <GitBranch className="h-4 w-4 rotate-90" />
        </Button>

        {/* GitHub icon */}
        <Button variant="ghost" size="icon">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M12 0C5.372 0 0 5.373 0 12c0 5.303 3.438 9.8 8.205 11.387.6.11.82-.258.82-.577 0-.285-.01-1.04-.016-2.04-3.338.726-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.757-1.333-1.757-1.09-.745.084-.73.084-.73 1.205.084 1.84 1.237 1.84 1.237 1.07 1.835 2.81 1.305 3.495.998.107-.775.42-1.305.763-1.605-2.665-.3-5.467-1.332-5.467-5.93 0-1.31.468-2.38 1.236-3.22-.124-.303-.535-1.523.117-3.176 0 0 1.008-.322 3.3 1.23a11.5 11.5 0 0 1 3.003-.404c1.02.004 2.048.138 3.003.404 2.29-1.552 3.296-1.23 3.296-1.23.654 1.653.243 2.873.12 3.176.77.84 1.234 1.91 1.234 3.22 0 4.61-2.807 5.628-5.48 5.922.43.37.815 1.102.815 2.222 0 1.604-.014 2.897-.014 3.29 0 .322.216.694.825.576C20.565 21.796 24 17.298 24 12c0-6.627-5.373-12-12-12z" />
          </svg>
        </Button>

        {/* Upgrade */}
        <Button variant="outline" className="text-xs px-3">
          <Crown className="w-3 h-3 mr-1" /> Upgrade
        </Button>

        {/* Publish */}
        <Button className="text-xs px-4">
          <Upload className="w-3 h-3 mr-1" /> Publish
        </Button>
      </div>
    </header>
  );
};

export default Header;
