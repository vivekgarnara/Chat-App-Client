import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { IconButton, Tooltip } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import DeleteIcon from '@mui/icons-material/Delete';

export default function AlertDialog({ alertHandler, sourceText }) {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = (data) => {
        alertHandler(data);
        setOpen(false);
    };

    // Determine the title and message based on the sourceText
    const getDialogContent = () => {
        switch (sourceText) {
            case "logout":
                return {
                    title: "Logout",
                    message: "Are you sure you want to logout?"
                };
            case "delete":
                return {
                    title: "Delete",
                    message: "Are you sure you want to delete this item?"
                };
            default:
                return {
                    title: "Confirmation",
                    message: "Are you sure?"
                };
        }
    };

    const { title, message } = getDialogContent();

    return (
        <React.Fragment>
            <Tooltip title={sourceText === "logout" ? "Logout" : "Delete"}>
                <IconButton
                    size="large"
                    aria-label={`${sourceText} button`}
                    color="inherit"
                    onClick={handleClickOpen}
                >
                    {sourceText === "logout" ? <LogoutIcon /> : <DeleteIcon />}
                </IconButton>
            </Tooltip>
            <Dialog
                open={open}
                onClose={() => handleClose(false)}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {message}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => handleClose(false)} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={() => handleClose(true)} color="primary" autoFocus>
                        Confirm
                    </Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}
