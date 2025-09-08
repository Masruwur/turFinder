import { TurfPrice } from "../data/mockData";

export function getMinPrice(prices: TurfPrice[]): number {
    return Math.min(...prices.map(p => p.pricePerHour));
}