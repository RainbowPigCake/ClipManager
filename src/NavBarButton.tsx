import { Button } from './components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

export default function NavBarButton({
  icon,
  tooltipText = '',
  onClick = () => {},
}) {
  return tooltipText ? (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            className="mx-6 mt-6 h-16 w-16"
            size={'icon'}
            onClick={onClick}
          >
            {icon}
          </Button>
        </TooltipTrigger>
        <TooltipContent className="bg-card">
          <p>{tooltipText}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  ) : (
    <Button className="mx-6 mt-6 h-16 w-16" size={'icon'}>
      {icon}
    </Button>
  );
}
