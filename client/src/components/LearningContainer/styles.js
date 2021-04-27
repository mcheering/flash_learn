
import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
      mainContainer: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
      },
      smMargin: {
            margin: theme.spacing(1),
      },
      actionDiv: {
            textAlign: 'center',
      },
      card: {
            margin: '1rem',
            padding: '1rem',
            boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2)',
            minWidth: '60%',
            maxWidth: '100%',
            alignItems: 'center'
      },
      paper: {
            margin: '1rem',
            padding: '1rem',
            boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2)',
            minWidth: '40%',
            maxWidth: '100%',
            alignItems: 'center'
      },
      submitbutton: {
            marginTop: '1rem',
            backgroundColor: '#3490D5',
            color: 'white',
            alignSelf: 'center'
      },
      clearbutton: {
            marginTop: '1rem',
            backgroundColor: '#757575',
            color: 'white',
            alignSelf: 'center'
      },
      textfield: {
            marginTop: '1rem',
            alignSelf: 'center'
      },
      flipbutton: {
            margin: 'auto',
            textAlign: "center"
      },
      form: {
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
      },
}));