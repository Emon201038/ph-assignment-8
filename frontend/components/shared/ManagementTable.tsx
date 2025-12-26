"use client";
import { Edit, Eye, Loader2, MoreHorizontal, Trash } from "lucide-react";
import { ReactNode, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { set } from "zod";

export interface IColumn<T> {
  header: string;
  accessor: keyof T | ((row: T) => ReactNode);
  className?: string;
}

interface IManagementTableProps<T> {
  data: T[];
  columns: IColumn<T>[];
  onView?: (row: T) => void;
  onEdit?: (row: T) => void;
  onDelete?: (row: T) => void;
  getRowKey?: (row: T) => string;
  emptyMessage?: string;
  isRefreshing?: boolean;
}

function ManagementTable<T>({
  data,
  columns = [],
  emptyMessage = "No records found",
  getRowKey,
  isRefreshing = false,
  onDelete,
  onEdit,
  onView,
}: IManagementTableProps<T>) {
  const hasActions = onView || onEdit || onDelete;

  return (
    <>
      <div className="rounded-lg border relative">
        {isRefreshing && (
          <div className="absoulte inset-0 bg-background/50 backdrop-blur-[2px] flex justify-center items-center z-10 rounded-lg">
            <div className="flex flex-col items-center gap-2">
              <Loader2 className="size-6 animate-spin text-primary" />
              <p className="text-sm text-muted-foreground">Refreshing...</p>
            </div>
          </div>
        )}

        <Table>
          <TableHeader>
            <TableRow>
              {columns.map((column, colIndex) => (
                <TableHead key={colIndex} className={column.className}>
                  {column.header}
                </TableHead>
              ))}
              {hasActions && <TableHead className="w-17.5">Actions</TableHead>}
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={columns.length + (hasActions ? 1 : 0)}
                  className="text-center py-8 text-muted-foreground"
                >
                  {emptyMessage}
                </TableCell>
              </TableRow>
            ) : (
              data?.map((row, rowIndex) => {
                const [openDropdown, setOpenDropdown] = useState(false);
                return (
                  <TableRow key={rowIndex}>
                    {columns.map((cell, cellIdx) => (
                      <TableCell key={cellIdx} className={cell.className}>
                        {typeof cell.accessor === "function"
                          ? cell.accessor(row)
                          : String(row[cell.accessor])}
                      </TableCell>
                    ))}
                    {hasActions && (
                      <TableCell>
                        <DropdownMenu
                          open={openDropdown}
                          onOpenChange={setOpenDropdown}
                        >
                          <DropdownMenuTrigger asChild>
                            <Button variant={"ghost"} size={"icon"}>
                              <MoreHorizontal className="size-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            {onView && (
                              <DropdownMenuItem
                                onClick={() => {
                                  onView(row);
                                  setOpenDropdown(false);
                                }}
                              >
                                <Eye className="mr-2 size-4" />
                                View
                              </DropdownMenuItem>
                            )}
                            {onEdit && (
                              <DropdownMenuItem
                                onClick={() => {
                                  onEdit(row);
                                  setOpenDropdown(false);
                                }}
                              >
                                <Edit className="mr-2 size-4" />
                                Edit
                              </DropdownMenuItem>
                            )}
                            {onDelete && (
                              <DropdownMenuItem
                                onClick={() => {
                                  onDelete(row);
                                  setOpenDropdown(false);
                                }}
                              >
                                <Trash className="mr-2 size-4" />
                                Delete
                              </DropdownMenuItem>
                            )}
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    )}
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </div>
    </>
  );
}

export default ManagementTable;
