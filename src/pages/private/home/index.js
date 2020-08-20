import React from 'react';
import Button from '@material-ui/core/Button';
import { useFirebase } from '../../../components/FirebaseProvider';

function Home(){

    const {auth} = useFirebase();

    return (
        <>
        <h1>Halaman Home (Buat Transaksi)</h1>
        <Button onClick={(e) => {
            auth.signOut()
        }}>SignOut</Button>
        </>
    )
}

export default Home;