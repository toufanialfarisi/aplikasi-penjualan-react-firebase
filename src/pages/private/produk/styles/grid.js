import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    fab: {
        position: 'absolute',
        bottom: theme.spacing(4), 
        right: theme.spacing(4)
    },
    card:{
        display:'flex'
        
    },
    foto:{
        width:150
    },
    fotoPlaceholder:{
        width:150,
        alignSelf:'center',
        textAlign:'center'
    },
    decoration:{
        textDecoration:'none',
        color:'black'
    }
}));

export default useStyles;