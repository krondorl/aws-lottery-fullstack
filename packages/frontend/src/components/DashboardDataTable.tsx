import type { JSX } from "react";
import { printVal } from "../helpers/printVal";
import type { DashboardData } from "../types/dashboard-data";

interface DashboardDataTableProps {
  dashboardData: DashboardData[];
}

export function DashboardDataTable({
  dashboardData,
}: DashboardDataTableProps): JSX.Element {
  if (dashboardData.length === 0) {
    return <div>Empty Dashboard data.</div>;
  } else {
    return (
      <table className="striped">
        <thead>
          <tr>
            <th>id</th>
            <th>name</th>
            <th>ticket price</th>
            <th>initial jackpot</th>
            <th>total tickets sold</th>
            <th>current jackpot</th>
            <th>total prizes paid</th>
            <th>last payout date</th>
          </tr>
        </thead>
        <tbody>
          {dashboardData.map((dashbData) => (
            <tr key={dashbData.id}>
              <td>{printVal(dashbData.id)}</td>
              <td>{printVal(dashbData.name)}</td>
              <td>{printVal(dashbData.ticket_price)}</td>
              <td>{printVal(dashbData.initial_jackpot)}</td>
              <td>{printVal(dashbData.total_tickets_sold)}</td>
              <td>{printVal(dashbData.current_jackpot)}</td>
              <td>{printVal(dashbData.total_prizes_paid)}</td>
              <td>{printVal(dashbData.last_payout_date)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}
