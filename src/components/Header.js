import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Drawer,
  IconButton,
  List,
  ListItem,
  MenuItem,
  OutlinedInput,
  Select,
  Typography,
} from "@mui/material";
import { useAtom } from "jotai";
import { AlertPopupData, MyRow, SearchStatus } from "./data/Atom";
import { useNavigate } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import { AlertPopup } from "./AlertPopup";

export const Header = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(false);
  const [openDrawer, setOpenDrawer] = useState(false);
  const [alertPopupData, setAlertPopupData] = useAtom(AlertPopupData);
  const [myRow, setMyRow] = useAtom(MyRow);

  useEffect(() => {
    if (localStorage.getItem("isLogin")) {
      setIsLogin(true);
    } else {
      setIsLogin(false);
    }
  }, []);

  return (
    <>
      <Box
        sx={{
          width: "100%",
          maxHeight: "80px",
          backgroundColor: "#FFFFFF",
          opacity: "1",
          justifyContent: "space-between",
          fontFamily: "NotoSansMedium",
        }}
        boxShadow="2"
      >
        <AlertPopup />
        <Drawer
          open={openDrawer}
          onClose={() => {
            setOpenDrawer(false);
          }}
        >
          <List sx={{ marginTop: "5%", marginLeft: "30px", width: "300px" }}>
            <ListItem>
              <IconButton
                sx={{
                  height: "80px",
                  marginLeft: "50px",
                  ":hover": { backgroundColor: "transparent" },
                }}
              >
                <MenuOpenIcon
                  onClick={() => {
                    setOpenDrawer(false);
                  }}
                  sx={{ width: "40px", height: "30px", margin: "10px" }}
                />
                <Typography sx={{ marignLeft: "30px", color: "#000000" }}>
                  Home
                </Typography>
              </IconButton>
            </ListItem>
            <ListItem
              onClick={() => {
                navigate("/");
                setMyRow(false);
              }}
              sx={{ cursor: "pointer" }}
            >
              글목록
            </ListItem>
            {localStorage.getItem("isLogin") && (
              <ListItem
                onClick={() => {
                  setMyRow(true);
                  setOpenDrawer(false);
                }}
                sx={{ cursor: "pointer" }}
              >
                내가 쓴 글
              </ListItem>
            )}
            <ListItem
              onClick={() => {
                navigate("/");
                setMyRow(false);
              }}
              sx={{ cursor: "pointer" }}
            >
              공지사항
            </ListItem>
            {isLogin ? (
              <ListItem
                onClick={() => {
                  setAlertPopupData({
                    ...alertPopupData,
                    open: true,
                    msg: "로그아웃 되었습니다.",
                    rightCallback: () => {
                      localStorage.removeItem("isLogin");
                      setIsLogin(false);
                      setAlertPopupData({ ...alertPopupData, open: false });
                    },
                  });
                }}
                sx={{ cursor: "pointer" }}
              >
                로그아웃
              </ListItem>
            ) : (
              <>
                <ListItem
                  onClick={() => {
                    navigate("/signup");
                  }}
                  sx={{ cursor: "pointer" }}
                >
                  회원가입
                </ListItem>
                <ListItem
                  onClick={() => {
                    navigate("/login");
                  }}
                  sx={{ cursor: "pointer" }}
                >
                  로그인
                </ListItem>
              </>
            )}
          </List>
        </Drawer>
        <IconButton
          sx={{
            height: "80px",
            marginLeft: "50px",
            ":hover": { backgroundColor: "transparent" },
          }}
        >
          <MenuIcon
            onClick={() => {
              setOpenDrawer(true);
            }}
            sx={{ width: "40px", height: "30px", margin: "10px" }}
          />
        </IconButton>

        <Button
          sx={{
            marignLeft: "5px",
            color: "#000000",
            fontSize: "14px",
            fontFamily: "NotoSansKRBold",
          }}
          onClick={() => {
            setMyRow(false);
            navigate("/");
          }}
        >
          Blog
        </Button>
        {!isLogin ? (
          <>
            <Button
              sx={{
                marginLeft: "70%",
                color: "#000000",
                justifyContent: "flex-end",
              }}
              onClick={() => {
                navigate("/signup");
              }}
            >
              회원가입
            </Button>
            <Button
              sx={{
                marginLeft: "25px",
                color: "#000000",
                justifyContent: "flex-end",
              }}
              onClick={() => {
                navigate("/login");
              }}
            >
              로그인
            </Button>
          </>
        ) : (
          <Button
            sx={{
              marginLeft: "70%",
              color: "#000000",
              justifyContent: "flex-end",
            }}
            onClick={() => {
              setAlertPopupData({
                ...alertPopupData,
                open: true,
                msg: "로그아웃 되었습니다.",
                rightCallback: () => {
                  localStorage.removeItem("isLogin");
                  setIsLogin(false);
                  setAlertPopupData({ ...alertPopupData, open: false });
                },
              });
            }}
          >
            로그아웃
          </Button>
        )}
      </Box>
    </>
  );
};
