/* eslint-disable react/no-unescaped-entities */
import React, {
  createContext,
  useCallback, useContext, useEffect, useMemo, useState,
} from 'react';
import {
  Alert, Button, Form, Modal, OverlayTrigger, Tooltip,
} from 'react-bootstrap';
import { useForm, Controller } from 'react-hook-form';
import _ from 'lodash';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import { useMutation, useQuery } from '@apollo/client';
import {
  deleteRegisteredUserMutation, deleteTuteeMutation, getUserWalletQuery,
} from './gql';
import { LoginContext } from '../../../login';
// import PaymentClient from '../../../../PaymentClient';
// import RegistryClient from '../../../../RegistryClient';
// import useCreateAuditTrail from '../../../auditTrail/useCreateAuditTrail';
import { LoadingSpinner } from '../../../../components';

const ModalContext = createContext();

export default function Index() {
  const [show, setShow] = useState(false);
  const {
    handleSubmit, formState, control, reset,
  } = useForm();
  const { errors } = formState;
  const { userUid, instanceUid } = useContext(LoginContext);
  const [canSubmit, setCanSubmit] = useState(false);
  const [balance, setBalance] = useState(0);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  // const { doInsertAuditTrail, userFullName } = useCreateAuditTrail();

  const handleClose = () => {
    setShow(false);
    reset();
  };
  const handleShow = () => setShow(true);

  // const { data: walletResult } = useQuery(getUserWalletQuery, {
  //   client: PaymentClient,
  //   variables: { userUid },
  // });

  // useEffect(() => {
  //   if (walletResult) {
  //     const wallet = _.has(walletResult, 'getUserWallet') ? walletResult.getUserWallet : null;
  //     const walletBalance = _.has(wallet, 'balance') ? parseFloat(wallet.balance).toFixed(2) : 0;
  //     // const walletBalance = parseFloat(0).toFixed(2);

  //     setCanSubmit(!(walletBalance > 0));
  //     setBalance(walletBalance);
  //   }
  // }, [walletResult]);

  // const [deleteUser] = useMutation(deleteRegisteredUserMutation, {
  //   client: RegistryClient,
  // });

  // const [deleteTutor] = useMutation(deleteTuteeMutation, {
  //   onCompleted: () => {
  //     doInsertAuditTrail({
  //       action: 'DELETE',
  //       changes: `${userFullName} Deleted Profile Account`,
  //       module: 'Profile Settings',
  //     });
  //     setSuccess(true);
  //   },
  //   onError: () => {
  //     setSuccess(false);
  //   },
  // });

  const submitForm = useCallback(() => {
    async function doSubmit() {
      setLoading(true);

      // await deleteUser({ variables: { userUid } })
      //   .then((deleted) => {
      //     if (deleted) {
      //       return deleteTutor({ variables: { uid: instanceUid, deletedBy: userUid } });
      //     }
      //   });

      setLoading(false);
    }

    doSubmit();
  });

  const triggerSubmit = () => {
    handleSubmit(submitForm)();
  };

  const isYes = ((value) => {
    const isValid = _.toLower(value) === 'yes';

    if (!isValid) { return 'Please reply with "YES"'; }

    return isValid;
  });

  const contextPayload = useMemo(() => ({ balance, success }), [balance, success]);

  return (
    <ModalContext.Provider value={contextPayload}>
      <OverlayTrigger
        key="delete-user"
        placement="top"
        overlay={(
          <Tooltip id="tooltip-delete-user">
            Delete Account
          </Tooltip>
        )}
      >
        <Button
          className="text-warning"
          variant="link"
          onClick={handleShow}
        >
          <FontAwesomeIcon icon={solid('user-slash')} />
          {' '}
          Delete
        </Button>
      </OverlayTrigger>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Delete Account</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {!canSubmit && <AlertCantSubmit />}
          <Alert variant="warning">
            <Alert.Heading>
              <FontAwesomeIcon icon={solid('exclamation-triangle')} />
              {' '}
              Warning!
            </Alert.Heading>
            <p>Deleting your account will remove all your information in the system.</p>
            <p>This cannot be undone.</p>
            <p>Please input "YES" to confirm.</p>
          </Alert>
          <Form noValidate>
            <Form.Group className="form-group" controlId="hide.confirm">
              <Form.Label>Input "YES" to confirm</Form.Label>
              <Controller
                name="confirm"
                control={control}
                rules={{
                  required: 'Confirmation is required.',
                  validate: {
                    isYes,
                  },
                }}
                render={({ field }) => (
                  <Form.Control
                    autoFocus
                    isInvalid={!!_.has(errors, 'confirm')}
                    {...field}
                  />
                )}
              />
              <Form.Control.Feedback type="invalid">
                {_.has(errors, 'confirm') ? errors.confirm.message : 'Invalid confirm.'}
              </Form.Control.Feedback>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button
            variant="primary"
            onClick={triggerSubmit}
            disabled={!canSubmit || loading}
          >
            {
              loading ? <LoadingSpinner /> : (
                <>
                  <FontAwesomeIcon icon={solid('user-slash')} />
                  {' '}
                  Confirm
                </>
              )
            }
          </Button>
        </Modal.Footer>
      </Modal>
      <SuccessConfirmModal />
    </ModalContext.Provider>
  );
}

function AlertCantSubmit() {
  const { balance } = useContext(ModalContext);

  return (
    <Alert variant="danger">
      <Alert.Heading>
        <FontAwesomeIcon icon={solid('exclamation-triangle')} />
        {' '}
        Forbidden!
      </Alert.Heading>
      <p>
        Account deletion is forbidden.
        The system forbids you to delete while balance is not zero.
      </p>
      <p>
        Your wallet current balance is
        {' '}
        <span className="text-info">
          ₱
          {balance}
        </span>
      </p>
    </Alert>
  );
}

function SuccessConfirmModal() {
  const { success } = useContext(ModalContext);
  const [visible, setVisible] = useState(false);
  const { logout } = useContext(LoginContext);

  useEffect(() => {
    setVisible(success);
  }, [success]);

  const onConfirm = useCallback(() => {
    logout();
  });

  return (
    <Modal
      show={visible}
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header>
        <Modal.Title>Account Deletion Success!</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Alert variant="success">
          <Alert.Heading>
            <FontAwesomeIcon icon={solid('thumbs-up')} />
            {' '}
            Thank you!
          </Alert.Heading>
          <p>You have successfully deleted your account. You are now about to logout.</p>
        </Alert>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="primary" onClick={onConfirm}>Confirm</Button>
      </Modal.Footer>
    </Modal>
  );
}
