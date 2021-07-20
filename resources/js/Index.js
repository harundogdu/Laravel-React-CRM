import { Component } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Main from "./Router";
import { Provider } from "mobx-react";
import Store from "./Store";
class Index extends Component {
    render() {
        return (
            <Provider {...Store}>
                <Router>
                    <Route component={Main} />
                </Router>
            </Provider>
        );
    }
}

ReactDOM.render(<Index />, document.getElementById("index"));
