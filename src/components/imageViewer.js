import React, { useEffect, useContext, useState } from 'react';
import { Image } from 'react-bootstrap';
import { CustomPlaceHolder } from '.';
import UploaderContext from '../modules/uploader/uploader.context';

export default function imageViewer({ filePath, ...etc }) {
  const { getFileLink } = useContext(UploaderContext);
  const [fileUrl, setFileUrl] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function doFetch() {
      setLoading(true)

      await getFileLink({ filePath }).then((uri) => {
        if (uri) {
          setFileUrl(uri);
        }
      }).catch(err => {
        setFileUrl(null);
      });

      setLoading(false)
    }

    if (filePath) {
      doFetch()
    }
  }, [filePath]);

  if (fileUrl) {
    return (
      <CustomPlaceHolder loading={loading}>
        <Image
          src={fileUrl}
          {...etc}
        />
      </CustomPlaceHolder >
    )
  }

  return (
    <CustomPlaceHolder loading={loading}>
      <object
        className="img-fluid rounded-circle"
        data={fileUrl}
        type="image/*"
      >
        <Image
          src="/assets/img/user/user-empty.png"
          fluid
          roundedCircle
          {...etc}
        />
      </object>
    </CustomPlaceHolder >
  );
}
