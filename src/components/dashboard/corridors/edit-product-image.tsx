import EditIcon from "@mui/icons-material/Edit";
import Box from "@mui/material/Box";
import ButtonBase from "@mui/material/ButtonBase";
import { styled, useTheme } from "@mui/material/styles";
import PropTypes from "prop-types";
import { useEffect, useRef, useState } from "react";
import { Image as ImageIcon } from "../../../icons/image";
import { palette } from "@mui/system";
import CenterFocusWeakIcon from "@mui/icons-material/CenterFocusWeak";
import { Tooltip } from "@mui/material";
const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  display: "none",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});
const ImageButton = styled(ButtonBase)(({ theme }) => ({
  position: "relative",
  height: "330px",
  margin: "auto",
  minHeight: "330px",
  width: "100%",
  maxWidth: "320px",
  borderRadius: "8px",

  [theme.breakpoints.down("sm")]: {
    width: "100% !important", // Overrides inline-style
    height: 100,
  },
  "&:hover .EditIcon": {
    backgroundColor: theme.palette.primary.light,
    transition: "background-color 0.5s ease",
  },
  "& .EditIcon": {
    transition: "background-color 0.5s ease",
  },
  "&, &.Mui-focusVisible": {
    zIndex: 1,
    "& .MuiImageBackdrop-root": {
      backgroundColor: "transparent",
    },
    "& .MuiImageMarked-root": {
      opacity: 0,
    },
    "& .MuiTypography-root": {
      border: "4px solid currentColor",
    },
    "& .MuiSvgIcon-root": {
      opacity: 1,
    },
  },
}));

const ImageSrc = styled("span")(({ theme }) => ({
  position: "absolute",
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  backgroundSize: "cover",
  backgroundPosition: "center 40%",
  borderRadius: "8px",
  backgroundColor: theme.palette.background.default,
}));

const Image = styled("span")(({ theme }) => ({
  position: "absolute",
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  // border: "0.5px solid",
  borderColor: theme.palette.grey,
  borderRadius: "10px",
  color: theme.palette.common.white,
}));

export default function EditProductImage(props) {
  const { handleChange, image } = props;

  const fileInputRef = useRef(null);
  const [file, setFile] = useState(null);
  const theme = useTheme();
  const handleFileChange = (event) => {
    const uploadedFile = event.target.files[0];
    handleChange(event);
    setFile(uploadedFile);
  };
  const onClik = () => {
    fileInputRef.current.click();
  };

  useEffect(() => {
    if (image) setFile(image);
  }, []);

  return (
    // <Tooltip title="Upload image">
    <Box
      sx={{
        borderRadius: "8px",
        height: "100%",
        maxHeight: "450px",
        width: "100%",
        margin: "auto",
        display: "flex",
        justifyContent: "center",
      }}
      p={4}
    >
      <Tooltip title="Upload image" placement="right-start">
        <ImageButton
          tabIndex={-1}
          focusRipple
          // key={image.title}
          onClick={onClik}
          role="button"
        >
          <VisuallyHiddenInput
            onBlur={props.onBlur}
            ref={fileInputRef}
            type="file"
            name={props.name || "file"}
            onChange={handleFileChange}
          />

          <ImageSrc
            style={{
              backgroundImage: `url(${image})`,
            }}
          />
          <Image>
            <CenterFocusWeakIcon
              className="EditIcon"
              sx={{
                position: "absolute",
                top: "10px",
                left: "10px",
                display: "flex",
                height: 25,
                width: 25,
                boxSizing: "content-box",
                p: 1,
                borderRadius: "8px",
              }}
            />
            {!image && <ImageIcon fontSize="large" />}
          </Image>
        </ImageButton>
      </Tooltip>
    </Box>
  );
}

EditProductImage.prototype = {
  handleChange: PropTypes.func.isRequired,
  image: PropTypes.object,
  name: PropTypes.string,
};
