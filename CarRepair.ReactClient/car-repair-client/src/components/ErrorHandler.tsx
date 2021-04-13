import React, { useEffect, useState } from "react";
import { Collapse } from "@material-ui/core";
import { Alert } from "@material-ui/lab";

interface ValidationErrorProps {
  openAlert: boolean;
  closeAlertCallback: () => void;
}
export function ValidationErrorElement(props: ValidationErrorProps) {
  const [open, setOpen] = useState<boolean>(props.openAlert);

  useEffect(() => {
    setOpen(props.openAlert);
  }, [props.openAlert]);

  return (
    <Collapse in={open}>
      <Alert
        severity={"error"}
        onClose={() => {
          props.closeAlertCallback();
        }}
      >
        There was a server side validation error. Check the console for more
        information or contact the developers if you think this is an unwanted
        behaviour of the application.
      </Alert>
    </Collapse>
  );
}
