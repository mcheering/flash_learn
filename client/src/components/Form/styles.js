import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
      root: {
            '& .MuiTextField-root': {
                  margin: theme.spacing(1),
            },
      },
      paper: {
            padding: theme.spacing(2),
            alignItems: 'center'
      },
      textfield: {
            margin: 'auto'
      },
      form: {
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            textAlign: 'center'
      },
      submitbutton: {
            marginTop: '1rem',
            backgroundColor: '#3490D5',
            color: 'white',
      },
      clearbutton: {
            marginTop: '1rem',
            backgroundColor: '#757575',
            color: 'white'
      }
}));