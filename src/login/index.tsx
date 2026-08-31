import { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Alert,
  Link as MuiLink,
  Divider,
  useTheme,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../supabase/Client";
import { tokens } from "../theme";

const DEMO_EMAIL = "demo@admin.com";
const DEMO_PASSWORD = "Demo1234";

const Login = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const doLogin = async (loginEmail: string, loginPassword: string) => {
    setError(null);
    setLoading(true);

    const { error } = await supabase.auth.signInWithPassword({
      email: loginEmail,
      password: loginPassword,
    });

    setLoading(false);

    if (error) {
      setError(error.message);
      return;
    }

    navigate("/");
  };

  const handleLogin = () => doLogin(email, password);
  const handleDemoLogin = () => doLogin(DEMO_EMAIL, DEMO_PASSWORD);

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
      <Typography variant="h5">Log in</Typography>

      {error && <Alert severity="error">{error}</Alert>}

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
        onClick={handleLogin}
        disabled={loading}
      >
        {loading ? " Logging in..." : "Log"}
      </Button>

      <Typography variant="body2">
        Don't have an account?{" "}
        <MuiLink
          sx={{ color: colors.greenAccent[400] }}
          component={Link}
          to="/signup"
        >
          Sign up
        </MuiLink>
      </Typography>

      <Divider sx={{ my: 1 }}>or</Divider>

      <Box
        sx={{
          p: 2,
          borderRadius: 2,
          border: "1px dashed",
          borderColor: "divider",
          textAlign: "center",
        }}
      >
        <Typography variant="body2" sx={{ mb: 1, fontWeight: "bold" }}>
          🔑 Want to test admin privileges?(Add / Edit / Delete)?
        </Typography>

        <Typography variant="caption" sx={{ display: "block", mb: 1.5 }}>
          Email: {DEMO_EMAIL} — Password: {DEMO_PASSWORD}
        </Typography>

        <Button
          variant="outlined"
          fullWidth
          onClick={handleDemoLogin}
          disabled={loading}
        >
          Login in as Demo Admin
        </Button>
      </Box>
    </Box>
  );
};

export default Login;
