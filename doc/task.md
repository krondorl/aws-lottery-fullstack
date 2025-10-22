# Task: Lottery Sales and Payout Data Processor

### 1. The Goal

The primary goal is to **process raw, historical ticket sales and winning ticket data** to calculate the current jackpot amount, track total tickets sold per game, and summarize prize payouts, all for display in a dashboard.

### 2. PostgreSQL Database Structure

You'll need three main tables in your PostgreSQL database:

| Table Name | Purpose | Key Columns | Data Types |
| :--- | :--- | :--- | :--- |
| **`lottery_games`** | Stores core game information and the final calculated metrics. | `id` (PK), `name`, `ticket_price`, `initial_jackpot`, `current_jackpot` | `SERIAL`/`INT`, `TEXT`, `NUMERIC(5,2)`, `NUMERIC(12,2)`, `NUMERIC(12,2)` |
| **`sales_data_raw`** | Stores the unprocessed, line-item ticket sales records. | `id` (PK), `game_name` (FK), `tickets_sold`, `sale_date` | `SERIAL`/`INT`, `TEXT`, `INT`, `DATE` |
| **`payout_summary`** | Stores the aggregated, processed prize payout data. | `id` (PK), `game_name` (FK), `total_prizes_paid`, `last_payout_date` | `SERIAL`/`INT`, `TEXT`, `NUMERIC(12,2)`, `DATE` |

### 3. The Data Processing Tasks (TypeScript/Node.js Backend)

The core practice is implementing a backend service using **TypeScript** that performs the following two tasks based on a simple jackpot calculation rule (e.g., 50% of ticket sales go to the jackpot pool).

#### Task 3.1: Jackpot Update & Ticket Tally

1.  **Fetch Data:** Query the `lottery_games` table for all games (`initial_jackpot`, `ticket_price`).
2.  **Calculate Ticket Sales Revenue:** For each game, query the `sales_data_raw` table to find the **sum** of all `tickets_sold` since the last jackpot calculation.
3.  **Calculate Jackpot Contribution:**
    $$\text{revenue} = \sum \text{tickets\_sold} \times \text{ticket\_price}$$
    $$\text{contribution} = \text{revenue} \times 0.50 \quad \text{(Assuming 50% rule)}$$
4.  **Update Jackpot:** Calculate the `current_jackpot` using the formula:
    $$\text{current\_jackpot} = \text{initial\_jackpot} + \text{contribution}$$
5.  **Persistence:** Update the `current_jackpot` and also the **total tickets sold** (maybe add a column like `total_tickets_sold` to `lottery_games`) in the `lottery_games` table.

#### Task 3.2: Payout Aggregation

1.  **Setup/Mock Data:** You'll need a way to track payouts. For simplicity, you can either **mock a third raw table** called `payouts_raw` (with columns like `game_name`, `payout_amount`, `payout_date`) or simply **use a static list of hypothetical payouts** for the processing step. *Assuming a third raw table for true full-stack practice.*
2.  **Group and Aggregate:** Group the records in the (hypothetical) `payouts_raw` table by `game_name`.
3.  **Calculate Metrics:** For each game, calculate:
    * The total `SUM` of all `payout_amount`.
    * The `MAX` value of `payout_date` (the last prize paid).
4.  **Upsert:** Write the aggregated data (total prizes paid, last payout date) into the `payout_summary` table. Use an **UPSERT** operation to either **INSERT** a new record or **UPDATE** an existing one.

### 4. The React/TypeScript Frontend (Dashboard)

Build a single-page React component that interacts with your backend API to:

1.  **Display Game List:** Fetch data from the **`lottery_games`** table (`name`, `ticket_price`, `current_jackpot`, `total_tickets_sold`).
2.  **Display Payout Summary:** Fetch data from the **`payout_summary`** table (`game_name`, `total_prizes_paid`, `last_payout_date`).
3.  **Combine & Present:** Display a single table or list that shows for each game:
    * **Game Name**
    * **Ticket Price**
    * **Current Jackpot**
    * **Total Tickets Sold** (from `lottery_games`)
    * **Total Prizes Paid** (from `payout_summary`)
    * **Date of Last Payout** (from `payout_summary`)
4.  **Interaction:** Add a simple button labeled **"Run Draw Day Processing"** that triggers the backend's data processing endpoint (Tasks 3.1 & 3.2). After the processing completes, the frontend should **automatically re-fetch and update** the dashboard data.

### 5. Key Skills Practiced

The skills practiced remain the same: **TypeScript** type definitions, advanced **PostgreSQL** queries (GROUP BY, SUM, UPSERT), **Backend** API creation, and **React** UI state management and data fetching.
