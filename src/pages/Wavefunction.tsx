import React from "react";
import { useState } from "react";
// === UI Components ===
import {
  Grid,
  Box,
  Button,
  Stack,
  Select,
  MenuItem,
  SelectChangeEvent,
  Alert,
  Snackbar,
  InputLabel,
  FormControl,
} from "@mui/material";
// === Components ===
import {
  VerticalMenu,
  CustomDescriptionBox,
  CustomPageHeader,
  CustomTitle,
} from "../components";
// === styles ===
const sidebar_style = {
  backgroundColor: "#333333",
  height: "100vh",
  minHeight: "100vh",
};
const select_style = { backgroundColor: "#FFFFFF" };
const img_style = {
  borderRadius: "10px",
  boxShadow: "0 0 5px -1px rgba(0,0,0,0.2)",
  width: "100%",
};
const horizontal_center = {
  display: "flex",
  // alignItems: "center",  # vertical center
  justifyContent: "center",
};

const Wavefunction = () => {
  // === state ===
  const [mass, setMass] = useState("");
  const [velocity, setVelocity] = useState("");
  const [wavefunction_img1, set_Wavefunction_Img1] = useState(
    "./model_images/wavefunction/wave_1x1.gif"
  );
  const [wavefunction_img2, set_Wavefunction_Img2] = useState(
    "./model_images/wavefunction/wave_density_1x1.gif"
  );
  const [success_msg, set_Success_Msg] = useState(
    "Wavefunction with mass = 1 & velocity = 10 generated!"
  );
  const [description_msg, set_Description_Msg] = useState(
    "Example Description Msg"
  );
  const [open, setOpen] = useState(false);

  // === handle functions ===
  const handleClose = (
    event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    // function to close the snackbar
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };
  const handleMass = (event: SelectChangeEvent) => {
    setMass(event.target.value as string);
    console.log(event.target.value);
  };
  const handleVelocity = (event: SelectChangeEvent) => {
    setVelocity(event.target.value as string);
    console.log(event.target.value);
  };
  function handleSubmit(event: any) {
    event.preventDefault();
    let mass_str = mass.toString();
    let velocity_str = velocity.toString();
    console.log("mass:", mass_str);
    console.log("velocity:", velocity_str);

    let wave_img1_path =
      "./model_images/wavefunction/wave_" +
      mass_str +
      "x" +
      velocity_str +
      ".gif";
    let wave_img2_path =
      "./model_images/wavefunction/wave_density_" +
      mass_str +
      "x" +
      velocity_str +
      ".gif";

    console.log(wave_img1_path);
    console.log(wave_img2_path);
    set_Wavefunction_Img1(wave_img1_path);
    set_Wavefunction_Img2(wave_img2_path);
    set_Success_Msg(
      "Wavefunction with mass = " +
        mass_str +
        " & velocity = " +
        velocity_str +
        " generated!"
    );
    set_Description_Msg("Example Description Msg");
    setOpen(true);
  }

  // === return ===
  return (
    <div>
      <Grid container spacing={2}>
        {/* ================== left col ================== */}
        <Grid item xs={3} style={sidebar_style}>
          <div>
            <div style={horizontal_center}>
              <CustomTitle />
            </div>
            <Box
              component="form"
              sx={{
                "& > :not(style)": { m: 1, width: "25ch" },
              }}
              noValidate
              autoComplete="off"
              style={horizontal_center}
            >
              <Stack spacing={3}>
                {/* selects */}
                <FormControl fullWidth variant="filled">
                  <InputLabel id="mass-label">Mass</InputLabel>
                  <Select
                    labelId="mass-label"
                    id="mass-label-select"
                    value={mass}
                    label="Mass"
                    onChange={handleMass}
                    defaultValue={"1"}
                    style={select_style}
                  >
                    <MenuItem value={1}>1</MenuItem>
                    <MenuItem value={5}>5</MenuItem>
                    <MenuItem value={10}>10</MenuItem>
                  </Select>
                </FormControl>
                <FormControl fullWidth variant="filled">
                  <InputLabel id="velocity-label">Velocity</InputLabel>
                  <Select
                    labelId="velocity-label"
                    id="velocity-select"
                    value={velocity}
                    label="Test"
                    onChange={handleVelocity}
                    defaultValue={"10"}
                    style={select_style}
                  >
                    <MenuItem value={1}>1</MenuItem>
                    <MenuItem value={5}>5</MenuItem>
                    <MenuItem value={10}>10</MenuItem>
                  </Select>
                </FormControl>

                {/* submit button */}
                <Button
                  variant="contained"
                  onClick={handleSubmit}
                  type="submit"
                >
                  Generate Model
                </Button>

                <VerticalMenu />

                <Snackbar
                  open={open}
                  autoHideDuration={6000}
                  onClose={handleClose}
                >
                  <Alert
                    onClose={handleClose}
                    severity="success"
                    sx={{ width: "100%" }}
                  >
                    {success_msg}
                  </Alert>
                </Snackbar>
              </Stack>
            </Box>
          </div>
        </Grid>

        {/* ================== right col ================== */}
        <Grid item xs={8}>
          <CustomPageHeader text="Wavefunction" size="h3" />

          <img src={wavefunction_img1} alt="wave function" style={img_style} />
          <img src={wavefunction_img2} alt="wave function" style={img_style} />
          <CustomDescriptionBox msg={description_msg} />
        </Grid>
      </Grid>
    </div>
  );
};

export default Wavefunction;
