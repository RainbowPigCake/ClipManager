import { useState, useEffect } from "react";
import ClipGrid from "./ClipGrid";
import ClipViewer from "./ClipViewer";

function App() {
  const [viewingClipPath, setViewingClipPath] = useState(null);

  const handleClipClick = (clipName) => {
    if (!viewingClipPath) {
      setViewingClipPath(clipName);
    }
  };

  const handleBackViewer = () => {
    setViewingClipPath(null);
  };

  useEffect(() => {
    console.log(viewingClipPath);
    console.log(!viewingClipPath);
  }, [viewingClipPath]);

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
