import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    hideInputFile:{
        display:'none'
    },
    uploadFotoProduk:{
        textAlign: 'center',
        padding: theme.spacing(3)
    },
    formEditBox:{
        display: 'flex',
        flexDirection:'column',

    },
    previewFotoProduk:{
        width:400,
        height: 'auto',
    },
    iconRight:{
        marginLeft:theme.spacing(1)
    },
    iconLeft: {
        marginRight:theme.spacing(1)
    },
    actionButton:{
        paddingTop:theme.spacing(2)
    },
    papperPadding:{
        padding: theme.spacing(3)
    }
}));

export default useStyles;