import { Component } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router,Route } from "react-router-dom";
import Main from './Router';

class Index extends Component {
    render() {
        return (
           <Router>
                <Route component={Main}/>
           </Router>
        );
    }
}

ReactDOM.render(<Index />, document.getElementById("index"));
