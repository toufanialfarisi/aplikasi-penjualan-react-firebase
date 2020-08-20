import React from 'react';

// material ui
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import {Link} from 'react-router-dom';
import useStyles from './styles';

function NotFound(){
    const classes = useStyles();
    return(
        <Container maxWidth="xs">
            <Paper className={classes.paper}>
                <Typography variant="subtitle1">
                    Halaman tidak ditemukan
                </Typography>
                <Typography variant="h3">
                    404
                </Typography>
                <Typography component={Link} to="/">
                    Kembali ke beranda
                </Typography>
            </Paper>
        </Container>
    )
}
export default NotFound;