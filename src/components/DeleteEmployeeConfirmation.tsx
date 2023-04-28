import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Checkbox,
} from "@material-ui/core";

const DeleteEmployeeConfirmationSchema = Yup.object().shape({
  confirmation: Yup.boolean().oneOf(
    [true],
    "You must confirm to delete the employee"
  ),
});

interface IProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const DeleteEmployeeConfirmation: React.FC<IProps> = ({
  isOpen,
  onClose,
  onConfirm,
}) => {
  return (
    <Dialog open={isOpen} onClose={onClose}>
      <Formik
        initialValues={{ confirmation: false }}
        validationSchema={DeleteEmployeeConfirmationSchema}
        onSubmit={(values) => {
          if (values.confirmation) {
            onConfirm();
          }
        }}
      >
        {({ errors, touched }) => (
          <Form>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogContent>
              <p>Are you sure you want to delete this employee?</p>
              <Field type="checkbox" name="confirmation" as={Checkbox} />
              <label htmlFor="confirmation">
                Yes, I want to delete this employee
              </label>
              {errors.confirmation && touched.confirmation && (
                <div>{errors.confirmation}</div>
              )}
            </DialogContent>
            <DialogActions>
              <Button onClick={onClose} color="primary">
                Cancel
              </Button>
              <Button type="submit" color="secondary" variant="contained">
                Delete
              </Button>
            </DialogActions>
          </Form>
        )}
      </Formik>
    </Dialog>
  );
};

export default DeleteEmployeeConfirmation;
