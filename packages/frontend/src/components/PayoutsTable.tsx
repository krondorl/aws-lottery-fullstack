import type { JSX } from "react";
import type { Payout } from "../types/payout";
import { printVal } from "../helpers/printVal";

interface PayoutsTableProps {
  payouts: Payout[];
}

export function PayoutsTable({ payouts }: PayoutsTableProps): JSX.Element {
  if (payouts.length === 0) {
    return <div>Empty Payouts data.</div>;
  } else {
    return (
      <table className="striped">
        <thead>
          <tr>
            <th>id</th>
            <th>game name</th>
            <th>total prizes paid</th>
            <th>last payout date</th>
          </tr>
        </thead>
        <tbody>
          {payouts.map((payout) => (
            <tr key={payout.id}>
              <td>{printVal(payout.id)}</td>
              <td>{printVal(payout.game_name)}</td>
              <td>{printVal(payout.total_prizes_paid)}</td>
              <td>{printVal(payout.last_payout_date)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}
