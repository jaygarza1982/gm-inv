import React from 'react';
import QRCode from 'qrcode.react';
import { makeStyles, TextField } from '@material-ui/core';
import { useParams, withRouter } from 'react-router-dom';

const useStyles = makeStyles({
    root: {},
    input: {
        margin: '25px',
    }
});

const QRPage = () => {
    const classes = useStyles();

    const { apiKey } = useParams();

    const [qrAPIKey, setQRAPIKey] = React.useState(apiKey || '');
    const [qrItemName, setQRItemName] = React.useState('');

    const qrAPIKeyChange = e => {
        setQRAPIKey(e.target.value);
    }

    const qrItemNameChange = e => {
        setQRItemName(e.target.value);
    }

    return (
        <>
            <h2>QR Page</h2>
            <QRCode
                value={`${window.location.origin}/#/item-modify/${qrAPIKey}/${qrItemName}`}
                size={256}
            />
            <br />
            <TextField
                className={classes.input}
                margin='dense'
                label='API Key'
                type='text'
                value={qrAPIKey}
                onChange={qrAPIKeyChange}
                autoComplete='false'
                variant='outlined'
            />
            <br />
            <TextField
                className={classes.input}
                margin='dense'
                label='Item Name'
                type='text'
                value={qrItemName}
                onChange={qrItemNameChange}
                autoComplete='false'
                variant='outlined'
            />
        </>
    );
}

export default withRouter(QRPage);
