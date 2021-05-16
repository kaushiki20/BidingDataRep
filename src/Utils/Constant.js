import { makeStyles } from "@material-ui/core/styles";
import Main from "../Views/Main";
import User from "../Views/User";
export const columns = [
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

export const useStyles = makeStyles({
  root: {
    width: "100%",
  },
  container: {
    maxHeight: 600,
  },
});

export const indexRoutes = [
  { path: "/", name: "Home", component: Main },
  { path: "/user/:id", name: "user", component: User },
];
