import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    fab: {
        position: 'absolute',
        bottom: theme.spacing(4), 
        right: theme.spacing(4)
    }
}));

export default useStyles;