import { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Alert,
  Link as MuiLink,
  useTheme,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../supabase/Client";
import { tokens } from "../theme";

const Register = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignup = async () => {
  setError(null);
  setSuccessMsg(null);

  if (!email || !password) {
    setError("Please fill in all fields");
    return;
  }

  setLoading(true);

  const { data, error: signupError } =
    await supabase.auth.signUp({
      email,
      password,
    });

  if (signupError) {
    setError(signupError.message);
    setLoading(false);
    return;
  }

  if (data.user) {
    const { error: insertError } =
      await supabase.from("profiles").insert({
        id: data.user.id,
        email,
        name,
        role: "user",
      });

    if (insertError) {
      setError(insertError.message);
      setLoading(false);
      return;
    }
  }

  setLoading(false);

  if (!data.session) {
    setSuccessMsg(
      "Account created successfully. Please check your email to confirm your account before logging in."
    );
    return;
  }

  navigate("/");
};

  return (
    <Box
      sx={{
        maxWidth: 400,
        mx: "auto",
        mt: 10,
        display: "flex",
        flexDirection: "column",
        gap: 2,
      }}
    >
      <Typography variant="h5">Create a new account </Typography>

      {error && <Alert severity="error">{error}</Alert>}
      {successMsg && <Alert severity="success">{successMsg}</Alert>}
      <TextField
        label="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <TextField
        label="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <TextField
        label="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <Button
        sx={{ background: colors.blueAccent[400] }}
        variant="contained"
        onClick={handleSignup}
        disabled={loading}
      >
        {loading ? "Creating account ..." : "Create an account "}
      </Button>

      <Typography variant="body2">
        Already have an account?{" "}
        <MuiLink
          sx={{ color: colors.greenAccent[400] }}
          component={Link}
          to="/login"
        >
          Log in
        </MuiLink>
      </Typography>
    </Box>
  );
};

export default Register;
