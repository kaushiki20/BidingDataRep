import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { indexRoutes } from "./Utils/Constant";

export default function App() {
  return (
    <Router>
      <Switch>
        {indexRoutes.map((prop, key) => {
          return (
            <Route
              path={prop.path}
              key={key}
              component={prop.component}
              exact
            />
          );
        })}
      </Switch>
    </Router>
  );
}
