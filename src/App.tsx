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
    setScrollPosition(window.scrollY);
    setViewingClipPath(clipName);
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
  }, [viewingClipPath, isViewingSettingsPage, scrollPosition]);

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className="flex flex-row bg-background text-foreground min-h-screen">
        <div className="fixed z-50">
          <NavBar key={`${viewingClipPath}+${isViewingSettingsPage}`} context={{ "viewing": viewingClipPath, "settings": isViewingSettingsPage }} funcs={{ "back": handleBackViewer, "settings": handleSettingsPage }} />
        </div>

        <div className="flex-grow ml-24 relative">
          <ClipGrid
            handleClickClip={handleClipClick}
            isVisible={!viewingClipPath && !isViewingSettingsPage}
          />

          {isViewingSettingsPage && (
            <div className="fixed inset-0 z-40 ml-32 bg-background">
              <Settings />
            </div>
          )}

          {viewingClipPath && (
            <div className="fixed inset-0 z-30 ml-32">
              <ClipViewer clipFilePath={viewingClipPath} />
            </div>
          )}
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;
