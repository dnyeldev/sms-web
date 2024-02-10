import React, { useEffect, useState } from "react";
import { Col, Form } from "react-bootstrap";
import _ from "lodash";
import { Controller } from "react-hook-form";
import { gql, useQuery } from "@apollo/client";

const getAllUsersQuery = gql`
  query Query($gradeLevel: GradeLevels!, $schoolYearId: Int!) {
    getForSectionEnrollees(
      gradeLevel: $gradeLevel
      schoolYearId: $schoolYearId
    ) {
      id
      profile {
        id
        firstName
        middleName
        lastName
        __typename
      }
      enrollment {
        id
        __typename
      }
      __typename
    }
  }
`;

export default function Index(payload) {
  const {
    control,
    formState,
    label = "Enrollee",
    watch,
    setValue,
    placeholder,
    schoolYearId,
    gradeLevel,
    ...etc
  } = payload;
  const { errors } = formState;
  const [enrollees, setEnrollees] = useState([]);

  const watchInput = watch("enrolleeId");

  const { data, loading } = useQuery(getAllUsersQuery, {
    variables: {
      gradeLevel,
      schoolYearId: parseInt(schoolYearId),
    },
  });

  useEffect(() => {
    const result = _.has(data, "getForSectionEnrollees")
      ? data.getForSectionEnrollees
      : [];

    setEnrollees(result);
  }, [data]);

  useEffect(() => {
    if (watchInput === "invalid" || watchInput === placeholder) {
      setValue("enrolleeId", undefined);
    }
  }, [watchInput]);

  return (
    <Form.Group as={Col} sm={12} controlId="enrollee">
      <Form.Label>{label}</Form.Label>
      <Controller
        name="enrolleeId"
        control={control}
        rules={{ required: "Enrollee is required." }}
        render={({ field }) => (
          <Form.Select isInvalid={!!_.has(errors, "enrolleeId")} {...field}>
            <option value="invalid">Select Student</option>
            {enrollees.map((val, key) => {
              const enrollment = _.has(val, "enrollment")
                ? val.enrollment
                : null;
              const enrolleeId = _.has(enrollment, "id") ? enrollment.id : null;
              const profile = _.has(val, "profile") ? val.profile : null;
              const firstName = _.has(profile, "firstName")
                ? profile.firstName
                : null;
              const lastName = _.has(profile, "lastName")
                ? profile.lastName
                : null;
              const fullName = `${lastName}, ${firstName}`;

              return (
                <option key={`enrollee-key-${key}`} value={enrolleeId}>
                  {fullName}
                </option>
              );
            })}
          </Form.Select>
        )}
      />
      <p className="text-danger mt-1" style={{ fontSize: ".875em" }}>
        {_.has(errors, "enrolleeId") ? errors.enrolleeId.message : ""}
      </p>
    </Form.Group>
  );
}
