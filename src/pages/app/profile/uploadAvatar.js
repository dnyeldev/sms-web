import React, { useCallback, useContext, useEffect, useState } from "react";
import { Button, Col, Form, Modal } from "react-bootstrap";
import _ from "lodash";
import { Controller, useForm } from "react-hook-form";
import { useMutation, useQuery } from "@apollo/client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { regular } from "@fortawesome/fontawesome-svg-core/import.macro";
import { LoginContext } from "../login";
import {
  UploadFileMutation,
  SaveAvatarMutation,
  getUserAvatarQuery,
} from "./gql";

export default function Index(payload) {
  const { userId } = useContext(LoginContext);
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const formPayload = useForm();
  const { formState, control, setValue, watch, getValues } = formPayload;
  const { errors } = formState;
  // const { onCompleted } = payload

  const handleClose = useCallback(() => {
    setVisible(false);
  });

  const handleShow = useCallback(() => {
    setVisible(true);
  });

  const [mutateFileSave, { loading: loadingFileSave }] = useMutation(
    SaveAvatarMutation,
    {
      onCompleted: (value) => {
        handleClose();
      },
      onError: (error) => {
        console.log("Mutate.error", error);
      },
    }
  );

  const [mutateUploadFile, { loading: loadingUpload }] = useMutation(
    UploadFileMutation,
    {
      onCompleted: ({ uploadFile }) => {
        console.log({ uploadFile });
        const { id: fileId } = uploadFile;
        console.log({ userId, fileId });
        mutateFileSave({ variables: { userId, fileId: parseInt(fileId) } });
      },
      onError: (error) => {
        console.log("Mutate.error", error);
      },
    }
  );

  useEffect(() => {
    if (loadingFileSave || loadingUpload) {
      setLoading(true);
    } else {
      setLoading(false);
    }
  }, [loadingFileSave, loadingUpload]);

  const handleSubmit = useCallback((e) => {
    const values = getValues();
    const { avatar: file } = values;

    mutateUploadFile({
      variables: { file },
    });
  });

  return (
    <>
      <Button variant="link" onClick={handleShow}>
        <FontAwesomeIcon icon={regular("image")} />
      </Button>

      <Modal show={visible} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Upload Avatar</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form noValidate>
            <Form.Group as={Col} sm={12} controlId="profile.avatar">
              <Form.Label>Avatar</Form.Label>
              <Controller
                name="avatar"
                control={control}
                render={({ field }) => (
                  <Form.Control
                    isInvalid={!!_.has(errors, "avatar")}
                    type="file"
                    // {...field}
                    onChange={(e) => {
                      const fileList = e.target.files;

                      setValue("avatar", fileList[0]);
                    }}
                  />
                )}
              />
              <Form.Control.Feedback type="invalid">
                {_.has(errors, "avatar")
                  ? errors.govId.message
                  : "Invalid file."}
              </Form.Control.Feedback>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="link" onClick={handleClose} disabled={loading}>
            Close
          </Button>

          <Button variant="secondary" onClick={handleSubmit} disabled={loading}>
            {loading ? "Uploading..." : "Upload"}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
