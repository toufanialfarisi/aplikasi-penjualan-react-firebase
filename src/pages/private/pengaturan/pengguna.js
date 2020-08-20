import React, {useRef, useState} from 'react';

// material ui 
import TextField from '@material-ui/core/TextField';
import { useFirebase } from '../../../components/FirebaseProvider';
import { useSnackbar } from 'notistack';

// validator
import isEmail from 'validator/lib/isEmail';
import useStyles from './styles/pengguna'


import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';


function Pengguna(){
    const {user} = useFirebase();
    const [error, setError] = useState({
        displayName:'',
        error:'',
        password:''
    })
    const displayNameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    const {enqueueSnackbar} = useSnackbar()
    const [isSubmitting, setSubmitting] = useState(false)
    const classes = useStyles()

    const saveDisplayName = async (e) => {
        const displayName = displayNameRef.current.value;
        console.log(displayName);

        if(!displayName){
            setError({
                displayName:'Nama wajib diisi'
            })
        } else if (displayName !== user.displayName) {
            setError({
                displayName:''
            })
            setSubmitting(true);
            await user.updateProfile({
                displayName
            })
            setSubmitting(false);
            enqueueSnackbar('Data pengguna berhasil diperbaharui', {variant:'success'})
        }
        
        
    }

    const updateEmail = async (e) => {
        const email = emailRef.current.value;
        if(!email){
            setError({
                email:'Email wajib diisi'
            })
        } else if (!isEmail(email)){
            setError({
                email:"Email tidak valid"
            })
        } else if (email !== user.email){
            setError({
                email:''
            })
            setSubmitting(true) 
            try {
                
                await user.updateEmail(email);
                enqueueSnackbar("email berhasil diperbaharui", {variant:"success"})
            
            } catch(e){
                let emailError = '';
                switch(e.code){
                    case 'auth/email-already-in-user':
                        emailError = 'Email sudah digunakan oleh pengguna lain';
                        break;
                    case 'auth/invalid-email':
                        emailError = 'Email tidak valid';
                        break;
                    case 'auth/requires-recent-login':
                        emailError='Silahkan logout, kemudian login kembali untuk memperbaharui email';
                        break;
                    default:
                        emailError = 'Terjadi kesalahan, silahkan coba lagi';
                        break;
                }

                setError({
                    email:emailError
                })
            }
        }

    }


    const sendEmailVerification = async (e) => {
        const actionCodeSettings = {
            url: `${window.location.origin}/login`
        };
        setSubmitting(true);
        await user.sendEmailVerification(actionCodeSettings);
        enqueueSnackbar(`Email verifikasi telah dikirim ke ${emailRef.current.value}`, 
            {variant:"success"}
        )
        setSubmitting(false);
    }

    const updatePassword = async (e)=> {
        const password = passwordRef.current.value;
        if (!password){
            setError({
                password:'Password wajib diisi'
            })
        } else if (password !== user.password) {
            setError({
                password:''
            });
            try {
                await user.updatePassword(password);
                setSubmitting(true);
                enqueueSnackbar("Password berhasil diubah", {variant:"success"})
                
            } 
            catch(e) {
                let passwordError = '';
                switch (e.code){
                    case 'auth/weak-password':
                        passwordError = 'Password Anda lemah';
                        break;
                    case 'auth/requires-recent-login':
                        passwordError = 'Silahkan logout, kemudian login kembali';
                        break;
                    default:
                        passwordError = 'Terjadi keasalah, sialhkan coba';
                        break;
                }
                setError({
                    password:passwordError
                })
            }

            setSubmitting(false);
        }
    }

    return(
        <div className={classes.pengaturanPengguna}>
        <TextField
            name="displayName"
            id="displayName"
            label="Name"
            margin="normal"
            defaultValue={user.displayName}
            inputProps={{
                ref: displayNameRef, 
                onBlur:  saveDisplayName
            }}
            disabled={isSubmitting}
            helperText={error.displayName}
            error={error.displayName?true:false}
            />

        <TextField
            id="email"
            name="email"
            label="Email"
            margin="normal"
            defaultValue={user.email}
            inputProps={{
                ref:emailRef,
                onBlur:updateEmail
            }}
            helperText={error.email}
            error={error.email?true:false}
            disabled={isSubmitting}
        />
        {
            user.emailVerified ? 
            <Typography 
                variant="subtitle1" 
                color="primary">
                Email sudah terferifikasi</Typography>
            :
            <Button 
            variant="outlined"
            disabled={isSubmitting}
            onClick={sendEmailVerification}>
                Kirim verifikasi
            </Button>    
        }

        <TextField 
            name="password"
            id="password"
            label="Password baru"
            type="password"
            margin="normal"
            autoComplete="new-password"
            inputProps={{
                ref:passwordRef,
                onBlur:updatePassword
            }}
            disabled={isSubmitting}
            helperText={error.password}
            error={error.password?true:false}

        />

        

        </div>
    )
}
export default Pengguna;