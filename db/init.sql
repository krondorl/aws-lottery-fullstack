--
-- 1. DROP EXISTING TABLES (Safely)
--
DROP TABLE IF EXISTS sales_data_raw;
DROP TABLE IF EXISTS payouts_raw;
DROP TABLE IF EXISTS payout_summary;
DROP TABLE IF EXISTS lottery_games CASCADE;

--
-- 2. CREATE TABLES
--

-- Table: lottery_games
-- Stores core game info and will hold the FINAL calculated data (jackpot, total tickets sold)
CREATE TABLE lottery_games (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL UNIQUE,
    ticket_price NUMERIC(5, 2) NOT NULL, -- e.g., 2.00
    initial_jackpot NUMERIC(12, 2) NOT NULL, -- Base amount for the jackpot
    total_tickets_sold INT DEFAULT 0, -- To be updated by the processor
    current_jackpot NUMERIC(12, 2) NOT NULL -- To be updated by the processor
);

-- Table: sales_data_raw
-- Stores the unprocessed, line-item ticket sales records.
CREATE TABLE sales_data_raw (
    id SERIAL PRIMARY KEY,
    game_name TEXT NOT NULL,
    tickets_sold INT NOT NULL CHECK (tickets_sold > 0),
    sale_date DATE NOT NULL,
    -- Foreign Key constraint (ensure game_name exists in lottery_games)
    CONSTRAINT fk_game_name
        FOREIGN KEY (game_name)
        REFERENCES lottery_games (name)
        ON DELETE CASCADE
);

-- Table: payouts_raw
-- A new raw table to track individual prize payouts for aggregation.
CREATE TABLE payouts_raw (
    id SERIAL PRIMARY KEY,
    game_name TEXT NOT NULL,
    payout_amount NUMERIC(12, 2) NOT NULL CHECK (payout_amount > 0),
    payout_date DATE NOT NULL,
    -- Foreign Key constraint
    CONSTRAINT fk_game_name_payout
        FOREIGN KEY (game_name)
        REFERENCES lottery_games (name)
        ON DELETE CASCADE
);

-- Table: payout_summary
-- Stores the aggregated, processed prize payout metrics.
CREATE TABLE payout_summary (
    id SERIAL PRIMARY KEY,
    game_name TEXT NOT NULL UNIQUE,
    total_prizes_paid NUMERIC(12, 2) DEFAULT 0.00, -- To be updated by the processor
    last_payout_date DATE, -- To be updated by the processor
    -- Foreign Key constraint
    CONSTRAINT fk_game_name_summary
        FOREIGN KEY (game_name)
        REFERENCES lottery_games (name)
        ON DELETE CASCADE
);

--
-- 3. INSERT MOCK DATA
--

-- 3.1. Insert Games Data
INSERT INTO lottery_games (name, ticket_price, initial_jackpot, current_jackpot) VALUES
('Mega Ball 500', 5.00, 100000.00, 100000.00),
('Quick Draw', 1.00, 5000.00, 5000.00),
('Lucky Numbers', 2.50, 25000.00, 25000.00);


-- 3.2. Insert Raw Sales Data (Past 7 Days)
-- This is the data the processor will read and aggregate.
INSERT INTO sales_data_raw (game_name, tickets_sold, sale_date) VALUES
-- Mega Ball Sales
('Mega Ball 500', 500, '2025-10-06'),
('Mega Ball 500', 1200, '2025-10-07'),
('Mega Ball 500', 950, '2025-10-08'),
('Mega Ball 500', 2000, '2025-10-10'),

-- Quick Draw Sales
('Quick Draw', 3500, '2025-10-06'),
('Quick Draw', 4000, '2025-10-09'),
('Quick Draw', 6100, '2025-10-12'),

-- Lucky Numbers Sales
('Lucky Numbers', 800, '2025-10-07'),
('Lucky Numbers', 1500, '2025-10-11'),
('Lucky Numbers', 2200, '2025-10-13');


-- 3.3. Insert Raw Payouts Data (for aggregation)
-- This is the data the processor will read to summarize prizes paid.
INSERT INTO payouts_raw (game_name, payout_amount, payout_date) VALUES
-- Mega Ball Payouts
('Mega Ball 500', 500.00, '2025-10-06'),
('Mega Ball 500', 1000.00, '2025-10-06'),
('Mega Ball 500', 2500.00, '2025-10-08'),

-- Quick Draw Payouts
('Quick Draw', 10.00, '2025-10-07'),
('Quick Draw', 5.00, '2025-10-07'),
('Quick Draw', 100.00, '2025-10-10'),
('Quick Draw', 100.00, '2025-10-11'),

-- Lucky Numbers Payouts
('Lucky Numbers', 50.00, '2025-10-09');


--
-- 4. INITIAL VIEW OF DATA (Optional but helpful for verification)
--
SELECT * FROM lottery_games ORDER BY id;
SELECT * FROM sales_data_raw ORDER BY sale_date DESC;
SELECT * FROM payouts_raw ORDER BY payout_date DESC;
SELECT * FROM payout_summary; -- Should be empty before processor runs
