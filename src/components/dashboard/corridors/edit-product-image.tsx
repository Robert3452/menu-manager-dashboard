import { I } from "@/utils/generalObj";
import CenterFocusWeakIcon from "@mui/icons-material/CenterFocusWeak";
import { Tooltip } from "@mui/material";
import Box from "@mui/material/Box";
import ButtonBase from "@mui/material/ButtonBase";
import { styled } from "@mui/material/styles";
import { useEffect, useRef, useState } from "react";
import { Image as ImageIcon } from "../../../icons/image";
const breakpoints: I = {
  xs: "120px",
  sm: "170px",
  md: "250px",
  lg: "330px",
};
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
  margin: "auto",
  borderRadius: "8px",

  [theme.breakpoints.down("sm")]: {
    width: "90% !important", // Overrides inline-style
    height: 250,
    margin: "auto",
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
  backgroundColor: theme.palette.grey[700],
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
  borderColor: theme.palette.grey[300],
  borderRadius: "10px",
  color: theme.palette.common.white,
}));

export default function EditProductImage(props: any) {
  const { handleChange, image, size } = props;

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState(null);

  

  function handleFileChange(event: any) {
    const uploadedFile = event.target.files[0];
    handleChange(event);
    setFile(uploadedFile);
  }

  const onClick = () => {
    if (fileInputRef?.current) fileInputRef.current.click();
  };

  useEffect(() => {
    if (image) setFile(image);
  }, [image]);

  return (
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
    >
      <Tooltip title="Upload image" placement="right-start">
        <ImageButton
          tabIndex={-1}
          focusRipple
          onClick={onClick}
          sx={{
            height: breakpoints?.[size] || breakpoints.lg,
            width: breakpoints?.[size] || breakpoints.lg,
          }}
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

// EditProductImage.propTypes = {
//   handleChange: PropTypes.func.isRequired,
//   image: PropTypes.string,
//   name: PropTypes.string,
//   onBlur: PropTypes.func,
// };
