import { useState, useEffect } from "react";
import ClipGrid from "./ClipGrid";
import ClipViewer from "./ClipViewer";

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
    <>
      {!!viewingClipPath && (
        <ClipViewer onBack={handleBackViewer} clipFilePath={viewingClipPath} />
      )}
      <ClipGrid
        handleClickClip={handleClipClick}
        isVisible={!viewingClipPath}
      />
    </>
  );
}

export default App;
