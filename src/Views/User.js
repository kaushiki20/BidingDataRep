import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { useHistory } from "react-router-dom";
import Button from "@material-ui/core/Button";
const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

export default function User({ location }) {
  const classes = useStyles();
  let history = useHistory();
  const data = location.state.user.bids;

  return (
    <>
      <div>
        <h1>
          {location.state.user.firstname + " " + location.state.user.lastname}
          <h5>No. of biddings {data.length}</h5>
        </h1>
      </div>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="caption table">
          <TableHead>
            <TableRow>
              <TableCell align="right">ID</TableCell>
              <TableCell align="right">Car Title</TableCell>
              <TableCell align="right">Amount</TableCell>
              <TableCell align="right">Created At</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.length > 0 ? (
              data.map((row) => (
                <TableRow key={row.id}>
                  <TableCell align="right">{row.id}</TableCell>
                  <TableCell align="right">{row.carTitle}</TableCell>
                  <TableCell align="right">{row.amount}</TableCell>
                  <TableCell align="right">{row.created}</TableCell>
                </TableRow>
              ))
            ) : (
              <p>Sorry!! no bidding </p>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <div className="biding-value-button ">
        <Button
          variant="contained"
          color="primary"
          onClick={() => history.push("/")}
        >
          Back
        </Button>
      </div>
    </>
  );
}
