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
import { pseudoMask } from "../../themes";

export default function AvatarEditor({ avatar, variant, exit }) {
  const { default: initial, round, square } = AVATAR_VARIANTS;
  const [isDragging, setIsDragging] = useState(false);
  const [newAvatar, setNewAvatar] = useState(avatar);
  const fileInputRef = useRef(null);
  const [newVariant, setNewVariant] = useState(variant);
  const dispatch = useDispatch();

  const handleAvatarChange = async (file) => {
    if (file?.type.startsWith("image/")) {
      try {
        const processedImage = await processImage(file);
        const reader = new FileReader();
        reader.onload = () => setNewAvatar(reader.result);
        reader.readAsDataURL(processedImage);
      } catch (error) {
        console.error("Error processing image:", error);
      }
    }
  };
  const handleSave = async () => {
    try {
      dispatch(
        uploadAvatar({ avatar: { url: newAvatar, variant: newVariant } })
      );
      exit();
    } catch (error) {
      console.error("Error updating avatar:", error);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDragEnter = (e) => {
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    if (e.target === e.currentTarget) {
      setIsDragging(false);
    }
  };

  const handleCancel = () => {
    setNewAvatar(avatar);
    setNewVariant(variant);
  };

  const handleDelete = () => {
    setNewAvatar("");
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);

    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith("image/")) {
      console.log(file.type);
      handleAvatarChange(file);
    }
  };

  return (
    <Card
      sx={{
        display: "flex",
        backgroundColor: colorMain.medium,
        position: "relative",
      }}
    >
      <Avatar
        onDragEnter={handleDragEnter}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={isDragging ? "mask" : ""}
        sx={{
          width: 170,
          height: 170,
          userDrag: "none",
          position: "relative",
          "&.mask:before": pseudoMask,
          ":hover:before": pseudoMask,
        }}
        variant={newVariant}
        alt=""
        src={newAvatar}
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
            {newAvatar !== avatar || newVariant !== variant ? (
              <Button
                variant="contained"
                sx={{ backgroundColor: colorMain.dark }}
                onClick={handleSave}
              >
                Save
              </Button>
            ) : (
              <Button
                variant="contained"
                sx={{ backgroundColor: colorMain.dark }}
                onClick={exit}
              >
                Exit
              </Button>
            )}
          </CardActions>
          <Typography component="div" variant="caption">
            Select FILE or DRAG to avatar
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
              onClick={handleDelete}
            >
              Delete
            </Button>
          </CardActions>
        </CardContent>
      </Box>
    </Card>
  );
}
