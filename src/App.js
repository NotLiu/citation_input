import "./App.css";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
  Link,
} from "react-router-dom";
import Questions from "./components/Questions";
import Test from "./components/test";

function App() {
  return (
    <Router>
      <div>
        <div id="nav-bar">
          <div id="nav-name">
            <a href="/">FORMS</a>
          </div>
          <ul id="nav">
            <li>
              <Link to="/" id="about-but">
                QUESTIONS
              </Link>
            </li>
            <li>
              <Link to="/other" id="about-but">
                OTHER FORMS
              </Link>
            </li>
          </ul>
        </div>
        <Switch>
          <Route exact path="/">
            <Questions />
          </Route>
          <Route exact path="/other">
            <Test />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
