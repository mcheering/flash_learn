import { makeStyles } from '@material-ui/core/styles';
export default makeStyles((theme) => ({
      appBar: {
            borderRadius: 15,
            margin: '0.5rem',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '10px',
            width: '100%'
      },
      heading: {
            color: 'rgba(0,183,255, 1)',
            textDecoration: 'none',
      },
      image: {
            flex: 'left'
      },
      toolbar: {
            display: 'flex',
            flex: "right",
            width: '100%'
      },
      profile: {
            display: 'flex',
            margin: 'auto 0'
      },
      userName: {
            margin: '0 2rem'

      },
      brandContainer: {
            display: 'flex',
            flex: "left",
            justifyContent: 'space-between',
            width: '100%',
      },
      logout: {
            alignSelf: "right",

      },

}));