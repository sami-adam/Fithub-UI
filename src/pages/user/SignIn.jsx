import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useTranslation } from 'react-i18next';
import LanguageSelector from '../../components/LanguageSelector';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';

function Copyright(props) {
  const {t} = useTranslation();
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props} sx={{paddingTop:"40px"}}>
      {`${t("Copyright")} © `} {new Date().getFullYear() + " "}
      <Link color="inherit" href="https://fithub.com/">
        Fith Hub
      </Link>{' '}
      
      {'.'}
    </Typography>
  );
}

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function SignIn() {
  const [email, setEmail] = React.useState("admin@fithub.com");
  const [password, setPassword] = React.useState("qLUftio3");
  const [signIn, setSignIn] = React.useState(false);
  const {t} = useTranslation();
  const baseURL = process.env.REACT_APP_BASE_URL;

  const handleSubmit = (event) => {
    event.preventDefault();
    //const data = new FormData(event.currentTarget);
    setSignIn(true);
  };

  React.useEffect(()=> { 
    async function fetchData() {
    if (signIn){
      const token = await fetch(`${baseURL}/auth/signIn`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ "email": email, "password": password}),
      }).then(response => response.json()).then(data => {
        return data;
      });
      localStorage.setItem('token', token.token);
      const user = await fetch(`${baseURL}/auth/user`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token.token,
        },
      }).then(response => response.json()).then(data => {
          return data;});
      localStorage.setItem('user', JSON.stringify(user));
      setSignIn(false);
    }};
    fetchData();
    // Navigate to home page
    if (!signIn && localStorage.getItem('token')) {
      window.location.href = "/home";
    };
  }, [signIn])



  return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'primary.main', height:"80px", width:"80px" }}>
          FitHuB
          </Avatar>
          <Typography component="h1" variant="h5">
            {t("Sign in")}
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label={t("Email Address")}
              name="email" 
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
              autoFocus variant="standard"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label={t("Password")} 
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              id="password"
              autoComplete="current-password" variant="standard"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label={t("Remember me")}
            />
            <LanguageSelector/>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              {t("Sign In")}
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  {t("Forgot password?")}
                </Link>
              </Grid>
              <Grid item>
                <Link href="#" variant="body2">
                  {t("Don't have an account? Sign Up")}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
  );
}