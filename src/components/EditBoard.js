import { Edit, OtherHouses } from "@mui/icons-material";
import {
  Button,
  Card,
  Dialog,
  Divider,
  InputLabel,
  OutlinedInput,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { useAtom } from "jotai";
import React, { useState, useEffect, useRef } from "react";
import { AlertPopupData, Refresh, RowChangeData } from "./data/Atom";
import { Editor } from "@tinymce/tinymce-react";

export const EditBoard = (props) => {
  const [refresh, setRefresh] = useAtom(Refresh);
  const [rowChangeData, setRowChangeData] = useAtom(RowChangeData);
  const editorRef = useRef(null);
  const [alertPopupData, setAlertPopupData] = useAtom(AlertPopupData);

  const onClickAddUpd = () => {
    let row = JSON.parse(localStorage.getItem("row"));

    if (
      !row
        .map((items) => {
          return items.title === rowChangeData.title;
        })
        .includes(true)
    ) {
      if (props.type === "ADD") {
        row.push(rowChangeData);
        localStorage.removeItem("row");
        localStorage.setItem("row", JSON.stringify(row));
        setAlertPopupData({
          ...alertPopupData,
          msg: rowChangeData.title + "가 추가되었습니다.",
          open: true,
          rightCallback: () => {
            setAlertPopupData({ ...alertPopupData, open: false });
            setRefresh(!refresh);
            props.onCloseAddit();
          },
        });
      } else {
        const updRow = row.map((item) => {
          return item.id === rowChangeData.id ? rowChangeData : item;
        });
        localStorage.removeItem("row");
        localStorage.setItem("row", JSON.stringify(updRow));
        setRefresh(!refresh);

        setAlertPopupData({
          ...alertPopupData,
          msg: rowChangeData.title + "가 변경되었습니다.",
          open: true,
          rightCallback: () => {
            setAlertPopupData({ ...alertPopupData, open: false });
            setRefresh(!refresh);
            props.onCloseAddit();
          },
        });
      }
    } else {
      setAlertPopupData({
        ...alertPopupData,
        msg: "Title이 중복되었습니다.",
        open: true,
        rightCallback: () => {
          setAlertPopupData({ ...alertPopupData, open: false });
        },
      });
    }
  };

  const rows = JSON.parse(localStorage.getItem("row"));

  useEffect(() => {
    if (props.type === "ADD") {
      setRowChangeData({ ...rowChangeData, id: rows[rows.length - 1].id + 1 });
    }
  }, []);

  return (
    <Dialog open={props.open} onClose={props.onCloseAddit}>
      <Card
        sx={{
          width: "500px",
          overflow: "scroll",
          "::-webkit-scrollbar": {
            width: "2px",
          },
          marginBottom: "0",
          padding: "0",
        }}
      >
        <Box>
          <Typography
            sx={{
              padding: "20px",
              fontSize: "16px",
              fontFamily: "NotoSansBold",
              alignContent: "center",
              textAlign: "center",
            }}
          >
            {props.type === "ADD" ? "EditBoard" : "UpdBoard"}
          </Typography>
        </Box>
        <Divider />
        <Box sx={{ padding: "20px" }}>
          <InputLabel>Title</InputLabel>
          <OutlinedInput
            sx={{ marginTop: "10px", width: "100%", height: "50px" }}
            value={rowChangeData.title}
            onChange={(e) => {
              setRowChangeData({ ...rowChangeData, title: e.target.value });
            }}
          />
          <InputLabel sx={{ marginTop: "15px" }}>User</InputLabel>
          <OutlinedInput
            value={rowChangeData.user}
            sx={{ marginTop: "10px", width: "100%", height: "50px" }}
            readOnly
          />
          <InputLabel sx={{ marginTop: "15px" }}>Description</InputLabel>
          <Box sx={{ marginTop: "10px" }} />
          <Editor
            onInit={(evt, editor) => (editorRef.current = editor)}
            onEditorChange={(e, v) => {
              setRowChangeData({ ...rowChangeData, description: e });
            }}
            apiKey="bpu3h00xk10rw9yr1we1pn726jvlyj96te1xvt21mo9l6fmq"
            value={rowChangeData.description}
            init={{
              height: 385,
              menubar: false,
              plugins: "image code",
              toolbar: "link image",
              /* enable title field in the Image dialog*/
              image_title: false,
              /* enable automatic uploads of images represented by blob or data URIs*/
              automatic_uploads: false,
              /*
                      URL of our upload handler (for more details check: https://www.tiny.cloud/docs/configure/file-image-upload/#images_upload_url)
                      images_upload_url: 'postAcceptor.php',
                      here we add custom filepicker only to Image dialog
                    */
              file_picker_types: "image",
              image_advtab: false,
              selector: "textarea#file-picker",
              /* and here's our custom image picker*/
              file_picker_callback: function(cb, value, meta) {
                var input = document.createElement("input");
                input.setAttribute("type", "file");
                input.setAttribute("accept", "image/*");

                input.onchange = function() {
                  var file = this.files[0];

                  var reader = new FileReader();
                  reader.onload = function() {
                    var id = "blobid" + new Date().getTime();
                    var blobCache =
                      window.tinymce.activeEditor.editorUpload.blobCache;
                    var base64 = reader.result.split(",")[1];
                    var blobInfo = blobCache.create(id, file, base64);
                    blobCache.add(blobInfo);

                    /* call the callback and populate the Title field with the file name */
                    cb(blobInfo.blobUri(), { title: file.name });
                  };
                  reader.readAsDataURL(file);
                };

                input.click();
              },

              content_style:
                "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
            }}
          />
        </Box>
        <Divider />
        <Box sx={{ padding: "20px 20px 0 20px" }}>
          <Box sx={{ width: "30%", marginLeft: "35%" }}>
            <Button
              sx={{
                color: "#284ad5",
                border: "1px solid #284ad5",
                fontSize: "14px",
                height: "35px",
                ":hover": {
                  backgroundColor: "transparent",
                },
              }}
              onClick={props.onCloseAddit}
            >
              취소
            </Button>

            <Button
              sx={{
                color: "white",
                backgroundColor: "#284ad5",
                marginLeft: "5px",

                fontSize: "14px",
                height: "35px",
                ":hover": {
                  backgroundColor: "#284ad5",
                },
              }}
              onClick={onClickAddUpd}
            >
              등록
            </Button>
          </Box>
        </Box>
      </Card>
    </Dialog>
  );
};
