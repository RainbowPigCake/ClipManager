import React, { useRef, useEffect } from 'react';

export default function SearchBar({ onRefresh }) {
  const folderPathRef = useRef('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onRefresh(folderPathRef.current.value);
  };

  // TODO: remove this. for developing purposes
  useEffect(() => {
    onRefresh('C:\\files\\LowkeyClips2\\temp');
  }, []);

  return (
    <>
      <div className="search">
        <form onSubmit={handleSubmit}>
          <label>
            Enter Folder Path:
            <input type="text" name="name" ref={folderPathRef} />
          </label>
          <input type="submit" name="submit" />
        </form>
      </div>
    </>
  );
}
