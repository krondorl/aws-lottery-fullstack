import type { JSX } from "react";
import { printVal } from "../helpers/printVal";
import type { Game } from "../types/game";

interface GamesTableProps {
  games: Game[];
}

export function GamesTable({ games }: GamesTableProps): JSX.Element {
  if (games.length === 0) {
    return <div>Empty Games data.</div>;
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
          </tr>
        </thead>
        <tbody>
          {games.map((game) => (
            <tr key={game.id}>
              <td>{printVal(game.id)}</td>
              <td>{printVal(game.name)}</td>
              <td>{printVal(game.ticket_price)}</td>
              <td>{printVal(game.initial_jackpot)}</td>
              <td>{printVal(game.total_tickets_sold)}</td>
              <td>{printVal(game.current_jackpot)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}
