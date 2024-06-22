import React, { useEffect } from "react";

import * as Yup from "yup";
import {
  Grid,
  Card,
  CardHeader,
  CardContent,
  Divider,
  Box,
  Typography,
  Button,
} from "@mui/material";
import WeekdayTable from "./weekdays-table";
import { FieldArray, Formik, FormikProvider, useFormik } from "formik";
import { upsertSchedule } from "../../../slices/branches";
import { useRouter } from "next/router";
import { useAppDispatch } from "@/store";
import toast from "react-hot-toast";
import { CreateWeekdayScheduleDto } from "@/api/schedule-api";
interface QueryParams {
  branchId?: number;
}
const ScheduleBranchForm = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const query = router.query as QueryParams;
  const validationSchema = Yup.object().shape({
    weekdaySchedules: Yup.array().of(
      Yup.object().shape({
        weekday: Yup.string(), //.required("Weekday is required"),
        openTime: Yup.date().nullable(), //.required(),
        endTime: Yup.date().nullable(),
        closed: Yup.boolean(), //.required()
        id: Yup.number(),
      })
      // .test({
      //   name: "TwoFieldsIfOneIsfilled",
      //   message: "${path} is invalid.",
      //   test: function ({ openTime, endTime, closed }) {
      //     return (openTime && endTime) || (!openTime && !endTime && closed);
      //   },
      // })
    ),
  });

  const formik = useFormik({
    initialValues: {
      branchId: query.branchId,
      weekdaySchedules: [],
    },
    validationSchema,
    onSubmit: async (values, helpers) => {
      try {
        const response = await dispatch(
          upsertSchedule({
            weekdaySchedules: values.weekdaySchedules,
            branchId: values?.branchId || 0,
          })
        );
        toast.success(response.message);
        // helpers.resetForm();
        helpers.setStatus({ success: true });
      } catch (error) {
        toast.error("Algo va mal.");
        helpers.setStatus({ success: false });
        // helpers.setErrors({ submit: err.message });
        helpers.setSubmitting(false);
      }
      // formik.errors
    },
  });
  // useEffect(() => {
  //   console.log(formik.errors);
  // }, [formik.errors]);
  const showErrors = () => {
    console.log(formik.values);
    console.log(formik.errors);
  };
  return (
    <Card>
      <CardHeader sx={{ pb: 0 }} title="Schedules" />
      <CardContent sx={{ pb: 0 }}>
        <form onSubmit={formik.handleSubmit}>
          <Grid item xs={12}>
            <Divider />
            <Box sx={{ py: 4 }}>
              <Typography color="inherit" variant="h4">
                Schedule
              </Typography>
            </Box>
            <FormikProvider value={formik}>
              <FieldArray
                name="weekdaySchedules"
                render={(arrayHelpers) => (
                  <WeekdayTable arrayHelpers={arrayHelpers} formik={formik} />
                )}
              ></FieldArray>
            </FormikProvider>
            <Box>
              <Button
                // fullWidth
                // onClick={showErrors}
                color="primary"
                type="submit"
                variant="contained"
              >
                Save
              </Button>
            </Box>
          </Grid>
        </form>
      </CardContent>
    </Card>
  );
};

export default ScheduleBranchForm;
