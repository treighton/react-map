const styles = {
  searchBar: {
    backgroundColor: '#FFFFFF',
    boxShadow: '0 2px 4px 0 rgba(137,120,107,0.36)',
    position: 'absolute',
    top: '20px',
    left: '20px',
    display: 'flex',
    padding: '10px',
  },
  searchInput: {
    borderRadius: '0px!important',
    height: '35px',
    width: '256px',
    backgroundColor: '#F2F2F2',
    border: 'none',
    border: '1px solid #6e452b!important',
    padding: '0 15px!important',
    '&:focus': {
      boxShadow: '0px 0px 8px #434013!important',
      outline: 'none!important',
    }
  },
  dropdownToggle: {
    display: 'flex',
    alignItems: 'center',
    padding: '3px 5px',
    border: '1px solid #6e452b',
    height: 35,
    borderRadius: 0,
    lineHeight: '1.75',
    textAlign: 'center'
  },
  dropdownListContainer: {
    border: '1px solid rgba(0,0,0,.125)',
    position: 'absolute',
    backgroundColor: '#fff',
    boxShadow: "0 2px 4px 0 rgba(0, 0, 0, 0.2), 0 3px 10px 0 rgba(0, 0, 0, 0.19)",
    '& h3': {
      marginBottom: 0,
      padding: '3px 8px',
    },
  },
  dropdownList: {
    padding: 0,
    maxWidth: 256,
    backgroundColor: '#fff',
    margin: 0,
    listStyle: 'none',
    '& li': {
      cursor: 'pointer',
      padding: '3px 8px',
      margin: 0,
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
      '&:hover': {
        background: '#d1d1d1'
      }
    },
    '& span': {
      userSelect: 'none'
    },
    '& a': {
      textDecoration: 'none',
      color: '#000'
    }
  },
  verticalBreak: {
    borderRight: '1px solid rgba(0,0,0,.125)',
    padding: '0px 0px',
  }
}

export default styles