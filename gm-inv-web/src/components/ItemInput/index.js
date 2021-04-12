import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Button from '@material-ui/core/Button';
import { Save } from '@material-ui/icons';
import { withSnackbar } from 'notistack';
import { useParams, withRouter } from 'react-router-dom';

const useStyles = makeStyles({
    root: {
        // position: 'absolute',
        // left: '50%',
        // top: '35%',
        // transform: 'translate(-50%, -50%)',
        // WebkitTransform: 'translate(-50%, -50%)',
        // width: '100%'
    },
    itemTitle: {
        margin: '40px 0px 40px 0px',
        wordBreak: 'break-word'
    },
    saveButton: {
        marginTop: '50px',
        width: '65%',
        maxWidth: '350px',
        color: '#fff'
    }
});

const ItemInput = props => {
    const classes = useStyles();

    const { apiKey, itemName } = useParams();

    const [value, setValue] = React.useState('Used');

    const handleSetMark = e => {
        setValue(e.target.value);
    }

    const saveStatus = () => {
        fetch(`/api/items/add-status/${apiKey}/${itemName}/${value}/`).then(resp => {
            if (resp.status === 200) {
                props.enqueueSnackbar(`Successfully saved ${itemName} as ${value}`, { variant: 'success' });
            }
            else {
                props.enqueueSnackbar(`Could not save. Reason: ${JSON.stringify(resp.statusText)}`, { variant: 'error' });
            }
        }).catch(err => {
            props.enqueueSnackbar(`Could not send request. Reason: ${JSON.stringify(err)}`, { variant: 'error' });
        });
    }

    return (
        <div className={classes.root}>
            {/* {`${apiKey} ${itemName}`} */}
            <h2 className={classes.itemTitle}>{itemName}</h2>
            <FormControl component='fieldset'>
                <FormLabel component='legend'>Mark {itemName} as...</FormLabel>
                <RadioGroup row aria-label='status' name='status' value={value} onChange={handleSetMark}>
                    <FormControlLabel value='Used' control={<Radio />} label='Used' />
                    <FormControlLabel value='Down' control={<Radio />} label='Down' />
                </RadioGroup>
            </FormControl>

            <br />

            <Button
                //Themes are overkill for this app ;)
                style={{
                    backgroundColor: value === 'Used' ? '#1976d2' : '#d32f2f'
                }}
                className={classes.saveButton}
                variant='contained'
                startIcon={ <Save /> }
                onClick={saveStatus}
            >
                Mark {value}
            </Button>
        </div>
    );
};
  
export default withRouter(withSnackbar(ItemInput));
