import * as React from "react";
import { useMutation } from "react-query";
import { useHistory } from "react-router-dom";
import { AxiosError } from "axios";
import { Formik } from "formik";
import {
  Form,
  EnumFormStyle,
  Button,
  FormHeader,
  Snackbar,
} from "@amplication/design-system";
import { api } from "../api";
import useBreadcrumbs from "../components/breadcrumbs/use-breadcrumbs";
import { Calendar } from "../api/calendar/Calendar";
import { CalendarCreateInput } from "../api/calendar/CalendarCreateInput";

const INITIAL_VALUES = {} as CalendarCreateInput;

export const CreateCalendar = (): React.ReactElement => {
  useBreadcrumbs("/calendars/new", "Create Calendar");
  const history = useHistory();

  const [create, { error, isError, isLoading }] = useMutation<
    Calendar,
    AxiosError,
    CalendarCreateInput
  >(
    async (data) => {
      const response = await api.post("/api/calendars", data);
      return response.data;
    },
    {
      onSuccess: (data, variables) => {
        history.push(`${"/calendars"}/${data.id}`);
      },
    }
  );
  const handleSubmit = React.useCallback(
    (values: CalendarCreateInput) => {
      void create(values);
    },
    [create]
  );
  return (
    <>
      <Formik initialValues={INITIAL_VALUES} onSubmit={handleSubmit}>
        <Form
          formStyle={EnumFormStyle.Horizontal}
          formHeaderContent={
            <FormHeader title={"Create Calendar"}>
              <Button type="submit" disabled={isLoading}>
                Save
              </Button>
            </FormHeader>
          }
        ></Form>
      </Formik>
      <Snackbar open={isError} message={error?.response?.data?.message} />
    </>
  );
};
