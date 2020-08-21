import React, {useState, useEffect} from 'react';

// material ui 
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card'
import CardMedia from '@material-ui/core/CardMedia'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import ImageIcon from '@material-ui/icons/Image'

// tombol button produk
import IconButton from '@material-ui/core/IconButton'
import EditIcon from '@material-ui/icons/Edit'
import DeleteIcon from '@material-ui/icons/Delete';

// styles
import useStyles from './styles/grid'

// page component
import AddDialog from './add';
import { useFirebase } from '../../../components/FirebaseProvider';
import AppPageLoading from '../../../components/AppPageLoading';
import { useCollection } from 'react-firebase-hooks/firestore';

// utils mata uang ke rupiah
import { currency } from '../../../utils/formatter';

// react router 
import {Link} from 'react-router-dom'

function GridProduk(){

    const classes = useStyles();

    const {firestore, storage ,user} = useFirebase()

    const [openAddDialog, setOpenAddDialog] = useState(false)

    const produkCol = firestore.collection(`toko/${user.uid}/produk`)

    const [snapshot, loading] = useCollection(produkCol);

    const [produkItems, setProdukItems] = useState([]);

    useEffect(()=> {
        if (snapshot){
            setProdukItems(snapshot.docs)
        }
    }, [snapshot])



    if(loading){
        return <AppPageLoading />
    }
    

    const handleFab = (e) => {
        setOpenAddDialog(true);
    }

    const handleDelete = produkDoc => async e => {
        // produkDoc itu adalah sebuah data bukan list
        // e.preventDefault()
        // const konfirmasi = ;
        try {
            if (window.confirm("Apakah Anda yakin ingin menghapus item ini ? ")){
                await produkDoc.ref.delete();
                const fotoUrl = produkDoc.data().foto();
                if (fotoUrl){
                    await storage.setFromUrl(fotoUrl).delete();
                }
            }

        } catch (e){
            console.log(e)
        }
        
    }

    return(
        <>
        <Typography variant="h5" component="h1">
            Daftar produk
        </Typography>
        {
            produkItems.length <= 0 &&
            <Typography>Belum ada data produk</Typography>
        }

        <Grid container spacing={5}>
            {
                produkItems.map((produkDoc) => {
                    
                    const produkData = produkDoc.data();
                    console.log(produkData.foto)
                    return <Grid key={produkDoc.id}
                    item={true} xs={12} xm={12} md={6} lg={6}>
                        <Card className={classes.card}>
                        {
                            produkData.foto && 
                            <CardMedia className={classes.foto}
                            image={produkData.foto}
                            title={produkData.nama}
                            />
                        }
                        {
                            !produkData.foto && 
                            <div className={classes.fotoPlaceholder}>
                                <ImageIcon
                                    size="large"
                                    color="disable"
                                 />
                            </div>
                        }
                            <CardContent>
                                <Typography variant="h5" component={Link} to={`/produk/edit/${produkDoc.id}`} className={classes.decoration}>
                                    {produkData.nama}
                                </Typography>
                                <Typography>
                                    Harga : {currency(produkData.harga)}
                                </Typography>
                                <Typography>
                                    Stok  : {produkData.stok}
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <IconButton 
                                    component={Link}
                                    to={`/produk/edit/${produkDoc.id}`}
                                >
                                    <EditIcon />
                                </IconButton>
                                <IconButton onClick={handleDelete(produkDoc)}>
                                    <DeleteIcon />
                                </IconButton>

                            </CardActions>
                        </Card>
                    </Grid>
                })
            }
        </Grid>
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