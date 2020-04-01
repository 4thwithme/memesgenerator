import ReactDOM from "react-dom";

import "./index.css";
import * as serviceWorker from "./serviceWorker";
import ApolloProvider from "./ApolloProvider";
import "semantic-ui-css/semantic.min.css";

ReactDOM.render(ApolloProvider, document.getElementById("root"));

serviceWorker.unregister();
