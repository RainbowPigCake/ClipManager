import { Feather, Settings, ArrowLeft } from 'lucide-react';
import NavBarButton from './NavBarButton';

export default function NavBar({ funcs, context }: any) {
  return (
    <div className="flex flex-col">
      <NavBarButton icon={<Feather className="h-8 w-8"></Feather>} />
      {(context['settings'] || context['viewing']) && <NavBarButton
        icon={<ArrowLeft className="h-8 w-8"></ArrowLeft>}
        tooltipText="Back"
        onClick={funcs['back']}
      />}
      <NavBarButton
        icon={<Settings className="h-8 w-8"></Settings>}
        tooltipText="Settings"
        onClick={funcs['settings']}
      />
    </div>
  );
}
