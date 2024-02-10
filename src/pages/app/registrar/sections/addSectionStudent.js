import React, { useCallback, useContext, useState } from "react";
import _ from "lodash";
import { Modal, Button, Row, Col, Form } from "react-bootstrap";
import { AlertError, LoadingSpinner } from "../../../components";
import styledComponents from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { useForm } from "react-hook-form";
import { ADD_SECTION_ADVISER, ADD_SECTION_STUDENT } from "./gql";
import { useMutation } from "@apollo/client";
import { LoginContext } from "../../login";
import SelectEnrolledStudent from "../../../components/SelectEnrolledStudent";
import SectionContext from "./sections.context";

export default function Index(payload) {
  const [visible, setVisible] = useState(false);
  const [error, setError] = useState(null);
  const formInstant = useForm();
  const { userId } = useContext(LoginContext);
  const { sectionId, schoolYearId, gradeLevel } = useContext(SectionContext);
  const { handleSubmit, formState, control, reset } = formInstant;
  const { errors } = formState;

  const handleShow = () => {
    setVisible(true);
  };

  const handleClose = () => {
    reset();
    setVisible(false);
  };

  const [create, { loading }] = useMutation(ADD_SECTION_STUDENT, {
    onCompleted: async (result) => {
      console.log({ result });
      handleClose();
    },
    onError: (err) => {
      const message = _.has(err, "message") ? err.message : err.toString();
      setError(message);
    },
  });

  const onSubmit = useCallback(
    (data) => {
      console.log({ data, sectionId, schoolYearId });
      const variables = { ...data, sectionId, schoolYearId, createdBy: userId };

      create({ variables });
    },
    [create, userId, sectionId, schoolYearId]
  );

  return (
    <>
      <Button size="sm" variant="link" disabled={loading} onClick={handleShow}>
        <FontAwesomeIcon icon={solid("user-plus")} />{" "}
        {loading ? "Loading…" : "Add Student"}
      </Button>

      <Modal show={visible} onHide={handleClose} centered>
        <Form noValidate onSubmit={handleSubmit(onSubmit)}>
          <Modal.Header closeButton>
            <Modal.Title>Add Section Student</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Row>
              <Col lg={12}>
                <Row className="mb-3">
                  <SelectEnrolledStudent
                    schoolYearId={schoolYearId}
                    gradeLevel={gradeLevel}
                    {...formInstant}
                  />
                </Row>
              </Col>
            </Row>
            <Row>
              <Col>
                {error && (
                  <Col lg={12}>
                    <AlertError
                      error={error}
                      title={"Create Error"}
                      onClose={() => setError(null)}
                    />
                  </Col>
                )}
              </Col>
            </Row>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={() => handleClose()} variant="link">
              Close
            </Button>
            <Button variant="primary" disabled={loading} type="submit">
              {loading ? (
                <LoadingSpinner />
              ) : (
                <>
                  <FontAwesomeIcon icon={solid("user-plus")} /> Add
                </>
              )}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
}
