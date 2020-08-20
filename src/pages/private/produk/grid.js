import React, {useState} from 'react';

// material ui 
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

// styles
import useStyles from './styles/grid'

// page component
import AddDialog from './add';

function GridProduk(){

    const classes = useStyles();

    const [openAddDialog, setOpenAddDialog] = useState(false)

    const handleFab = (e) => {
        setOpenAddDialog(true);
    }

    return(
        <>
        <Fab 
            color="primary" 
            onClick={handleFab}
            className={classes.fab}>
            <AddIcon />
        </Fab>
        <AddDialog open={openAddDialog}
            handleClose={() => {
                setOpenAddDialog(false);
            }}
         />
        </>
    )
}
export default GridProduk;