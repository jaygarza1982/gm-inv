import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import CropFree from '@material-ui/icons/CropFree';
import FormatListNumbered from '@material-ui/icons/FormatListNumbered';
import { Link, withRouter, useParams } from 'react-router-dom';

const useStyles = makeStyles({
    root: {
        position: 'absolute',
        bottom: '0',
        left: '50%',
        transform: 'translateX(-50%)',
    },
});

const Navbar = props => {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);

    const { apiKey } = useParams();

    return (
        <BottomNavigation
            value={value}
            onChange={(event, newValue) => {
                setValue(newValue);
            }}
            showLabels
            className={classes.root}
        >
            <BottomNavigationAction
                component={Link}
                to={`/qr-page/${apiKey}`}
                label='Make QR'
                icon={ <CropFree /> }
            />
            <BottomNavigationAction
                component={Link}
                to={`/item-list/${apiKey}`}
                label='List Items'
                icon={ <FormatListNumbered /> }
            />
        </BottomNavigation>
    );
}

export default withRouter(Navbar);