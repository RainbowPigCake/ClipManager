import React from 'react';
import { Feather, Settings, ArrowLeft } from 'lucide-react';
import { Button } from './components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

export default function NavBar() {
  return (
    <div className="flex flex-col">
      <Button className="mx-6 mt-6 h-16 w-16" size={'icon'}>
        <Feather className="h-8 w-8"></Feather>
      </Button>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button className="mx-6 mt-6 h-16 w-16" size={'icon'}>
              <Settings className="h-8 w-8"></Settings>
            </Button>
          </TooltipTrigger>
          <TooltipContent className="bg-card">
            <p>Settings</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button className="mx-6 mt-6 h-16 w-16" size={'icon'}>
              <ArrowLeft className="h-8 w-8"></ArrowLeft>
            </Button>
          </TooltipTrigger>
          <TooltipContent className="bg-card">
            <p>Back</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
}
