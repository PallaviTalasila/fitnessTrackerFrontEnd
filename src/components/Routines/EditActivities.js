import React, { useState } from "react";

import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Input from "@material-ui/core/Input";
import Paper from "@material-ui/core/Paper";
import IconButton from "@material-ui/core/IconButton";
// Icons
import EditIcon from "@material-ui/icons/EditOutlined";
import DoneIcon from "@material-ui/icons/DoneAllTwoTone";
import RevertIcon from "@material-ui/icons/NotInterestedOutlined";

import {
  addActivityToRoutine,
  fetchAllActivities,
  updateRoutineActivity,
  fetchAllPublicRoutines,
} from "../../api";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    marginTop: theme.spacing(3),
    overflowX: "auto",
  },
  table: {
    minWidth: 300,
  },
  selectTableCell: {
    width: 60,
  },
  tableCell: {
    width: 130,
    height: 40,
  },
  input: {
    width: 130,
    height: 40,
  },
  styleForButton: {
    fontSize: "0.5rem",
  },
}));

const createData = (id, name, count, duration) => ({
  id: id,
  name: name,
  count: count,
  duration: duration,
  isEditMode: true,
});

const CustomTableCell = ({ row, name, onChange }) => {
  const classes = useStyles();
  const { isEditMode } = row;
  console.log(row);
  return (
    <TableCell align="left" className={classes.tableCell}>
      {isEditMode ? (
        <Input
          value={row[name]}
          name={name}
          onChange={(e) => onChange(e, row)}
          className={classes.input}
        />
      ) : (
        row[name]
      )}
    </TableCell>
  );
};

const EditActivities = (props) => {
  const {
    routineId,
    routine,
    routines,
    setRoutines,
    loggedIn,
    userToken,
  } = props;

  const classes = useStyles();
  const [previous, setPrevious] = React.useState({});
  const [rows, setRows] = React.useState([
    routine.activities &&
      routine.activities.map((activity, index) => {
        const { id, name, count, duration } = activity;
        return createData(id, name, count, duration);
      }),
  ]);


  const onToggleEditMode = (id) => {
    setRows((state) => {
      return rows.map((row) => {
        if (row.id === id) {
          return { ...row, isEditMode: !row.isEditMode };
        }
        return row;
      });
    });
  };

  const onChange = (e, row) => {
    if (!previous[row.id]) {
      setPrevious((state) => ({ ...state, [row.id]: row }));
    }
    const value = e.target.value;
    const name = e.target.name;
    const { id } = row;
    const newRows = rows.map((row) => {
      if (row.id === id) {
        return { ...row, [name]: value };
      }
      return row;
    });
    setRows(newRows);
  };

  const onRevert = (id) => {
    const newRows = rows.map((row) => {
      if (row.id === id) {
        return previous[id] ? previous[id] : row;
      }
      return row;
    });
    setRows(newRows);
    setPrevious((state) => {
      delete state[id];
      return state;
    });
    onToggleEditMode(id);
  };

  return (
    <Paper className={classes.root}>
      <Table className={classes.table} aria-label="caption table">
        <TableHead>
          <TableRow>
            <TableCell align="left" />
            <TableCell align="left">ActivityId</TableCell>
            <TableCell align="left">Activity</TableCell>
            <TableCell align="left">Count</TableCell>
            <TableCell align="left">Duration</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, index) => (
            <TableRow key={row.id}>
              <TableCell className={classes.selectTableCell}>
                <>
                  <IconButton
                    size="small"
                    aria-label="done"
                    onClick={() => onToggleEditMode(row.id)}
                  >
                    <DoneIcon />
                  </IconButton>
                  <IconButton
                    aria-label="revert"
                    onClick={() => onRevert(row.id)}
                  >
                    <RevertIcon />
                  </IconButton>
                </>
                <IconButton
                  aria-label="delete"
                  onClick={() => onToggleEditMode(row.id)}
                >
                  <EditIcon />
                </IconButton>
              </TableCell>
              <CustomTableCell {...{ row, name: "id" }} />
              <CustomTableCell {...{ row, name: "name", onChange }} />
              <CustomTableCell {...{ row, name: "count", onChange }} />
              <CustomTableCell {...{ row, name: "duration", onChange }} />
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
};
export default EditActivities;
