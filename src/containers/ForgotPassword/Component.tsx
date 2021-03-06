import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import InputAdornment from '@material-ui/core/InputAdornment';
import { makeStyles } from '@material-ui/core/styles';
import { Link as RouterLink, Redirect } from 'react-router-dom';
import EmailIcon from '@material-ui/icons/EmailOutlined';
import InputBase from '@material-ui/core/InputBase';
import * as constants from '../../constants';

import AppWindow from '../../components/AppWindow';
import { DispatchProps, StateProps } from './Container';


const useStyles = makeStyles((theme) => ({
  header: {
    marginTop: theme.spacing(0),
    marginBottom: theme.spacing(12),
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
  email: {
    background: 'white',
    borderRadius: '4px',
    height: '48px',
    overflow: 'hidden',
    borderWidth: '0.5px',
    borderStyle: 'solid',
    borderColor: '#C0C0C0',
  },
  continueButton: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
  },
  loginLink: {
    marginBottom: theme.spacing(3),
  },
  content: {
    width: '100%',
  },
  errorMsg: {
    marginBottom: theme.spacing(3),
    paddingLeft: theme.spacing(3),
    paddingRight: theme.spacing(3),
  },
  inputRoot: {
    backgroundColor: 'white',
    height: '48px',
  },
  input: {
    height: '48px',
    padding: '27px 12px 24px',
  },
  inputAdornment: {
    color: theme.palette.primary.main,
  },
  inputStartAdornment: {
    color: theme.palette.primary.main,
    marginLeft: theme.spacing(2),
  },
}));


const Login: React.FunctionComponent<DispatchProps & StateProps> = ({
  isAuthorized, sendResetPasswordEmailRequestState, sendResetPasswordEmail, resetUser,
  error,
}) => {


  React.useEffect(() => resetUser, []);

  const [email, setEmail] = useState('');

  const isDisabled = (
    sendResetPasswordEmailRequestState === constants.LOADING ||
    sendResetPasswordEmailRequestState === constants.SUCCESS
  );

  const submitDisabled = isDisabled || !email;

  const classes = useStyles();

  return (
    <AppWindow size="xs">

      {
        isAuthorized &&
        <Redirect
          to='/'
        />
      }

      <Grid className={classes.content} alignItems="center" direction="column" container>
        <Grid className={classes.header} item>
          <Typography align="center" variant="h4">{constants.APP_NAME}</Typography>
        </Grid>
        <Grid item>
          <InputBase
            name="email"
            style={{ display: 'flex' }}
            className={classes.email}
            onChange={(e) => setEmail(e.target.value)}
            // label="Type your email"
            disabled={isDisabled}
            placeholder="email"
            value={email}
            startAdornment={
              <InputAdornment position="start">
                <EmailIcon className={classes.inputStartAdornment} />
              </InputAdornment>
            }
          />
        </Grid>
        <Grid item>
          <Button
            className={classes.continueButton}
            disabled={submitDisabled}
            onClick={() => sendResetPasswordEmail(email)}
            variant="contained"
            color="primary"
          >Send password reset email</Button>
        </Grid>

        {
          sendResetPasswordEmailRequestState === constants.ERROR && (
            <Grid className={classes.errorMsg} item>
              <Typography color="error" variant="body1">
                {(error && error.message) || 'Something went wrong!'}
              </Typography>
            </Grid>
          )
        }
        <Grid
          className={classes.loginLink}
          item
        >
          <Link
            component={RouterLink}
            to={'/'}
          >
            <Typography variant="body2">
              Go back to login
            </Typography>
          </Link>
        </Grid>
      </Grid>
    </AppWindow>
  );
};

export default Login;