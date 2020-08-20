import React from 'react';
import clsx from 'clsx';
import Drawer from '@material-ui/core/Drawer';
import Box from '@material-ui/core/Box';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import SignOutIcon from '@material-ui/icons/ExitToApp';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

// Icon
import HomeIcon from '@material-ui/icons/Home';
import StoreIcon from '@material-ui/icons/Store'
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import SettingsIcon from '@material-ui/icons/Settings'

// React router
import { Route, Switch } from 'react-router-dom' 

// komponent halaman private
import Pengaturan from './pengaturan';
import Produk from './produk';
import Transaksi from './transaksi';
import Home from './home';

// styles
import useStyles from './styles';

// firebase hook 
import {useFirebase} from '../../components/FirebaseProvider';
import { Divider } from '@material-ui/core';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

export default function Private() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const {auth} = useFirebase()

  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleSignOut = (e) => {
      if(window.confirm("Apakah Anda yakin ingin keluar ? "))
      auth.signOut()
  }

  return (
    <div className={classes.root}>
      <AppBar position="absolute" className={clsx(classes.appBar, open && classes.appBarShift)}>
        <Toolbar className={classes.toolbar}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            className={clsx(classes.menuButton, open && classes.menuButtonHidden)}
          >
            <MenuIcon />
          </IconButton>
          <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
            {/* LOGO TITLE */}
            <Switch>
                <Route path="/" exact children="Home" />
                <Route path="/produk" children="Produk" />
                <Route path="/transaksi" children="Transaksi"/>
                <Route path="/pengaturan" children="Pengaturan"/>
            </Switch>
            {/* LOGO TITLE */}

          </Typography>
          <IconButton color="inherit">
              <SignOutIcon onClick={handleSignOut}/>
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        classes={{
          paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
        }}
        open={open}
      >
        <div className={classes.toolbarIcon}>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />

        {/* MENU MENU APLIKASI */}
            <List>
                
                <Route path="/" exact children={ (props) => {
                    return (
                        <ListItem 
                            selected={props.match?true:false}
                            onClick={()=> {
                                props.history.push('/')
                            }}
                            button>
                                <ListItemIcon>
                                    <HomeIcon />
                                </ListItemIcon>
                            <ListItemText primary="Home" />
                        </ListItem>
                    )
                }} />
                
                <Route path="/produk" children={ (props) => {
                    return (
                        <ListItem 
                            selected={props.match?true:false}
                            onClick={()=>{
                                props.history.push("/produk")
                            }}
                            button>
                                <ListItemIcon>
                                    <StoreIcon />
                                </ListItemIcon>
                            <ListItemText primary="Produk" />
                        </ListItem>
                    )
                }} />

                <Route path="/transaksi" children={ (props) => {
                    return (
                        <ListItem 
                            selected={props.match?true:false}
                            onClick={()=>{
                                props.history.push("/transaksi")
                            }}
                            button>
                                <ListItemIcon>
                                    <ShoppingCartIcon />
                                </ListItemIcon>
                            <ListItemText primary="Transaksi" />
                        </ListItem>
                    )
                }} />

                <Route path="/pengaturan" children={ (props) => {
                    return (
                        <ListItem 
                            selected={props.match?true:false}
                            onClick={()=>{
                                props.history.push("/pengaturan")
                            }}
                            button>
                                <ListItemIcon>
                                    <SettingsIcon />
                                </ListItemIcon>
                            <ListItemText primary="Pengaturan" />
                        </ListItem>
                    )
                }} />

            </List>
            
            
            
            

      </Drawer>
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
            <Switch>
                <Route path="/pengaturan" component={Pengaturan} />
                <Route path="/produk" component={Produk}/>
                <Route path="/transaksi" component={Transaksi}/>
                <Route path="/" component={Home} />
            </Switch>

          <Box pt={4}>
            <Copyright />
          </Box>
        </Container>
      </main>
    </div>
  );
}
