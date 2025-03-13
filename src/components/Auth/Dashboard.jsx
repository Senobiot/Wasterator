import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectCurrentUser } from "../../selectors/selectors";
import { logOff, uploadAvatar } from "../../reducers";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { ROUTES } from "../../constants/constants";
import styles from "./Dashboard.module.scss";
import { bufferToBase64Url, processImage } from "../../utils/utils";
import DashboardFields from "../../dtos/dashbord-fields";

const Dashboard = () => {
  const loggedUser = useSelector(selectCurrentUser);
  console.log(loggedUser);
  const fields = Object.entries(new DashboardFields(loggedUser));
  const [avatar, setAvatar] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleAvatarChange = async (file) => {
    if (file && file.type.startsWith("image/")) {
      try {
        const processedImage = await processImage(file);
        dispatch(uploadAvatar(processedImage));
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
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith("image/")) {
      handleAvatarChange(file);
    }
  };

  const handleClick = () => dispatch(logOff());

  const handleAvatarClick = () => {
    fileInputRef.current.click();
  };

  useEffect(() => {
    if (!loggedUser) {
      return navigate(ROUTES.PAGE.LOGIN);
    }

    setAvatar(bufferToBase64Url(loggedUser.avatar));
    console.log("setAvatar");
  }, [loggedUser, navigate]);

  return !loggedUser ? (
    <div>Загрузка данных...</div>
  ) : (
    <div className={styles.container}>
      <h2 className={styles.title}>Добро пожаловать, {loggedUser.name}!</h2>

      <div
        className={styles.avatar}
        onClick={handleAvatarClick}
        onDragEnter={handleDragEnter}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <img
          src={avatar || `/avatar-${loggedUser.gender || "male"}.svg`}
          alt="Avatar"
          className={styles.avatarImage}
        />
        <div className={styles.avatarOverlay}>
          <span>Change Avatar</span>
        </div>
        {isDragging && (
          <div
            className={`${styles.dropZone} ${isDragging ? styles.dragActive : ""}`}
          >
            Drop image here
          </div>
        )}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={(e) => handleAvatarChange(e.target.files[0])}
          className={styles.avatarInput}
        />
      </div>

      <div className={styles.fields}>
        {fields.map(([key, value]) => (
          <div key={key} className={styles.field}>
            <strong>{key}:</strong>
            <br />
            {value}
          </div>
        ))}
      </div>
      <button className={styles.button} onClick={handleClick}>
        Выйти
      </button>
    </div>
  );
};

export default Dashboard;
