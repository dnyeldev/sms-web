import React, { useEffect, useState } from "react";
import { Col, Form } from "react-bootstrap";
import _ from "lodash";
import { Controller } from "react-hook-form";
import { gql, useQuery } from "@apollo/client";

const getEnrollmentSYQuery = gql`
  query {
    getEnrollmentSY {
      id
      name
      startDate
      endDate
      status
      __typename
    }
  }
`;

export default function Index(payload) {
  const {
    control,
    formState,
    label = "School Years",
    watch,
    setValue,
    placeholder,
    ...etc
  } = payload;
  const { errors } = formState;
  const [schoolYears, setSchoolYears] = useState([]);
  const [activeSchoolYear, setActiveSchoolYear] = useState(null);

  const watchInput = watch("schoolYearId");

  const { data, loading } = useQuery(getEnrollmentSYQuery);

  useEffect(() => {
    const result = _.has(data, "getEnrollmentSY") ? data.getEnrollmentSY : [];

    setSchoolYears(result);
  }, [data]);

  useEffect(() => {
    // select active school year or if none, select enrollment status
    _.map(schoolYears, (i) => {
      const id = _.has(i, "id") ? i.id : null;
      const status = _.has(i, "status") ? i.status : null;

      if (status === "ONGOING") setValue("schoolYearId", id);

      if (activeSchoolYear === null && status === "ENROLLMENT")
        setValue("schoolYearId", id);
    });
  }, [schoolYears, activeSchoolYear, setActiveSchoolYear]);

  useEffect(() => {
    if (watchInput === "invalid" || watchInput === placeholder) {
      setValue("schoolYearId", undefined);
    }
  }, [watchInput]);

  return (
    <Form.Group as={Col} sm={12} controlId="sy">
      <Form.Label>{label}</Form.Label>
      <Controller
        name="schoolYearId"
        control={control}
        rules={{ required: "SY is required." }}
        render={({ field }) => (
          <Form.Select isInvalid={!!_.has(errors, "schoolYearId")} {...field}>
            <option value="invalid">Select SY</option>
            {schoolYears.map((val, key) => {
              const id = _.has(val, "id") ? parseInt(val.id) : null;
              const name = _.has(val, "name") ? val.name : null;
              const status = _.has(val, "status") ? val.status : null;

              return (
                <option key={`sy-key-${key}`} value={id}>
                  {name}({status})
                </option>
              );
            })}
          </Form.Select>
        )}
      />
      <p className="text-danger mt-1" style={{ fontSize: ".875em" }}>
        {_.has(errors, "schoolYearId") ? errors.schoolYearId.message : ""}
      </p>
    </Form.Group>
  );
}
