import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import Header from "../component/Header";
import LineChart from "../component/LineChart";
import { supabase } from "../supabase/Client";

type InvoiceRow = {
  cost: number;
  date: string; 
  invoice_type: string;
};

const Line = () => {
  const [series, setSeries] = useState<{ name: string; data: number[] }[]>(
    []
  );
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      const { data, error } = await supabase
        .from("invoices")
        .select("cost, date, invoice_type");

      if (error) {
        console.log(error);
        return;
      }

      const rows = (data ?? []) as InvoiceRow[];

      const monthKey = (dateStr: string) => dateStr.slice(0, 7);

      const uniqueMonths = Array.from(
        new Set(rows.map((row) => monthKey(row.date)))
      ).sort();

      const uniqueTypes = Array.from(
        new Set(rows.map((row) => row.invoice_type))
      );

      const builtSeries = uniqueTypes.map((type) => {
        const dataForType = uniqueMonths.map((month) => {
          const total = rows
            .filter(
              (row) =>
                monthKey(row.date) === month && row.invoice_type === type
            )
            .reduce((sum, row) => sum + Number(row.cost), 0);
          return total;
        });

        return { name: type, data: dataForType };
      });

      if (!cancelled) {
        setSeries(builtSeries);
        setCategories(uniqueMonths);
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
        <Header title="Line Chart" subtitle="Invoice Cost Trend by Month & Type" />
      </Box>

      {!loading && (
        <LineChart height={400} series={series} categories={categories} />
      )}
    </Box>
  );
};

export default Line;