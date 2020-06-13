import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import SpeedDial from '@material-ui/lab/SpeedDial';
import SpeedDialAction from '@material-ui/lab/SpeedDialAction';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import MoreVertIcon from '@material-ui/icons/MoreVert';

const editSpeedDialStyles = makeStyles((theme) => ({
  root: {
    transform: 'translateZ(0px)',
    flexGrow: 1,
  },
  radioGroup: {
    margin: theme.spacing(1, 0),
  },
  speedDialStyle: {
    '&:hover, &:focus': {
      outline: 'none',
    },
  },
}));

const actions = [
  { icon: <EditIcon />, name: 'Edit', action: null },
  { icon: <DeleteIcon />, name: 'Delete', action: null },
];

export default function EditSpeedDial(props) {
  const classes = editSpeedDialStyles();
  const direction = 'up';
  const [open, setOpen] = React.useState(false);
  const hidden = false;

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  actions[0].action = () => {
    setOpen(false);
    props.editItemAction();
  };

  actions[1].action = () => {
    setOpen(false);
    props.deleteItemAction();
  };

  return (
    <div className={classes.root}>
      <SpeedDial
        ariaLabel="SpeedDial example"
        FabProps={{ size: 'small', style: { backgroundColor: '#001a33' } }}
        className={classes.speedDialStyle}
        hidden={hidden}
        icon={<MoreHorizIcon openIcon={<MoreVertIcon />} />}
        onClose={handleClose}
        onOpen={handleOpen}
        open={open}
        direction={direction}
      >
        {actions.map((action) => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            FabProps={{ style: { backgroundColor: 'lightgray' } }}
            tooltipTitle={action.name}
            tooltipOpen
            onClick={action.action}
          />
        ))}
      </SpeedDial>
    </div>
  );
}
