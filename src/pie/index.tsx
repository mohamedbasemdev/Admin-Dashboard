import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import Header from "../component/Header";
import PieChart from "../component/PieChart";
import { supabase } from "../supabase/Client";

type InvoiceRow = {
  cost: number;
  invoice_type: string;
};

const Pie = () => {
  const [series, setSeries] = useState<number[]>([]);
  const [labels, setLabels] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      const { data, error } = await supabase
        .from("invoices")
        .select("cost, invoice_type");

      if (error) {
        console.log(error);
        return;
      }

      const rows = (data ?? []) as InvoiceRow[];

      const uniqueTypes = Array.from(
        new Set(rows.map((row) => row.invoice_type))
      );

      const builtSeries = uniqueTypes.map((type) =>
        rows
          .filter((row) => row.invoice_type === type)
          .reduce((sum, row) => sum + Number(row.cost), 0)
      );

      if (!cancelled) {
        setLabels(uniqueTypes);
        setSeries(builtSeries);
        setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <Box>
      <Box className="px-3">
        <Header title="Pie Chart" subtitle="Invoice Cost by Type" />
      </Box>
      <Box className="flex justify-center items-center w-full pt-10">
        {!loading && <PieChart series={series} labels={labels} />}
      </Box>
    </Box>
  );
};

export default Pie;