import React from "react";
import { DataGrid } from "@material-ui/data-grid";
import { makeStyles } from "@material-ui/core/styles";
import "./style.scss";

const useStyles = makeStyles((theme) => ({
  dataTable: {
    fontSize: "1.6rem",
  },
  headTable: {
    fontWeight: "bold",
    fontSize: "1.8rem",
  },
}));

function DataTable({ rows, columns, style = useStyles }) {
  const classes = style();
  return (
    <div className="data-table">
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={10}
        className={classes.dataTable}
      />
    </div>
  );
}

export default DataTable;
