import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import PersonIcon from '@material-ui/icons/Person';
import AddIcon from '@material-ui/icons/Add';
import Typography from '@material-ui/core/Typography';
import { blue } from '@material-ui/core/colors';
import { DialogActions, DialogContent, TextField } from '@material-ui/core';
import {useFirebase} from '../../../components/FirebaseProvider'


import {withRouter} from 'react-router-dom'

function AddDialog({history, open, handleClose}){
    const [nama, setNama] = useState('');
    const [error, setError] = useState('');
    
    const {firestore, user} = useFirebase();
    
    const [isSubmitting, setSubmitting] = useState(false);

    const produkCol = firestore.collection(`toko/${user.uid}/produk`);


    const handleChange = (e) => {

        setError('');

        setNama(e.target.value);
    }

    const handleSimpan = async (e) => {

        setSubmitting(true)

        try {

            if (!nama) {

                throw new Error('Nama produk wajib diisi');
            }

            const produkBaru = await produkCol.add({nama})

            history.push(`produk/edit/${produkBaru.id}`);

        } catch(e){

            setError(e.message)

        }
        setSubmitting(false)
    }
      return (
          <Dialog 
            disableBackdropClick={isSubmitting}
            disableEscapeKeyDown={isSubmitting}
            open={open} onClose={handleClose}>
              <DialogTitle>Buat Produk Baru</DialogTitle>
              <DialogContent divides>
                  <TextField 
                    id="nama"
                    label="Nama Produk"
                    value={nama}
                    onChange={handleChange}
                    helperText={error}
                    error={error?true:false}
                    disabled={isSubmitting}

                  />
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose}>Batal</Button>
                <Button 
                    color="primary" 
                    disabled={isSubmitting}
                    onClick={handleSimpan}>
                    Simpan
                </Button>
              </DialogActions>
          </Dialog>
      )
}

AddDialog.propTypes = {
    open : PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired
}

export default withRouter(AddDialog);