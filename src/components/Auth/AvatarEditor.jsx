import React, { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { uploadAvatar, changeAvatar } from "../../reducers";
import { bufferToBase64Url, processImage } from "../../utils/utils";
import {
  Avatar,
  FormControl,
  FormControlLabel,
  Alert,
  Radio,
  RadioGroup,
} from "@mui/material";
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { colorMain } from "../../themes/palettes";
import { AVATAR_VARIANTS } from "../../constants/constants";

export default function AvatarEditor({ avatar, variant, handleChange }) {
  const { default: initial, round, square } = AVATAR_VARIANTS;
  const [isDragging, setIsDragging] = useState(false);
  const [newAvatar, setNewAvatar] = useState(avatar);
  const fileInputRef = useRef(null);
  const [newVariant, setNewVariant] = useState(variant);
  const dispatch = useDispatch();

  const handleAvatarChange = async (file) => {
    console.log("asdasd");
    if (file?.type.startsWith("image/")) {
      try {
        const reader = new FileReader();
        reader.onload = () => setNewAvatar(reader.result);
        reader.readAsDataURL(file);

        const processedImage = await processImage(file);

        //dispatch(changeAvatar);
        // dispatch(uploadAvatar(processedImage));
      } catch (error) {
        console.error("Error processing image:", error);
      }
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isDragging) {
      setIsDragging(true);
    }
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleCancel = () => {
    setNewAvatar(avatar);
    setNewVariant(variant);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const file = e.dataTransfer.files[0];
    console.log(file);
    if (file && file.type.startsWith("image/")) {
      console.log(file.type);
      handleAvatarChange(file);
    }
  };

  const handleAvatarClick = () => {
    fileInputRef.current.click();
  };

  return (
    <Card
      className={isDragging ? "mask" : ""}
      sx={{
        display: "flex",
        backgroundColor: colorMain.medium,
        position: "relative",
        "&.mask:before": {
          content: '"drop image here"',
          position: "absolute",
          display: "flex",
          alignItems: "center",
          textTransform: "uppercase",
          justifyContent: "center",
          zIndex: 10,
          width: "100%",
          height: "100%",
          background: "rgba(0,0,0,0.5)",
          color: "white",
        },
      }}
      onDragEnter={handleDragEnter}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <Avatar
        sx={{
          width: 170,
          height: 170,
        }}
        variant={newVariant}
        alt=""
        src={newAvatar || avatar}
      />
      <Box
        sx={{
          textAlign: "left",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <CardContent
          sx={{
            "&:last-child": { paddingBottom: 1 },
          }}
        >
          <FormControl
            // defaultValue={variant}
            onChange={(e) => {
              setNewVariant(e.target.value);
            }}
          >
            <RadioGroup row value={newVariant}>
              <FormControlLabel
                value={round}
                control={<Radio />}
                label={round}
              />
              <FormControlLabel
                value={square}
                control={<Radio />}
                label={square}
              />
            </RadioGroup>
          </FormControl>
          <CardActions sx={{ paddingLeft: 0 }}>
            <Button variant="contained" component="label">
              Select file
              <input
                type="file"
                hidden
                accept="image/*"
                onChange={(e) => handleAvatarChange(e.target.files[0])}
                ref={fileInputRef}
              />
            </Button>
            <Button
              variant="contained"
              sx={{ backgroundColor: colorMain.dark }}
              onClick={handleChange}
            >
              {newAvatar !== avatar || newVariant !== variant ? "Save" : "Exit"}
            </Button>
          </CardActions>
          <Typography component="div" variant="caption">
            Select FILE or DRAG here
          </Typography>
          <CardActions sx={{ padding: "2px 0 0" }}>
            <Button
              size="small"
              variant="contained"
              sx={{ backgroundColor: colorMain.dark }}
              onClick={handleCancel}
            >
              Cancel
            </Button>
            <Button
              size="small"
              variant="contained"
              sx={{ backgroundColor: colorMain.dark }}
            >
              Delete
            </Button>
          </CardActions>
        </CardContent>
      </Box>
    </Card>
  );
}
