You'll need a minimum of four API endpoints for your full-stack lottery application. They are primarily focused on fetching data for the dashboard and triggering the heavy data processing task.

***

## API Endpoint Specification (Lottery Processor)

| Verb | Endpoint | Description |
| :--- | :--- | :--- |
| **GET** | `/api/games` | Fetches the list of all **Lottery Games** and their current status (`name`, `ticket_price`, `current_jackpot`, `total_tickets_sold`). |
| **GET** | `/api/payouts` | Fetches the aggregated **Payout Summary** data (`game_name`, `total_prizes_paid`, `last_payout_date`). |
| **GET** | `/api/dashboard-data` | **(Recommended)** Fetches and combines the data from both `/api/games` and `/api/payouts` into a single object for the React dashboard to consume efficiently. |
| **POST** | `/api/process-data` | Triggers the **data processing task** (Task 3.1: Jackpot Update and Task 3.2: Payout Aggregation). This endpoint initiates the complex database operations and should return a status indicating success or failure. |

***

### Implementation Notes:

* **POST to Process:** Using a **POST** request for `/api/process-data` is standard practice for endpoints that change data on the server, even if it's only updating metrics based on existing raw data.
* **Data Flow:** The React frontend should first call `/api/dashboard-data` (or the individual GETs) on load. When the user clicks the "Run Draw Day Processing" button, it should send a request to the **POST** `/api/process-data` endpoint, and upon success, it should call the **GET** endpoint again to refresh the dashboard.
