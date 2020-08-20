import React, {useState, useEffect} from 'react';

import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import { Typography } from '@material-ui/core';
import { useFirebase } from '../../../components/FirebaseProvider';
import { useDocument } from 'react-firebase-hooks/firestore';
import AppPageLoading from '../../../components/AppPageLoading';
import { useSnackbar } from 'notistack';

function EditProduk({match}){

    // const {firestore} = useFirebase();
    const {firestore, user} = useFirebase()
    const produkDoc = firestore.doc(`toko/${user.uid}/produk/${match.params.produkId}`);
    const {enqueueSnackbar} = useSnackbar()
    const [snapshot, loading] = useDocument(produkDoc)


    const [form, setForm] = useState({
        nama:'',
        sku:'',
        harga:0,
        stok:0,
        deskripsi:''
    })

    const [error, setError] = useState({
        nama:'',
        sku:'',
        harga:'',
        stok:'',
        deskripsi:''
    })

    const [isSubmitting, setSubmitting] = useState(false);


    useEffect(() => {
        if (snapshot){
            // setForm( {
            //     ...form,
            //     ...snapshot.data()
            // })
            setForm( currentForm =>(
                {
                    ...currentForm,
                    ...snapshot.data()
                }
            ))
        }
    }, [snapshot]);

    const handleChange = (e) => {
        setForm({
            ...form, 
            [e.target.name]: e.target.value
        })

        setError({
            ...error,
            [e.target.name]:''
        })
    }

    if (loading){
        return <AppPageLoading />
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        const findErrors = validate();

        if (Object.values(findErrors).some(err=>err !== '')){
            setError(findErrors)
        } else {

            setSubmitting(true);

            try {

                await produkDoc.set(form, {merge:true})
                enqueueSnackbar("Data produk berhasil ditambahkan", {variant:"success"})
                
            } catch (e){

                enqueueSnackbar(e.message, {variant:"error"})

            }
            setSubmitting(false);
        }

    }

    const validate = ()=> {
        const newError = {...error};

        if (!form.nama){
            newError.nama = "Nama produk wajib diisi!";
        }

        if (!form.harga){
            newError.harga = "Harga wajib diisi!";
        }

        if (!form.stok){
            newError.stok = "Stok wajib diisi"
        }

        return newError;
    }



    return(
        <div>
        <Typography variant="h5" component="h1">
            Edit Produk : {form.nama}
        </Typography>
            <Grid container>
                <Grid item xs={12} sm={6}>
                    <form id="produk-form" onSubmit={handleSubmit} noValidate>
                        <TextField 
                            id="nama"
                            name="nama"
                            label="Nama Produk"
                            margin="normal"
                            fullwidth
                            required
                            value={form.nama}
                            onChange={handleChange}
                            error={error.nama?true:false}
                            helperText={error.nama}
                            disabled={isSubmitting}
                            
                        />
                        <TextField 
                            id="sku"
                            name="sku"
                            label="SKU Produk"
                            margin="normal"
                            fullwidth
                            value={form.sku}
                            onChange={handleChange}
                            error={error.sku?true:false}
                            helperText={error.sku}
                            disabled={isSubmitting}
                            
                        />
                        <TextField 
                            id="harga"
                            name="harga"
                            type="number"
                            label="Harga Produk"
                            margin="normal"
                            fullwidth
                            required
                            value={form.harga}
                            onChange={handleChange}
                            error={error.harga?true:false}
                            helperText={error.harga}
                            disabled={isSubmitting}
                            
                        />
                        <TextField 
                            id="stok"
                            type="number"
                            name="stok"
                            label="Stok Produk"
                            margin="normal"
                            fullwidth
                            required
                            value={form.stok}
                            onChange={handleChange}
                            error={error.stok?true:false}
                            helperText={error.stok}
                            disabled={isSubmitting}
                            
                        />
                        <TextField 
                            id="deskripsi"
                            name="deskripsi"
                            label="Deskripsi Produk"
                            margin="normal"
                            fullwidth
                            rowsMax={3}
                            value={form.deskripsi}
                            onChange={handleChange}
                            error={error.deskripsi?true:false}
                            helperText={error.deskripsi}
                            disabled={isSubmitting}
                            
                        />
                    </form>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Typography>Upload Gambar</Typography>
                </Grid>

                <Grid item xs={12}>
                    <Button 
                        form="produk-form"
                        type="submit"
                        color="primary" 
                        disable={isSubmitting}
                        variant="contained">
                        Simpan
                    </Button>
                </Grid>
            </Grid>
        </div>
    )
}
export default EditProduk;