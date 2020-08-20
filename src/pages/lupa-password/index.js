import React, { useState } from "react";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper"; // => kotak putih untuk melapisi objek
import Typography from '@material-ui/core/Typography'
import useStyles from './styles'
import TextField from '@material-ui/core/TextField'
import Grid from '@material-ui/core/Grid'

// import react router dom 
import {Link, Redirect} from 'react-router-dom';

import isEmail from 'validator/lib/isEmail';

// firebase hook 
import { useFirebase } from '../../components/FirebaseProvider'

// app component 
import AppLoading from '../../components/AppLoading';

// notistack hook
import {useSnackbar} from 'notistack';

function LupaPassword() {

    // untuk keperluan styling
    const classes = useStyles();
    
    // untuk form form nya
    const [form, setForm] = useState({
        email:''
    });

    // untuk error
    const [error, setError] = useState({
        email:''
    })

    // kondisi untuk mendisable/mengunci form ketika tombol
    // register sudah diklik
    const [isSubmitting, setSubmitting] = useState(false);

    // untk keperluan authentikasi
    const {auth, user, loading} = useFirebase();

    const {enqueueSnackbar} = useSnackbar();

    const handleChange = e => {
        // teknik tercepat untuk perubahan value/nilai di form input
        setForm({
            ...form,
            [e.target.name]:e.target.value
        })

        // teknik tercepat untuk handle error di form input
        setError({
            ...error, 
            [e.target.name]:''
        })
    }

    // menampilkan pesan error jika form masih kosong
    // ketika tombol submit ditekan
    const validate = () => {
        const newError = {...error};

        if (!form.email){
            newError.email = 'Email wajib diisi';
        } else if (!isEmail(form.email)){
            newError.email = 'Email tidak valid';
        }
        return newError;
    }

    const handleSubmit = async e => {
        e.preventDefault();
        const findErrors = validate();

        if (Object.values(findErrors).some(err=>err!=='')){
            setError(findErrors);
        } else {
            try {
                setSubmitting(true);
                const actionCodeSettings = {
                    url:  `${window.location.origin}/login`
                }
                await auth.sendPasswordResetEmail(
                    form.email, actionCodeSettings
                )
                enqueueSnackbar(`sebuah tautan untuk mereset 
                password telah dikirimkan ke email ${form.email}`, 
                {
                    variant:"success"
                }
                );
                
                setSubmitting(false);
                
            } catch(e){
                const newError = {};

                switch(e.code){
                    case 'auth/user-not-found':
                        newError.email = 'Email tidak terdaftar';
                    break;
                    case 'auth/invalid-email':
                        newError.email ='Email tidak valid';
                    break;
                    default:
                        newError.email = 'Terjadi kesalahan. Silahkan dicoba lagi';
                        break;
                    
                }
                setError(newError);
                setSubmitting(false);
            }
        }
    }
    
    if (loading){
        return <AppLoading />
    }

    if (user){
        return <Redirect to="/" />
    }
    
    return (
    <Container maxWidth="xs">
      <Paper className={classes.paper}>
      <Typography 
      variant="h5"
      component="h1"
      className={classes.title}>
        Lupa Password
        </Typography>

        <form onSubmit={handleSubmit} noValidate>
            <TextField
                id="email"
                type="email"
                name="email"
                margin="normal"
                label="Alamat Email"
                fullWidth
                required
                value={form.email}
                onChange={handleChange}
                helperText={error.email}
                error={error.email?true:false}
                disabled={isSubmitting}
             />
            <Grid container className={classes.buttons}>
                <Grid item xs>
                    <Button 
                        disabled={isSubmitting}
                        type="submit"
                        color="primary"
                        variant="contained"
                        size="large">
                        Kirim
                    </Button>
                </Grid>
                <Grid item>
                    <Button
                    disabled={isSubmitting}
                    component={Link} 
                        type="submit"  
                        variant="contained"
                        size="large"
                        to="/login"
                        >
                        Login
                    </Button>
                </Grid>
            </Grid>
        </form>
      </Paper>
    </Container>
  );
}
export default LupaPassword;
