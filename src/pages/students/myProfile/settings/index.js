import React, {
  useCallback, useContext, useEffect, useState,
} from 'react';
import {
  Button,
  Card, Form,
} from 'react-bootstrap';
import _ from 'lodash';
import { useForm } from 'react-hook-form';
import {
  gql, useMutation, useQuery,
} from '@apollo/client';
import moment from 'moment';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { UploaderContext } from '../../../../modules/uploader';
import { LoginContext } from '../../../login';
// import RegistryClient from '../../../../RegistryClient';
import { saveFileMutation } from '../../registration/gql';
import ChangePasswordModal from './changePasswordModal';
import DeleteUser from './deleteUser';
// import useCreateAuditTrail from '../../../auditTrail/useCreateAuditTrail';

const getAge = (birthDate) => moment().diff(moment(birthDate, 'DD MMM YYYY'), 'years');
const { REACT_APP_FILE_SERVICE } = process.env;
const UPLOAD_URL = `${REACT_APP_FILE_SERVICE}/upload-image`;

const insertAuditTrail = (doInsertAuditTrail, newValue, oldValue, name) => {
  doInsertAuditTrail({
    action: 'UPDATE',
    module: 'Profile Settings',
    changes: `Updated ${name} from ${oldValue} to ${newValue}`,
  });
};

const logChanges = (doInsertAuditTrail, oldValues, newValues) => {
  const oldMobile = _.has(oldValues, 'mobile') ? oldValues.mobile : null;
  const oldGradeLevel = _.has(oldValues, 'gradeLevel') ? oldValues.gradeLevel : null;
  // const oldInterest = _.has(oldValues, 'interest') ? oldValues.interest : null;
  const oldAddress1 = _.has(oldValues, 'address1') ? oldValues.address1 : null;
  const oldAddress2 = _.has(oldValues, 'address2') ? oldValues.address2 : null;
  const oldCity = _.has(oldValues, 'city') ? oldValues.city : null;
  const oldPostalCode = _.has(oldValues, 'postalCode') ? oldValues.postalCode : null;
  const oldCountryCode = _.has(oldValues, 'countryCode') ? oldValues.countryCode : null;

  const newMobile = _.has(newValues, 'mobile') ? newValues.mobile : null;
  const newGradeLevel = _.has(newValues, 'gradeLevel') ? newValues.gradeLevel : null;
  // const newInterest = _.has(newValues, 'interest') ? newValues.interest : null;
  const newAddress1 = _.has(newValues, 'address1') ? newValues.address1 : null;
  const newAddress2 = _.has(newValues, 'address2') ? newValues.address2 : null;
  const newCity = _.has(newValues, 'city') ? newValues.city : null;
  const newPostalCode = _.has(newValues, 'postalCode') ? newValues.postalCode : null;
  const newCountryCode = _.has(newValues, 'countryCode') ? newValues.countryCode : null;

  if (oldMobile !== newMobile) {
    insertAuditTrail(doInsertAuditTrail, newMobile, oldMobile, 'mobile');
  }

  if (oldGradeLevel !== newGradeLevel) {
    insertAuditTrail(doInsertAuditTrail, newGradeLevel, oldGradeLevel, 'grade level');
  }

  // if (oldInterest !== newInterest) {
  //   insertAuditTrail(doInsertAuditTrail, newInterest, oldInterest, 'interest');
  // }

  if (oldAddress1 !== newAddress1) {
    insertAuditTrail(doInsertAuditTrail, newAddress1, oldAddress1, 'address');
  }

  if (oldAddress2 !== newAddress2) {
    insertAuditTrail(doInsertAuditTrail, newAddress2, oldAddress2, 'address 2');
  }

  if (oldCity !== newCity) {
    insertAuditTrail(doInsertAuditTrail, newCity, oldCity, 'city');
  }

  if (oldPostalCode !== newPostalCode) {
    insertAuditTrail(doInsertAuditTrail, newPostalCode, oldPostalCode, 'postal code');
  }

  if (oldCountryCode !== newCountryCode) {
    insertAuditTrail(doInsertAuditTrail, newCountryCode, oldCountryCode, 'country code');
  }
};

const upload = (file, userUid) => new Promise((resolve, reject) => {
  const { type } = file;
  const splitType = type && type.split('/');
  const ext = splitType.length && _.last(splitType);
  const fileName = `user-avatar.${ext}`;
  const formData = new FormData();

  formData.append('file', file);
  formData.append('userUid', userUid);
  formData.append('fileName', fileName);

  axios.post(UPLOAD_URL, formData)
    .then(resolve).catch(reject);
});

export default function Index() {
  const navigate = useNavigate();
  const { userUid } = useContext(LoginContext);
  // const { doInsertAuditTrail, userFullName } = useCreateAuditTrail();
  const [avatar, setAvatar] = useState(null);
  const [userId, setUserId] = useState(null);
  const [defaultValues] = useState(null);
  const [oldValues, setOldValues] = useState(null);
  const formPayload = useForm({ defaultValues });
  const [loading, setLoading] = useState(false)
  const {
    handleSubmit, setValue, watch,
  } = formPayload;
  const [others, setOthers] = useState(null);
  const [path, setPath] = useState(null);
  const { getFileLink } = useContext(UploaderContext);

  // const { data: userResult, loading: userLoading } = useQuery(getUserQuery, {
  //   skip: !userUid,
  //   client: RegistryClient,
  //   variables: { uid: userUid },
  // });

  // useEffect(() => {
  //   const user = _.has(userResult, 'getUser') ? userResult.getUser : null;
  //   const id = _.has(user, 'id') ? user.id : null;
  //   const profile = _.has(user, 'userProfile') ? user.userProfile : null;
  //   const iGender = _.has(profile, 'gender') ? profile.gender : null;
  //   const iMobile = _.has(profile, 'mobile') ? profile.mobile : null;
  //   const iAddress = _.has(profile, 'address') ? profile.address : null;
  //   const iAddress1 = _.has(iAddress, 'address1') ? iAddress.address1 : null;
  //   const iAddress2 = _.has(iAddress, 'address2') ? iAddress.address2 : null;
  //   const iCity = _.has(iAddress, 'city') ? iAddress.city : null;
  //   const iPostalCode = _.has(iAddress, 'postalCode') ? iAddress.postalCode : null;
  //   const iCountryCode = _.has(iAddress, 'countryCode') ? iAddress.countryCode : null;
  //   const iAvatar = _.has(user, 'avatar') ? user.avatar : null;
  //   const iStorage = _.has(iAvatar, 'storage') ? iAvatar.storage : null;
  //   const iPath = _.has(iStorage, 'path') ? iStorage.path : null;
  //   const iOthers = _.has(profile, 'others') ? profile.others : null;
  //   const iGradeLevel = _.has(iOthers, 'gradeLevel') ? iOthers.gradeLevel : null;
  //   const iInterest = _.has(iOthers, 'interest') ? iOthers.interest : null;

  //   setUserId(id);
  //   setPath(iPath);
  //   setValue('gradeLevel', iGradeLevel);
  //   setValue('interest', iInterest);
  //   setOthers(iOthers);

  //   setValue('gender', iGender);
  //   setValue('mobile', iMobile);
  //   setValue('address1', iAddress1);
  //   setValue('address2', iAddress2);
  //   setValue('city', iCity);
  //   setValue('postalCode', iPostalCode);
  //   setValue('countryCode', iCountryCode);
  //   setOldValues({
  //     mobile: iMobile,
  //     gradeLevel: iGradeLevel,
  //     interest: iInterest,
  //     address1: iAddress1,
  //     address2: iAddress2,
  //     city: iCity,
  //     postalCode: iPostalCode,
  //     countryCode: iCountryCode,
  //   });
  // }, [userResult]);

  const watchBirthDate = watch('birthDate');
  const watchFile = watch('file');

  // const [mutateFileSave, { loading: saveFileLoading }] = useMutation(saveFileMutation, {
  //   client: RegistryClient,
  //   update(cache, { data }) {
  //     const { saveFile } = data;
  //     cache.modify({
  //       id: `User:${userId}`,
  //       fields: {
  //         avatar() {
  //           const newAvatarFrag = cache.writeFragment({
  //             data: saveFile,
  //             fragment: gql`
  //               fragment NewRef on UserFiles {
  //                 id
  //                 uid
  //                 userUid
  //                 fileCategory
  //                 storage
  //                 __typename
  //               }
  //             `,
  //           });

  //           return newAvatarFrag;
  //         },
  //       },
  //     });
  //   },
  // });

  useEffect(() => {
    if (watchBirthDate) {
      const computeAge = getAge(watchBirthDate);

      setValue('age', computeAge);
    }

    if (watchFile) {
      upload(watchFile, userUid).then((result) => {
        const { data } = result;

        // mutateFileSave({
        //   variables: { userUid, fileCategory: 'USER_AVATAR', storage: { ...data } },
        // }).then(() => {
        //   doInsertAuditTrail({
        //     action: 'UPDATE',
        //     module: 'Profile Settings',
        //     changes: `${userFullName} updated his/her avatar`,
        //   });
        // });
      });
    }
  }, [watchBirthDate, watchFile]);

  // const [mutateUpdate, { loading: saveProfileLoading }] = useMutation(saveProfileMutation, {
  //   client: RegistryClient,
  //   onCompleted: () => {
  //     navigate(-1);
  //   },
  // });

  // useEffect(() => {
  //   if (userLoading || saveProfileLoading || saveFileLoading) {
  //     setLoading(true)
  //   } else {
  //     setLoading(false)
  //   }
  // }, [setLoading, userLoading, saveProfileLoading, saveFileLoading])

  // const submitForm = useCallback((data) => {
  //   const mobile = _.has(data, 'mobile') ? data.mobile : null;
  //   const gradeLevel = _.has(data, 'gradeLevel') ? data.gradeLevel : null;
  //   const interest = _.has(data, 'interest') ? data.interest : null;
  //   const address1 = _.has(data, 'address1') ? data.address1 : null;
  //   const address2 = _.has(data, 'address2') ? data.address2 : null;
  //   const city = _.has(data, 'city') ? data.city : null;
  //   const postalCode = _.has(data, 'postalCode') ? data.postalCode : null;
  //   const countryCode = _.has(data, 'countryCode') ? data.countryCode : null;

  //   mutateUpdate({
  //     variables: {
  //       userUid,
  //       mobile,
  //       address: {
  //         address1, address2, city, postalCode, countryCode,
  //       },
  //       others: { ...others, gradeLevel, interest },
  //       updatedBy: userUid,
  //     },
  //   }).then(() => {
  //     // audit trail
  //     logChanges(doInsertAuditTrail, oldValues, data);
  //   });
  // }, [others]);

  // useEffect(() => {
  //   if (path) {
  //     getFileLink({ filePath: path }).then((uri) => {
  //       if (uri) {
  //         setAvatar(uri);
  //       }
  //     });
  //   }
  // }, [path]);

  // return (
  //   <DashboardTemplate>
  //     <Card>
  //       <Card.Body>
  //         <ChangePasswordModal />
  //         <DeleteUser />
  //       </Card.Body>
  //     </Card>

  //     <Card>
  //       <Card.Body>
  //         {/* <Form noValidate onSubmit={handleSubmit(submitForm)}> */}
  //         <Form>
  //           <ProfileForm {...formPayload} avatar={avatar} />
  //           <div className="submit-section">
  //             <Button variant="link" onClick={() => navigate(-1)}>Cancel</Button>
  //             <Button variant="primary" type="submit" disabled={loading}>
  //               {
  //                 loading ? <LoadingSpinner /> : (
  //                   <>
  //                     <FontAwesomeIcon icon={solid('floppy-disk')} />
  //                     {' '}
  //                     Save Changes
  //                   </>
  //                 )
  //               }
  //             </Button>
  //           </div>
  //         </Form>
  //       </Card.Body>
  //     </Card>
  //   </DashboardTemplate>
  // );

  return (<>Settings page</>)
}
