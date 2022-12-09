import { Box, Button, Divider, Typography } from "@mui/material";
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarFilterButton,
  GridToolbarDensitySelector,
  GridToolbarExport,
} from "@mui/x-data-grid";
import { useAtom } from "jotai";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AlertPopupData, MyRow, Row, RowChangeData } from "./data/Atom";
import { EditBoard } from "./EditBoard";

export const Board = () => {
  const [row, setRow] = useAtom(Row);
  const [updId, setUpdId] = useState("");
  const [pageSize, setPageSize] = useState(10);
  const [alertPopupData, setAlertPopupData] = useAtom(AlertPopupData);
  const [openAddit, setOpenAddit] = useState(false);
  const [, setRowChangeData] = useAtom(RowChangeData);
  const [type, setType] = useState("ADD");
  const navigate = useNavigate();
  const [myRow, setMyRow] = useAtom(MyRow);

  useEffect(() => {
    if (localStorage.getItem("row")) {
      if (myRow) {
        setRow(
          JSON.parse(localStorage.getItem("row")).filter(
            (e) =>
              e.user === JSON.parse(localStorage.getItem("isLogin")).userName
          )
        );
      } else {
        setRow(JSON.parse(localStorage.getItem("row")));
      }
    }
  }, [localStorage.getItem("row"), myRow]);

  const columns = [
    {
      field: "id",
      headerName: "ID",
      width: 100,
      align: "center",
      headerAlign: "center",
      headerClassName: "super-app-theme--header",
    },
    {
      field: "title",
      headerName: "Title",
      headerAlign: "center",
      width: 300,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "user",
      headerName: "User",
      headerAlign: "center",
      width: 200,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "button",
      headerName: "Update",
      width: 120,
      align: "center",
      headerAlign: "center",
      headerClassName: "super-app-theme--header",
      renderCell: (param) => (
        <Button
          sx={{ height: "60px", backgroundColor: "#2a84d" }}
          onClick={() => {
            setRowChangeData(param.row);
            setType("UPD");
            setOpenAddit(true);
          }}
        >
          수정
        </Button>
      ),
    },
  ];

  const onClickCell = (row) => {
    if (row.field !== "button") {
      navigate("/details", { state: { id: row.id } });
    }
  };

  return (
    <Box
      sx={{
        width: "100%",
        backgroundColor: "#F4F5F7",
        marginTop: "80px",
        marginBottom: "120px",
      }}
    >
      <Typography
        sx={{
          width: "100%",
          textAlign: "center",
          fontSize: "18px",
          marginBottom: "100px",
          fontFamily: "NotoSansKRBold",
        }}
      >
        {myRow ? "내가 쓴 글" : "게시판"}
      </Typography>
      <EditBoard
        open={openAddit}
        type={type}
        onCloseAddit={() => {
          setOpenAddit(false);
        }}
      />
      <Box sx={{ width: "70%", marginLeft: "15%" }}>
        <DataGrid
          columns={columns}
          rows={row}
          onPageSizeChange={(e) => {
            setPageSize(e);
          }}
          pageSize={pageSize}
          rowsPerPageOptions={[10, 20, 30]}
          key={row.map((i) => i.id)}
          sx={{
            height: "700px",
            backgroundColor: "white",
            borderRadius: "6px",
          }}
          onCellClick={onClickCell}
          onCellDoubleClick={() => {}}
          components={{
            Toolbar: () => (
              <>
                <GridToolbarContainer
                  sx={{
                    float: "right",
                    margin: "3px",
                  }}
                >
                  <GridToolbarFilterButton />
                  <GridToolbarDensitySelector />
                  <GridToolbarExport />
                  <Button
                    onClick={() => {
                      setRowChangeData({
                        id: localStorage.getItem("row")
                          ? row[row.length - 1].id + 1
                          : 1,
                        title: "",
                        user: localStorage.getItem("isLogin")
                          ? JSON.parse(localStorage.getItem("isLogin")).userName
                          : "Guest",
                        description: "",
                      });
                      setOpenAddit(true);
                    }}
                  >
                    등록
                  </Button>
                </GridToolbarContainer>
              </>
            ),
          }}
        />
      </Box>
    </Box>
  );
};
