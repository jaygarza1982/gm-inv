import { withSnackbar } from 'notistack';
import React, { useEffect } from 'react';
import MaterialTable from 'material-table';
import TableIcons from '../TableIcons';
import { useParams, withRouter } from 'react-router-dom';
import { Button } from '@material-ui/core';

const ItemList = props => {
    const { apiKey } = useParams();

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

    const downloadItems = date => {
        fetch(`/api/items/download/${apiKey}/${date}`).then(resp => {
            resp.blob().then(blob => {
                //Download file
                let url = window.URL.createObjectURL(blob);
                let a = document.createElement('a');
                a.href = url;
                a.download = `${date}.csv`;
                a.click();
            });
        });
    }

    return (
        <>
            <h2>Item List</h2>
            <MaterialTable
                icons={TableIcons}
                title={'Items In Months'}
                columns={
                    [
                        { title: 'Date', field: 'date', render: rowData => {
                            return (
                                <Button
                                    onClick={() => { downloadItems(rowData.date) }}
                                    variant='contained'
                                    color='primary'
                                >
                                    {rowData.date}
                                </Button>
                            )
                        }}
                    ]
                }
                data={items}
            />
        </>
    );
}

export default withRouter(withSnackbar(ItemList));
