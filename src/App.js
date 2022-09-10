import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { QueryClientProvider, QueryClient } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import "./App.css";
import { HomePage } from "./components/Home.page";
import { RQSuperHeroesPage } from "./components/RQSuperHeroes.page";
import { SuperHeroesPage } from "./components/SuperHeroes.page";
import TabWithCustomQueryHook from "./components/TabWithCustomQueryHook";
import SuperHeroDetail from "./components/SuperHeroDetail";
import RQSuperHeroDetail from "./components/RQSuperHeroDetail";
import ParallelQueries from "./components/ParallelQueries";
import DynamicParallelPage from "./components/DynamicParallelPage";
import DependentQueries from "./components/DependentQueries";
import PaginatedQueries from "./components/PaginatedQueries";
import InfiniteQueries from "./components/InfiniteQueries";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <div>
          <nav>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/super-heroes">Traditional Super Heroes</Link>
              </li>
              <li>
                <Link to="/rq-super-heroes">RQ Super Heroes</Link>
              </li>
              <li>
                <Link to="/custom-query">Custom Query</Link>
              </li>
              <li>
                <Link to="/dynamic-parallel">Dynamic Parallel</Link>
              </li>
              <li>
                <Link to="/dependent-queries">Dependent Queries</Link>
              </li>
              <li>
                <Link to="/paginated-queries">Paginated Queries</Link>
              </li>
              <li>
                <Link to="/infinite-queries">Infinite Queries</Link>
              </li>
            </ul>
          </nav>
          <Switch>
            <Route path="/infinite-queries">
              <InfiniteQueries />
            </Route>
            <Route path="/paginated-queries">
              <PaginatedQueries />
            </Route>
            <Route path="/dependent-queries">
              <DependentQueries email="alvinacosta@gmail.com" />
            </Route>
            <Route path="/dynamic-parallel">
              <DynamicParallelPage heroIds={[1, 3]} />
            </Route>
            <Route path="/rq-parallel">
              <ParallelQueries />
            </Route>
            <Route path="/custom-query">
              <TabWithCustomQueryHook />
            </Route>
            <Route path="/super-heroes">
              <SuperHeroesPage />
            </Route>
            <Route path="/rq-super-heroes/:id">
              <RQSuperHeroDetail />
            </Route>
            <Route path="/rq-super-heroes">
              <RQSuperHeroesPage />
            </Route>
            <Route path="/:id">
              <SuperHeroDetail />
            </Route>
            <Route path="/">
              <HomePage />
            </Route>
          </Switch>
        </div>
      </Router>
      <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
    </QueryClientProvider>
  );
}

export default App;
