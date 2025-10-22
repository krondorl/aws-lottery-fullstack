// apiClient.ts
import type { DashboardData } from "../types/dashboard-data";
import type { Game } from "../types/game";
import type { Payout } from "../types/payout";
import type { paths } from "./api";

const BASE_URL = "http://localhost:3000";

type ApiPaths = keyof paths;

const GAMES_PATH: ApiPaths = "/api/games";
const PAYOUT_PATH: ApiPaths = "/api/payouts";
const DASHBOARD_DATA_PATH: ApiPaths = "/api/dashboard-data";
const PROCESS_PATH: ApiPaths = "/api/process-data";

export async function getGames(): Promise<Game[]> {
  const url = `${BASE_URL}${GAMES_PATH}`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const games: Game[] = await response.json();
  return games;
}

export async function getPayouts(): Promise<Payout[]> {
  const url = `${BASE_URL}${PAYOUT_PATH}`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const payouts: Payout[] = await response.json();
  return payouts;
}

export async function getDashboardData(): Promise<DashboardData[]> {
  const url = `${BASE_URL}${DASHBOARD_DATA_PATH}`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const data: DashboardData[] = await response.json();
  return data;
}

export async function postProcessData(): Promise<void> {
  const url = `${BASE_URL}${PROCESS_PATH}`;
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
}
