import PropTypes from 'prop-types';
import { Box, Button, Card, Chip, Typography } from '@mui/material';

export const OverviewBanner = (props) => {
  const { onDismiss, ...other } = props;

  return (
    <Card
      sx={{
        alignItems: 'center',
        backgroundColor: 'primary.main',
        color: 'primary.contrastText',
        display: 'flex',
        flexDirection: {
          xs: 'column',
          md: 'row'
        },
        p: 4
      }}
      {...other}>
      <Box
        sx={{
          mr: 4,
          width: 200,
          height: 200,
          '& img': {
            height: 200,
            width: 'auto'
          }
        }}
      >
        <img
          alt=""
          src="/static/banner-illustration.png"
        />
      </Box>
      <div>
        <div>
          <Chip
            color="secondary"
            label="New"
          />
        </div>
        <Typography
          color="inherit"
          sx={{ mt: 2 }}
          variant="h4"
        >
          Bienvenido a Tink food! 🍔
        </Typography>
        <Typography
          color="inherit"
          sx={{ mt: 1 }}
          variant="subtitle2"
        >
          Ya iniciaste sesión! Crea tu tienda y registra tus productos en tu nuevo menu virtual🥳!
           </Typography>
        <Box sx={{ mt: 2 }}>
          <Button
            color="secondary"
            onClick={onDismiss}
            variant="contained"
          >
            Cerrar banner
          </Button>
        </Box>
      </div>
    </Card>
  );
};

OverviewBanner.propTypes = {
  onDismiss: PropTypes.func
};
