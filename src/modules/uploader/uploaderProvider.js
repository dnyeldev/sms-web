import React, { useCallback, useContext, useMemo } from 'react';
import { arrayOf, node, oneOfType } from 'prop-types';
import axios from 'axios';
import _ from 'lodash';
import { LoginContext } from '../../pages/login';
import Context from './uploader.context';

const { REACT_APP_FILE_SERVICE } = process.env;
const UPLOAD_IMG_URL = `${REACT_APP_FILE_SERVICE}/upload-image`;
const UPLOAD_FILE_URL = `${REACT_APP_FILE_SERVICE}/upload-file`;
const UPLOAD_FILES_URL = `${REACT_APP_FILE_SERVICE}/upload-files`;
const GET_FILE_URL = `${REACT_APP_FILE_SERVICE}/get`;

export default function Index({ children }) {
  const { userUid: loginUserUid } = useContext(LoginContext);

  const uploadImg = useCallback((payload) => new Promise((resolve, reject) => {
    const { file, fileName, userUid } = payload;
    const formData = new FormData();

    formData.append('file', file);
    formData.append('userUid', userUid || loginUserUid);
    formData.append('fileName', fileName);

    axios({
      method: 'post',
      headers: {
        'Access-Control-Allow-Origin': '*'
      },
      url: UPLOAD_IMG_URL,
      data: formData,
    }).then(resolve).catch(reject);
  }), [loginUserUid]);

  const uploadFile = useCallback((payload) => new Promise((resolve, reject) => {
    const {
      file, fileName, userUid, fileLocation,
    } = payload;
    const formData = new FormData();

    formData.append('file', file);
    formData.append('userUid', userUid || loginUserUid);
    formData.append('fileName', fileName);

    if (fileLocation) {
      formData.append('fileLocation', fileLocation);
    }

    axios({
      method: 'post',
      headers: {
        'Access-Control-Allow-Origin': '*'
      },
      url: UPLOAD_FILE_URL,
      data: formData,
    }).then(resolve).catch(reject);
  }), [loginUserUid]);

  const uploadFiles = useCallback((payload) => new Promise((resolve, reject) => {
    const { files, userUid } = payload;
    const formData = new FormData();

    formData.append('files', files);
    formData.append('userUid', userUid || loginUserUid);

    // axios.post(UPLOAD_FILES_URL, formData)
    //   .then(resolve).catch(reject);
    axios({
      method: 'post',
      headers: {
        'Access-Control-Allow-Origin': '*'
      },
      url: UPLOAD_FILES_URL,
      data: formData,
    }).then(resolve).catch(reject);
  }), [loginUserUid]);

  const getFileExtension = useCallback((file) => new Promise((resolve, reject) => {
    try {
      const { type } = file;
      const splitType = type && type.split('/');
      const ext = splitType.length && _.last(splitType);

      resolve(ext);
    } catch (err) {
      reject(err);
    }
  }), [loginUserUid]);

  const getFileLink = useCallback((payload) => new Promise((resolve, reject) => {
    try {
      const { filePath } = payload;

      if (!filePath) {
        throw new Error('File path missing!')
      }

      axios({
        method: 'post',
        headers: {
          'Access-Control-Allow-Origin': '*'
        },
        url: `${GET_FILE_URL}`,
        data: { filePath },
      }).then((result) => {
        const data = _.has(result, 'data') ? result.data : null;

        resolve(data);
      }).catch(reject)
    } catch (err) {
      reject(err);
    }
  }));

  const contextPayload = useMemo(() => ({
    uploadFile,
    uploadFiles,
    uploadImg,
    getFileExtension,
    getFileLink,
  }), [
    uploadFile,
    uploadFiles,
    uploadImg,
    getFileExtension,
    getFileLink,
  ]);

  return (
    <Context.Provider value={contextPayload}>
      {children}
    </Context.Provider>
  );
}

Index.propTypes = {
  children: oneOfType([arrayOf(node), node]).isRequired,
};
