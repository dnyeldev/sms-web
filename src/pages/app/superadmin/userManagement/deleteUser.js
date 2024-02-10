import React, { useContext, useState} from 'react'
import { useMutation } from '@apollo/client';
import { ModalConfirm } from '../../../components';
import { DELETE_USER } from './gql';
import useCreateAuditTrail from '../../auditTrail/useCreateAuditTrail';
import LoginContext from '../../login/login.context';
import RegistryClient from '../../../RegistryClient';
import { Button } from 'react-bootstrap';


export default function deleteUser({ onError, onSuccess, firstName, lastName, uid }) {
    const { userUid } = useContext(LoginContext);
    const [saving, setSaving] = useState(false)

    const { doInsertAuditTrail } = useCreateAuditTrail();

    const [deleteUser] = useMutation(DELETE_USER, { client: RegistryClient, refetchQueries: ['GetAllUsers'] });

    const handleDelete = ({ uid, firstName, lastName }) => {
        setSaving(true)
        deleteUser({
            variables: {
            userUid: uid,
            deletedBy: userUid,
            },
        }).then(() => {
            setSaving(false)
            doInsertAuditTrail({
                action: 'DELETE',
                changes: `Deleted ${firstName} ${lastName}`,
                module: 'User Management',
            });
        }).catch(err => {
            setSaving(false)
            if(onError) {
                onError({
                    title: 'Failed to delete user',
                    message: err.toString()
                })
            }
        })
    };

  return (
    <ModalConfirm
      onOk={() => handleDelete({ uid, firstName, lastName })}
      message={`Are you sure you want to delete ${firstName} ${lastName}?`}
    >
        {({ onClick }) => (
            <Button
                disabled={saving}
                variant="danger"
                onClick={onClick}
            >
            {!saving ? 'Delete' : 'Deleting'}
            </Button>
        )}
    </ModalConfirm>
  );
}