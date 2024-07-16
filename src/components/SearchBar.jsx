import SearchIcon from '@mui/icons-material/Search';
import { InputBase } from '@mui/material';
import { styled, alpha, useTheme } from '@mui/material/styles';
import { useTranslation } from 'react-i18next';


const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  }));

  const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }));

  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('md')]: {
        width: '20ch',
      },
    },
  }));
  

  export default function SearchBar({setSearch}) {
    const theme = useTheme();
    const {t} = useTranslation();
    const primaryMainColor = theme.palette.primary.main;
    const primaryLightColor = theme.palette.primary.light;
    const handleSearch = (e) => {
        setSearch(e.target.value);
    }
    return(
        <div style={{display: "flex", justifyContent:"center"}}>
        <Search sx={{backgroundColor:primaryLightColor, borderRadius: theme.shape.borderRadius,border:"1px solid "+ primaryLightColor}}>
           <div style={{color:primaryMainColor, display:"flex", justifyContent:"end"}}>
            <SearchIconWrapper>
                  <SearchIcon sx={{color:primaryMainColor}}/>
              </SearchIconWrapper>
              <StyledInputBase
                  placeholder={`${t("Search")}…`}
                  inputProps={{ 'aria-label': 'search' }} 
                  onChange={handleSearch} 
              />
           </div>
        </Search>
        </div>
    )
  }