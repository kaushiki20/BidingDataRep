import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Main from "./Main";
import User from "./User";

export default function App() {
  return (
    <Router>
      <Switch>
        <Route
          path="/user/:id"
          component={(props) => <User {...props} />}
        ></Route>
        <Route path="/" component={(props) => <Main {...props} />}></Route>
      </Switch>
    </Router>
  );
}
