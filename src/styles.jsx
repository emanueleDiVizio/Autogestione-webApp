import {platform} from 'onsenui';

const styles = {
    main: {
        fontFamily: platform.isIOS() ? 'Lato' : 'Roboto',
        textAlign: 'center',
        color: '#4a4a4a',
        width: '100%',
        marginTop: '30px'
    },
    textPage :{
        margin: '16px'    
    },
    invalid: {
        color: 'red',
        fontSize: '20px'
    },
    progress: {
        width: '50px',
        height: '50px'
    },
    name: {
        textTransform: 'uppercase',
        fontSize: '24px',
        lineHeight: '24px'
    },
    country: {
        margin: '2px 0 0 0',
        textTransform: 'uppercase',
        fontSize: '12px',
        lineHeight: '12px'
    },
    icon: {
        fontSize: '100px',
        margin: '20px 0 0px 0'
    },
    data: {
        fontSize: '40px',
        fontWeight: 300,
        display: 'flex',
        margin: '40px 25px'
    },
    dataColumn: {
        flexGrow: 1,
        display: 'flex',
        flexDirection: 'column'
    },
    dataValue: {
        fontSize: '60px'
    },
    dataCaption: {
        fontSize: '14px',
        fontWeight: 400
    },

    cardView: {margin: "12px", 
               boxShadow: "0 1px 4px rgba(0,0,0,0.2)", 
               backgroundColor: "white",
               height: "150px"
              }
};


export default styles;