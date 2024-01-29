import React from "react";

export interface TablePropsHeader<T> {
  headerName: string;
  column: keyof T;
}
export interface TableProps<T> {
  headers: TablePropsHeader<T>[];
  data: T[];
  idColumn: keyof T;
  onActionClick?: (id: string) => void;
  Icon?: React.ComponentType<any>;
}
const CustomTable: React.FC<TableProps<any>> = ({
  data,
  headers,
  onActionClick,
  idColumn,
  Icon,
}) => {
  return (
    <div className="table border-collapse table-auto w-full text-sm">
      <div className="table-header-group bg-white dark:bg-slate-800">
        <div className="table-row">
          {headers.map((h) => {
            return (
              <div className="table-cell max-h-[50px] border-b border-slate-600 font-medium p-4 pl-8 pt-3 pb-3 text-slate-400 text-slate-200 text-left">
                {h.headerName}
              </div>
            );
          })}
          {onActionClick ? (
            <div className="w-[50px] table-cell border-b border-slate-600 p-4 pl-8 text-slate-500 dark:text-slate-400"></div>
          ) : (
            <></>
          )}
        </div>
      </div>
      <div className="table-row-group bg-white dark:bg-slate-800">
        {data.map((r) => {
          return (
            <div className="table-row hover:bg-slate-600">
              {headers.map((h) => {
                return (
                  <div className="table-cell border-b border-slate-100 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400">
                    {r[h.column]}
                  </div>
                );
              })}

              {onActionClick ? (
                <div
                  onClick={() => {
                    onActionClick(r[idColumn]);
                  }}
                  className="w-[50px]  table-cell text-center border-b border-slate-100 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-100"
                >
                  {Icon ? (
                    <Icon className="w-6 h-6 cursor-pointer" />
                  ) : (
                    <div className="cursor-pointer">Delete</div>
                  )}
                </div>
              ) : (
                <></>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CustomTable;
