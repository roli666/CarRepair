import React, { useEffect, useState } from "react"
import { Box, Collapse, Grid, IconButton, List, ListItem, ListItemText, useTheme } from "@material-ui/core"
import { Close, Error } from '@material-ui/icons';
import { ValidationError } from "../api/models/ValidationError"

interface ValidationErrorProps {
    error: ValidationError
}
export function ValidationErrorElement(props: ValidationErrorProps) {
    const [open, setOpen] = useState(props.error.hasErrors());

    useEffect(() => {
        setOpen(props.error.hasErrors())
    }, [props.error])

    return (
        <Collapse in={open}>
            <ValidationResult error={props.error} collapsibleHandler={() => setOpen(false)} />
        </Collapse>
    )
}

interface ValidationResultProps {
    error: ValidationError
    collapsibleHandler: () => void
}
export function ValidationResult(props: ValidationResultProps) {
    const theme = useTheme()
    return (
        <Box border={3} borderColor={theme.palette.error.light} borderRadius={10}>
            <Grid container justify={"space-between"} direction={"row"}>
                <Grid container xs alignItems={"center"} direction={"column"} justify={"center"}>
                    <Error color={"error"} />
                </Grid>
                <Grid item xs={10}>
                    <List>
                        {
                            props.error.getErrors().map((error, index) => {
                                return (
                                    <ListItem key={index}>
                                        <ListItemText>{error}</ListItemText>
                                    </ListItem>
                                )
                            })
                        }
                    </List>
                </Grid>
                <Grid container xs alignItems={"flex-end"} direction={"column"}>
                    <IconButton
                        aria-label={"close"}
                        color={"inherit"}
                        size={"small"}
                        onClick={props.collapsibleHandler}
                    >
                        <Close fontSize={"inherit"} />
                    </IconButton>
                </Grid>
            </Grid>
        </Box>
    )
}