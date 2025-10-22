import {
  useQuery,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { getDashboardData, getGames, getPayouts } from "./services/apiClient";
import "./App.css";
import { GamesTable } from "./components/GamesTable";
import { PayoutsTable } from "./components/PayoutsTable";
import { DashboardDataTable } from "./components/DashboardDataTable";

const queryClient = new QueryClient();

function App() {
  const games = useQuery(
    { queryKey: ["games"], queryFn: getGames },
    queryClient
  );
  const payouts = useQuery(
    { queryKey: ["payouts"], queryFn: getPayouts },
    queryClient
  );
  const dashboardData = useQuery(
    { queryKey: ["dashboard_data"], queryFn: getDashboardData },
    queryClient
  );

  return (
    <QueryClientProvider client={queryClient}>
      <>
        <header className="container">
          <hgroup>
            <h1>AWS Lottery Fullstack</h1>
            <p>Example using React, Nest.js, Postgres and SST.</p>
          </hgroup>
        </header>
        <main className="container">
          <section>
            <h2>Games</h2>
            {games.isLoading && <p>Loading games...</p>}
            {games.error && <p>Error loading games</p>}
            {games.data && <GamesTable games={games.data} />}
          </section>
          <section>
            <h2>Payouts</h2>
            {payouts.isLoading && <p>Loading payouts...</p>}
            {payouts.error && <p>Error loading payouts</p>}
            {payouts.data && <PayoutsTable payouts={payouts.data} />}
          </section>
          <section>
            <h2>Dashboard Data</h2>
            {dashboardData.isLoading && <p>Loading payouts...</p>}
            {dashboardData.error && <p>Error loading payouts</p>}
            {dashboardData.data && (
              <DashboardDataTable dashboardData={dashboardData.data} />
            )}
          </section>
        </main>
      </>
    </QueryClientProvider>
  );
}

export default App;
