import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import SpeedDial from '@material-ui/lab/SpeedDial';
import SpeedDialIcon from '@material-ui/lab/SpeedDialIcon';
import SpeedDialAction from '@material-ui/lab/SpeedDialAction';
import EditIcon from '@material-ui/icons/Edit';
import SaveIcon from '@material-ui/icons/Save';
import FavoriteIcon from '@material-ui/icons/Favorite';

const useStyles = makeStyles((theme) => ({
    root: {
      transform: 'translateZ(0px)',
      flexGrow: 1,
    },
    radioGroup: {
      margin: theme.spacing(1, 0),
    },
    speedDial: {
      position: 'fixed',
      bottom: theme.spacing(2),
      right: theme.spacing(2)
    },
  }));

  const actions = [
    { icon: <EditIcon />, name: 'Edit' },
    { icon: <SaveIcon />, name: 'Save' },
    { icon: <FavoriteIcon />, name: 'Like' },
  ];

export default function EditSpeedDial() {
  const classes = useStyles();
  const [direction, setDirection] = React.useState('up');
  const [open, setOpen] = React.useState(false);
  const [hidden, setHidden] = React.useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

    return (
      <div className={classes.root}>
          <SpeedDial
            ariaLabel="SpeedDial example"
            className={classes.speedDial}
            hidden={hidden}
            icon={<SpeedDialIcon />}
            onClose={handleClose}
            onOpen={handleOpen}
            open={open}
            direction={direction}
          >
            {actions.map((action) => (
              <SpeedDialAction
                key={action.name}
                icon={action.icon}
                tooltipTitle={action.name}
                onClick={handleClose}
              />
            ))}
          </SpeedDial>
      </div>
    );
}