import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import Header from "../component/Header";
import GeoChart from "../component/GeoChart";
import { supabase } from "../supabase/Client";

type ContactRow = {
  country: string;
};

const Geography = () => {
  const [data, setData] = useState<{ name: string; value: number }[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      const { data: rows, error } = await supabase
        .from("contacts")
        .select("country");

      if (error) {
        console.log(error);
        return;
      }

      const contactRows = (rows ?? []) as ContactRow[];

      const validRows = contactRows.filter((row) => row.country)

      const uniqueCountries = Array.from(
        new Set(validRows.map((row) => row.country))
      );

      const builtData = uniqueCountries.map((country) => ({
        name: country,
        value: validRows.filter((row) => row.country === country).length,
      }));

      if (!cancelled) {
        setData(builtData);
        setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <Box sx={{ width: "98%", height: 380, m: "auto" }}>
      <Header title="Geography Chart" subtitle="Contacts Distribution by Country" />

      {!loading && <GeoChart height={300} show={true} data={data} />}
    </Box>
  );
};

export default Geography;