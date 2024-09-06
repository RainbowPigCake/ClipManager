import { useState, useEffect } from 'react';
import ClipGrid from './ClipGrid';
import ClipViewer from './ClipViewer';
import { ThemeProvider } from '@/components/theme-provider';

function App() {
  const [viewingClipPath, setViewingClipPath] = useState(null);
  const [scrollPosition, setScrollPosition] = useState(0);

  const handleClipClick = (clipName) => {
    if (!viewingClipPath) {
      setScrollPosition(window.pageYOffset);
      setViewingClipPath(clipName);
    }
  };

  const handleBackViewer = () => {
    setViewingClipPath(null);
  };

  useEffect(() => {
    if (!viewingClipPath) {
      window.scrollTo(0, scrollPosition);
    }
  }, [viewingClipPath, scrollPosition]);

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      {!!viewingClipPath && (
        <ClipViewer onBack={handleBackViewer} clipFilePath={viewingClipPath} />
      )}
      <ClipGrid
        handleClickClip={handleClipClick}
        isVisible={!viewingClipPath}
      />
    </ThemeProvider>
  );
}

export default App;
