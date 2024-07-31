import { Upload } from "@mui/icons-material";
import { Box, Button, IconButton, TextField, InputLabel } from "@mui/material";
import { styled } from "@mui/material/styles";
import PropTypes from "prop-types";
import React, { useEffect, useRef, useState } from "react";
import { Trash } from "../icons/trash";

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
type UploadInputProps = {
  handleChange: (...args: any[]) => any;
  handleDelete: (...args: any[]) => any;
  value?: File | null | Blob;
  placeholder?: string;
  error?: boolean;
  helperText?: string | boolean;
  variant: "text" | "outlined" | "contained";
  [key: string]: any;
};
const UploadInput = (props: UploadInputProps) => {
  const fileInputRef: any = useRef();
  const { handleChange, handleDelete, value, placeholder } = props;
  const [file, setFile] = useState<any>(null);
  useEffect(() => {
    if (value) setFile(file);
  }, [value]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFile = event.target.files?.[0];
    handleChange(event);
    setFile(uploadedFile);
  };
  useEffect(() => {
    setFile(value);
  }, [value]);

  const handleDeleteFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    handleDelete();
    fileInputRef.current.value = "";
    setFile(null);
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "flex-start",
      }}
    >
      {
        <>
          {file ? (
            <Box
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <TextField
                error={props?.error}
                disabled
                helperText={props?.helperText}
                label="File name"
                value={file.name}
              />
              <IconButton
                component="button"
                color="error"
                onClick={handleDeleteFile as any}
              >
                <Trash />
                <VisuallyHiddenInput
                  onBlur={props.onBlur}
                  ref={fileInputRef}
                  type="file"
                  name={props.name || "file"}
                  onChange={handleFileChange}
                />
              </IconButton>
            </Box>
          ) : (
            <Box
              flexDirection={"column"}
              display="flex"
              justifyContent={"center"}
              alignItems={"flex-start"}
            >
              <Button
                component="label"
                style={{
                  display: `${"flex"}`,
                  justifyContent: "center",
                  alignItems: "center",
                }}
                role={"button"}
                variant={`${props?.variant || "text"}`}
                tabIndex={-1}
                startIcon={<Upload />}
              >
                {placeholder}{" "}
                <VisuallyHiddenInput
                  onBlur={props.onBlur}
                  ref={fileInputRef}
                  type="file"
                  name={props.name || "file"}
                  onChange={handleFileChange}
                />
              </Button>
              {props?.helperText && (
                <InputLabel
                  color="error"
                  style={{
                    marginTop: "10px",
                    color: "#922E2E",
                  }}
                >
                  {props?.helperText}
                </InputLabel>
              )}
            </Box>
          )}
        </>
      }
    </div>
  );
};
UploadInput.propTypes = {
  handleChange: PropTypes.func.isRequired,
  handleDelete: PropTypes.func,
  value: PropTypes.any,
  placeholder: PropTypes.string,
  name: PropTypes.string,
  helperText: PropTypes.any,
  error: PropTypes.any,
  variant: PropTypes.string,
};

export default UploadInput;
