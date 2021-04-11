import { withSnackbar } from 'notistack';
import React, { useEffect } from 'react';
import MaterialTable from 'material-table';
import TableIcons from '../TableIcons';
import { Link } from 'react-router-dom';

const ItemList = props => {
    const { apiKey } = props.match.params;

    const [items, setItems] = React.useState([]);

    useEffect(() => {
        fetch(`/api/items/list/${apiKey}`).then(resp => {
            if (resp.status === 200) {
                resp.json().then(json => {
                    setItems(json);
                });
            }
            else {
                props.enqueueSnackbar(`Could not list items. Reason "${JSON.stringify(resp.statusText)}"`, { variant: 'error' });
            }
        }, err => {
            props.enqueueSnackbar(`Could not list items. Reason "${JSON.stringify(err)}"`, { variant: 'error' });
        });
    }, [])

    return (
        <>
            <h2>Item List</h2>
            <MaterialTable
                icons={TableIcons}
                title={'Items In Months'}
                columns={
                    [
                        { title: 'Date', field: 'date', render: rowData => {
                            return <Link to={rowData.date}>{rowData.date}</Link>
                        }}
                    ]
                }
                data={items}
            />
        </>
    );
}

export default withSnackbar(ItemList);
