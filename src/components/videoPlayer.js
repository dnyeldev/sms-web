import React, { useEffect, useContext, useState } from 'react';
import ReactPlayer from 'react-player/lazy';
import UploaderContext from '../modules/uploader/uploader.context';

export default function imageViewer({ filePath, ...etc }) {
  const { getFileLink } = useContext(UploaderContext);
  const [fileUrl, setFileUrl] = useState(null);

  useEffect(() => {
    if (filePath) {
      getFileLink({ filePath }).then((uri) => {
        if (uri) {
          setFileUrl(uri);
        }
      });
    }

    return () => {
      setFileUrl(null);
    };
  }, [filePath]);

  return (
    <ReactPlayer
      url={fileUrl}
      controls
      {...etc}
    />
  );
}
