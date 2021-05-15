import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import "./App.css";
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

export default function Main() {
  const classes = useStyles();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [sort, setSort] = useState(false);
  const [bid, setBid] = useState(false);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  let history = useHistory();
  useEffect(() => {
    fetch("https://intense-tor-76305.herokuapp.com/merchants", {
      method: "GET",
    })
      .then((response) => response.json())
      .then((json) => setData(json))
      .catch((error) => console.error("error:", error));
  }, []);
  useEffect(() => {
    if (data.length) {
      setLoading(false);
    }
  }, [data]);
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
    setSort(true);
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
                              <span onClick={descendingOrder}>
                                {" "}
                                <i class="material-icons">arrow_downward</i>
                              </span>
                              <span onClick={ascendingOrder}>
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

const columns = [
  { id: "Customer Name", label: "Customer Name", minWidth: 70 },
  {
    id: "Email",
    label: "Email",
    minWidth: 70,
    align: "right",
  },
  {
    id: "Phone",
    label: "Phone",
    minWidth: 70,
    align: "right",
  },
  {
    id: "Premium",
    label: "Premium",
    minWidth: 70,
    align: "right",
  },
  {
    id: "Bid",
    label: "Bid(Max/Min)",
    minWidth: 70,
    align: "right",
  },
];

const useStyles = makeStyles({
  root: {
    width: "100%",
  },
  container: {
    maxHeight: 600,
  },
});
