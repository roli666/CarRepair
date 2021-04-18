import React from "react";
import { Button, Popover, Typography } from "@material-ui/core";

interface ConfirmationButtonProps {
  onConfirm: () => void;
  as: React.ReactElement<typeof Button>;
}
export function ConfirmationButton(props: ConfirmationButtonProps) {
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  return (
    <>
      {React.isValidElement(props.as) && React.cloneElement(props.as, { onClick: handleClick } as any)}
      <Popover open={open} anchorEl={anchorEl} onClose={handleClose}>
        <Typography align={"center"}>Are you sure?</Typography>
        <Button color="primary" onClick={() => props.onConfirm()}>
          Yes
        </Button>
        <Button color="secondary" onClick={() => handleClose()}>
          No
        </Button>
      </Popover>
    </>
  );
}
