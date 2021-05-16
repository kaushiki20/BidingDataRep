import React, { useState, useEffect } from "react";
import "../App.css";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import Button from "@material-ui/core/Button";
import { useHistory } from "react-router-dom";
import { columns, useStyles } from "../Utils/Constant";
export default function Main() {
  let history = useHistory();
  const classes = useStyles();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [sort, setSort] = useState(false);
  const [bid, setBid] = useState(false);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  //api call to get data
  useEffect(() => {
    fetch("https://intense-tor-76305.herokuapp.com/merchants", {
      method: "GET",
    })
      .then((response) => response.json())
      .then((json) => setData(json))
      .catch((error) => console.error("error:", error));
  }, []);
  //setting loading state to false if data receieved
  useEffect(() => {
    if (data.length) {
      setLoading(false);
    }
  }, [data]);
  //sorting data according highest bid
  const descendingOrder = () => {
    let n = data
      .map((r) => {
        const d = r.bids.sort((a, b) => {
          return b.amount - a.amount;
        });

        return { ...r, bids: d };
      })
      .sort((a, b) => {
        return (b.bids[0] || {}).amount - (a.bids[0] || {}).amount;
      });
    setData(n);
  };
  //sorting data according to lowest bid
  const ascendingOrder = () => {
    let n = data
      .map((r) => {
        const d = r.bids.sort((a, b) => {
          return a.amount - b.amount;
        });

        return { ...r, bids: d };
      })
      .sort((a, b) => {
        return (a.bids[0] || {}).amount - (b.bids[0] || {}).amount;
      });
    setData(n);
    setSort(true);
  };

  const bidingOriginal = () => {
    setSort(false);
    setBid(!bid);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <>
      {loading ? (
        <p>loading...</p>
      ) : (
        <>
          <Paper className={classes.root}>
            <TableContainer className={classes.container}>
              <Table stickyHeader aria-label="sticky table">
                <TableHead>
                  <TableRow>
                    {columns.map((column) => (
                      <>
                        <TableCell
                          key={column.id}
                          align={column.align}
                          style={{ minWidth: column.minWidth }}
                        >
                          {column.label}
                          {column.id === "Bid" && (
                            <>
                              <span onClick={ascendingOrder}>
                                {" "}
                                <i class="material-icons">arrow_downward</i>
                              </span>
                              <span onClick={descendingOrder}>
                                <i class="material-icons">arrow_upward</i>
                              </span>
                            </>
                          )}
                        </TableCell>
                      </>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row, index) => {
                      return (
                        <TableRow
                          hover
                          onClick={() =>
                            history.push({
                              pathname: `/user/${row.id}`,
                              state: { user: row },
                            })
                          }
                          role="checkbox"
                          tabIndex={-1}
                          key={row.id}
                        >
                          <TableCell className="name-img-section">
                            <img
                              height={90}
                              width={90}
                              src={row.avatarUrl}
                              alt=""
                            />
                            <h4>{row.firstname + " " + row.lastname}</h4>
                          </TableCell>
                          <TableCell align={"right"}>{row.email}</TableCell>
                          <TableCell align={"right"}>{row.phone}</TableCell>
                          <TableCell align={"right"}>
                            {row.hasPremium ? "Yes" : "No"}
                          </TableCell>
                          <TableCell className="bid-sec" align={"right"}>
                            <p className={!bid ? "" : "low-price"}>
                              {/* to check wheather we want to see bidding according to highest/lowest price or showing the highest/lowest bid for particular customer */}
                              {sort
                                ? (row.bids[0] || {}).amount
                                : row.bids.length > 0
                                ? !bid
                                  ? Math.max.apply(
                                      Math,
                                      row.bids.map(function (o) {
                                        return o.amount;
                                      })
                                    )
                                  : Math.min.apply(
                                      Math,
                                      row.bids.map(function (o) {
                                        return o.amount;
                                      })
                                    )
                                : "-"}
                            </p>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[10, 25, 100]}
              component="div"
              count={data.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onChangePage={handleChangePage}
              onChangeRowsPerPage={handleChangeRowsPerPage}
            />
          </Paper>
          <div className="biding-value-button">
            {/* the toggle button to see highest/lowest value in customers biding array */}
            <Button
              variant="contained"
              color="primary"
              onClick={bidingOriginal}
            >
              Biding Value
            </Button>
          </div>
        </>
      )}
    </>
  );
}
