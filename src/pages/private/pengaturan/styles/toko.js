import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    pengaturanToko:{
        display:'flex',
        flexDirection:'column',
        width:300
    },
    tombolSimpan:{
        marginTop:theme.spacing(2)
    }
}));

export default useStyles;