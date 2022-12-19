import React, { useEffect } from "react";
import { Box } from "@mui/material";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { Board } from "./Board";
import { useAtom } from "jotai";
import { Row } from "./data/Atom";

const data = [
  { id: 1, title: "의정부 빨간세상 라면학교", user: "1212", description: "해물라면, 김밥, 만두" },
  { id: 2, title: "망원동 일등식당", user: "2323", description: "해장국 전문점" },
  {
    id: 3,
    title: "원평동",
    user: "dlaguswns12",
    description: "잔치국수, 칼국수, 찹살 수제비",
  },
  {
    id: 4,
    title: "동구 물레방아",
    user: "guswns112",
    description: "한치보쌈, 한치회무침, 한치회국수, 우거지탕",
  },
  {
    id: 5,
    title: "부산진구 원조범일동매떡",
    user: "guswnszns",
    description: "김밥, 팥빙수, 핫바, 떡볶이",
  },
  {
    id: 6,
    title: "마포구 다락투",
    user: "dkflzkxh",
    description: "닭곰탕, 닭칼국수",
  },
];

export const Index = () => {
  useEffect(() => {
    if (!Boolean(localStorage.getItem("row"))) {
      localStorage.setItem("row", JSON.stringify(data));
    }
  }, []);

  return (
    <>
      <Box sx={{ width: "100%", height: "100%", backgroundColor: "#F4F5F7" }}>
        <Header />
        <Board />
        <Footer />
      </Box>
    </>
  );
};
