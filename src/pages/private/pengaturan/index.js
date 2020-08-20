import React from 'react'

// material ui
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Paper from '@material-ui/core/Paper';

import {Switch, Route, Redirect} from 'react-router-dom';
import Pengguna from './pengguna'
import Toko from './toko';
import useStyles from './styles'

function Pengaturan(props){

    const handleChangeTab = (event, value) => {
        props.history.push(value)
    }

    const classes = useStyles();

    return(
        <Paper square>
        <Tabs 
        value={props.location.pathname}
        indicatorColor="primary"
        textColor="primary"
        onChange={handleChangeTab} 
        >
            <Tab label="Pengguna" value="/pengaturan/pengguna"/>
            <Tab label="Toko" value="/pengaturan/toko"/>
        </Tabs>
        <div className={classes.tabContent}>
        <Switch>
            <Route path="/pengaturan/pengguna" component={Pengguna} />
            <Route path="/pengaturan/toko" component={Toko} />
            <Redirect to="/pengaturan/pengguna" />
        </Switch>
        </div>
        </Paper>
    )

}

export default Pengaturan