import { ReactNode } from "react";
import { ChartItem } from "./chartItem";

export type ChartProps = {
  title: string;
  caption?: string;
  items: ChartItem[];
  footer?: ReactNode;
};