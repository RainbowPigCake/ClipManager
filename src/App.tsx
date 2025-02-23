import { useState, useEffect } from 'react';
import { BaseDirectory } from '@tauri-apps/plugin-fs';
import ClipGrid from './ClipGrid';
import ClipViewer from './ClipViewer';
import { ThemeProvider } from '@/components/theme-provider';
import NavBar from './NavBar';
import Settings from './Settings';
import SearchPanel from './SearchPanel'
import { invoke } from '@tauri-apps/api/core';
import { open } from '@tauri-apps/plugin-dialog';

function App() {
  const [viewingClipPath, setViewingClipPath] = useState(null);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [isViewingSettingsPage, setIsViewingSettingsPage] = useState(false);
  const [clipFolderPath, setClipFolderPath] = useState('');
  const [volume, setVolume] = useState(0.5);

  useEffect(() => {
    async function loadSettings() {
      try {
        const settings: any = await invoke('read_settings');
        setClipFolderPath(settings.clip_folder_path);
        setVolume(settings.volume);
      } catch (error) {
        console.error('Failed to load settings:', error);
      }
    }
    loadSettings();
  }, []);

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

  async function handleChooseFolder() {
    const directory = await open({
      multiple: false,
      directory: true,
    });
    if (directory !== null && directory !== clipFolderPath) {
      setClipFolderPath(directory);
      console.log(clipFolderPath)
      await invoke('write_settings', { settings: { clip_folder_path: directory, volume } });


    }
  }

  useEffect(() => {
    if (!viewingClipPath) {
      window.scrollTo(0, scrollPosition);
    }
  }, [viewingClipPath, isViewingSettingsPage, scrollPosition]);

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <SearchPanel />
      <div className="flex flex-row bg-background text-foreground min-h-screen">
        <div className="fixed z-50">
          <NavBar key={`${viewingClipPath}+${isViewingSettingsPage}`} context={{ "viewing": viewingClipPath, "settings": isViewingSettingsPage }} funcs={{ "back": handleBackViewer, "settings": handleSettingsPage }} />
        </div>

        <div className="flex-grow ml-24 relative">
          <ClipGrid
            key={clipFolderPath}
            handleClickClip={handleClipClick}
            isVisible={!viewingClipPath && !isViewingSettingsPage}
            clipFolderPath={clipFolderPath}
          />

          {isViewingSettingsPage && (
            <div className="fixed inset-0 z-40 ml-32 bg-background">
              <Settings handleChooseFolder={handleChooseFolder} />
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
