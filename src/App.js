import React,{Suspense} from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Layout from "./components/layout/Layout";
import AllQuotes from "./pages/AllQuotes.";
import QuoteDetail from "./pages/QuoteDetail";
import NewQuote from "./pages/NewQuote";
import NotFoundPage from "./pages/NotFoundPage";
import LoadingSpinner from "./components/UI/LoadingSpinner";

// const AllQuotes = React.lazy(() => import('./pagesAllQuotes'))
// const NewQuote = React.lazy(() =>import('./pages/NewQuote'))
// const QuoteDetail = React.lazy(() => import('./pages/QuoteDetail'))
// const NotFoundPage = React.lazy(() =>import('./pages/NotFoundPage'))

function App() {
  return (
    <Layout>
      <Suspense fallback={<div className="centered"><LoadingSpinner/></div>}>
      <Switch>
        <Route path='/' exact>
            <Redirect to='/quotes'/>
        </Route>
        <Route path='/quotes' exact>
          <AllQuotes />
        </Route>
        <Route path='/quotes/:quoteId'>
          <QuoteDetail />
        </Route>
        <Route path='/new-quote'>
          <NewQuote />
        </Route>
        <Route path='*'>
          <NotFoundPage/>
        </Route>
      </Switch>
      </Suspense>
      
    </Layout>

  );
}

export default App;
