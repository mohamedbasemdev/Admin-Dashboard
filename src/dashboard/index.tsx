import EmailIcon from "@mui/icons-material/Email";
import PointOfSaleIcon from "@mui/icons-material/PointOfSale";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import TrafficIcon from '@mui/icons-material/Traffic';
import DowmloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import { Box, Button, Typography, useTheme } from "@mui/material";
import { useEffect, useState } from "react";
import StatBox from "../component/StatBox";
import { tokens } from "../theme";
import LineChart from "../component/LineChart";
import Header from "../component/Header";
import ProgressRecycle from "../component/ProgressRecycle";
import BarChart from "../component/BarChart";
import GeoChart from "../component/GeoChart";
import { supabase } from "../supabase/Client";

type InvoiceRow = {
  cost: number;
  date: string; 
  invoice_type: string;
};

type ContactRow = {
  country: string;
};

type Transaction = {
  id: number;
  name: string;
  date: string;
  cost: number;
};

const Dashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [lineSeries, setLineSeries] = useState<
    { name: string; data: number[] }[]
  >([]);
  const [lineCategories, setLineCategories] = useState<string[]>([]);

  const [barSeries, setBarSeries] = useState<
    { name: string; data: number[] }[]
  >([]);
  const [barCategories, setBarCategories] = useState<string[]>([]);

  const [geoData, setGeoData] = useState<{ name: string; value: number }[]>([]);

  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [totalRevenue, setTotalRevenue] = useState(0);

  const [loading, setLoading] = useState(true);


  useEffect(() => {
    let cancelled = false;

    (async () => {
      const { data: invoiceData, error: invoiceError } = await supabase
        .from("invoices")
        .select("id, name, cost, date, invoice_type")
        .order("date", { ascending: false });

      if (invoiceError) {
        console.log(invoiceError);
      }

      const rows = (invoiceData ?? []) as (InvoiceRow & {
        id: number;
        name: string;
      })[];

      const monthKey = (dateStr: string) => dateStr.slice(0, 7);

      const uniqueMonths = Array.from(
        new Set(rows.map((row) => monthKey(row.date)))
      ).sort();

      const uniqueTypes = Array.from(
        new Set(rows.map((row) => row.invoice_type))
      );

      const builtLineSeries = uniqueTypes.map((type) => ({
        name: type,
        data: uniqueMonths.map((month) =>
          rows
            .filter(
              (row) => monthKey(row.date) === month && row.invoice_type === type
            )
            .reduce((sum, row) => sum + Number(row.cost), 0)
        ),
      }));

      const builtBarSeries = uniqueTypes.map((type) => ({
        name: type,
        data: uniqueMonths.map((month) =>
          rows
            .filter(
              (row) => monthKey(row.date) === month && row.invoice_type === type
            )
            .reduce((sum, row) => sum + Number(row.cost), 0)
        ),
      }));

      const recentTransactions = rows.slice(0, 5).map((row) => ({
        id: row.id,
        name: row.name,
        date: row.date,
        cost: row.cost,
      }));

      const total = rows.reduce((sum, row) => sum + Number(row.cost), 0);

      const { data: contactData, error: contactError } = await supabase
        .from("contacts")
        .select("country");

      if (contactError) {
        console.log(contactError);
      }

      const contactRows = (contactData ?? []) as ContactRow[];
      const validRows = contactRows.filter((row) => row.country);
      const uniqueCountries = Array.from(
        new Set(validRows.map((row) => row.country))
      );
      const builtGeoData = uniqueCountries.map((country) => ({
        name: country,
        value: validRows.filter((row) => row.country === country).length,
      }));

      if (!cancelled) {
        setLineSeries(builtLineSeries);
        setLineCategories(uniqueMonths);
        setBarSeries(builtBarSeries);
        setBarCategories(uniqueMonths);
        setTransactions(recentTransactions);
        setTotalRevenue(total);
        setGeoData(builtGeoData);
        setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <Box sx={{ width: "98%", m: "auto" }}>
      <Box className="flex items-center justify-between">
        <Header title={"DASHBOARD"} subtitle={"Welcome to Your Dashboard"} />
        <Button sx={{ background: colors.redAccent[600], color: "#fff" }}>
          <DowmloadOutlinedIcon /> DOWNLOAD REPORTS
        </Button>
      </Box>
      <Box className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        <Box>
          <StatBox
            progress={0.7}
            icon={<EmailIcon sx={{ color: colors.greenAccent[400] }} />}
            title="12.578"
            subtitle="Emails Sent"
            increase="+15%"
          />
        </Box>
        <Box>
          <StatBox
            progress={0.3}
            icon={<PointOfSaleIcon sx={{ color: colors.greenAccent[400] }} />}
            title="435.255"
            subtitle="Sales Obtained"
            increase="+23%"
          />
        </Box>
        <Box>
          <StatBox
            progress={0.5}
            icon={<PersonAddIcon sx={{ color: colors.greenAccent[400] }} />}
            title="52.447"
            subtitle="New Clients"
            increase="+4%"
          />
        </Box>
        <Box>
          <StatBox
            progress={0.9}
            icon={<TrafficIcon sx={{ color: colors.greenAccent[400] }} />}
            title="1.555.687"
            subtitle="Traffic Inbound"
            increase="+47%"
          />
        </Box>
      </Box>
      <Box className="grid grid-cols-1 lg:grid-cols-3 gap-3 my-4">
        <Box
          className="lg:col-span-2"
          sx={{ background: colors.primary[400], height: "270px", p:'10px' }}
        >
          <Typography variant="h6">
            Revenu Genereted
          </Typography>
          <Typography variant="h6">
            ${totalRevenue.toLocaleString()}
          </Typography>

          {!loading && (
            <LineChart
              height={200}
              series={lineSeries}
              categories={lineCategories}
            />
          )}
        </Box>
          <Box  sx={{ background: colors.primary[400],height: "270px", overflow: "auto", p:'10px' }}>
          <Typography className="pb-2" variant="h6">
            Recent Transactions
          </Typography>

          {transactions.map((transaction) => (
            <Box
              key={transaction.id}
              className="flex items-center gap-3 py-4"
              sx={{
                borderTop: `2px solid ${colors.primary[600]}`,
              }}
            >
              {/* ID + Name */}
              <Box sx={{ width: "120px", flexShrink: 0 }}>
                <Typography
                  sx={{
                    color: colors.blueAccent[400],
                    fontSize: "16px",
                  }}
                  variant="h6"
                >
                  TX-{transaction.id}
                </Typography>

                <Typography
                  sx={{
                    fontSize: "10px",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {transaction.name}
                </Typography>
              </Box>

              {/* Date */}
              <Box sx={{ flex: 1, mr: "20px" }}>
                <Typography
                  sx={{
                    color: colors.grey[200],
                    fontSize: "13px",
                    textAlign: "center",
                  }}
                >
                  {transaction.date}
                </Typography>
              </Box>

              {/* Cost */}
              <Box
                className="flex items-center justify-center px-3 py-2"
                sx={{
                  background: colors.greenAccent[500],
                  borderRadius: "8px",
                  color: "#fff",
                  whiteSpace: "nowrap",
                }}
              >
                ${transaction.cost}
              </Box>
            </Box>
          ))}
        </Box>
      </Box>
      <Box className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 my-4">
        <Box sx={{ background: colors.primary[400], p: "10px" }}>
          <Typography variant="h6">Campaing</Typography>
          <Box className="text-center pt-5">
            <Box className="flex items-center justify-center">
              <ProgressRecycle progress={0.7} size={90} />
            </Box>
            <Typography
              sx={{ color: colors.greenAccent[400], mt: "10px" }}
              variant="h6"
            >
              $50.588.641
            </Typography>
            <Typography variant="h6">Lorem ipsum dolor sit amet.</Typography>
          </Box>
        </Box>
        <Box sx={{ background: colors.primary[400], p: "10px" }}>
          <Typography variant="h6">Sales Quentity</Typography>
          {!loading && (
            <BarChart
              height={200}
              showDataLabels={false}
              series={barSeries}
              categories={barCategories}
            />
          )}
        </Box>
        <Box sx={{ background: colors.primary[400], p: "10px" }}>
          <Typography variant="h6">Geography Traffic</Typography>
          {!loading && <GeoChart height={200} show={false} data={geoData} />}
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
