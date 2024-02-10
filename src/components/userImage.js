import React, { useEffect, useContext, useState } from 'react';
import { Image } from 'react-bootstrap';
import UploaderContext from '../modules/uploader/uploader.context';

export default function userImage({ filePath, ...props }) {
  const { getFileLink } = useContext(UploaderContext);
  const [avatarUrl, setAvatarUrl] = useState(null);

  useEffect(() => {
    if (filePath) {
      getFileLink({ filePath }).then((uri) => {
        if (uri) {
          setAvatarUrl(uri);
        }
      });
    }

    return () => {
      setAvatarUrl(null);
    };
  }, [filePath]);

  return (
    <Image
      className="avatar-img rounded-circle"
      src={avatarUrl || '/assets/img/user/user-empty.png'}
      {...props}
    />
  );
}
