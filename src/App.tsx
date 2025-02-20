import { useState, useEffect } from 'react';
import ClipGrid from './ClipGrid';
import ClipViewer from './ClipViewer';
import { ThemeProvider } from '@/components/theme-provider';
import NavBar from './NavBar';
import Settings from './Settings';

function App() {
  const [viewingClipPath, setViewingClipPath] = useState(null);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [isViewingSettingsPage, setIsViewingSettingsPage] = useState(false);

  const handleClipClick = (clipName: any) => {
    if (!viewingClipPath) {
      setScrollPosition(window.scrollY);
      setViewingClipPath(clipName);
    }
  };

  const handleBackViewer = () => {
    setViewingClipPath(null);
    setIsViewingSettingsPage(false);
  };

  const handleSettingsPage = () => {
    setViewingClipPath(null);
    setIsViewingSettingsPage(true);
  }

  useEffect(() => {
    if (!viewingClipPath) {
      window.scrollTo(0, scrollPosition);
    }
  }, [viewingClipPath, scrollPosition]);

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className="flex flex-row bg-background text-foreground">
        <div className="fixed">
          <NavBar funcs={{ "back": handleBackViewer, "settings": handleSettingsPage }} />
        </div>
        {!!isViewingSettingsPage && <Settings />}
        {!!viewingClipPath && (
          <div className="ml-24">
            <ClipViewer clipFilePath={viewingClipPath} />
          </div>
        )}
        <div className="flex-grow ml-24">
          <ClipGrid
            handleClickClip={handleClipClick}
            isVisible={!viewingClipPath}
          />
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;
