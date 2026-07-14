import { ReactNode } from "react";

export interface Column<T> {
  /**
   * Property name from the row.
   * Optional so custom columns (Actions) are supported.
   */
  key?: keyof T;

  /**
   * Header displayed in the table.
   */
  header: string;

  /**
   * Custom cell renderer.
   */
  render?: (row: T) => ReactNode;

  /**
   * Optional width.
   */
  width?: string;

  /**
   * Text alignment.
   */
  align?: "left" | "center" | "right";
}
