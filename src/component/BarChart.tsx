import { Box } from "@mui/material";
import { useState, useEffect } from "react";
import ReactApexChart from "react-apexcharts";
import type { ApexOptions } from "apexcharts";

type BarSeries = { name: string; data: number[] }[];

type Props = {
  height: number;
  showDataLabels: boolean;
  series: BarSeries;
  categories: string[];
};

const BarChart = ({ height, showDataLabels, series, categories }: Props) => {
  const [options, setOptions] = useState<ApexOptions>({
    chart: {
      type: "bar",
      toolbar: { show: false },
    },
    colors: ["#FF5733", "#3498DB", "#2ECC71", "#9B59B6"],
    xaxis: { categories },
    dataLabels: { enabled: showDataLabels },
  });

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setOptions((prev) => ({
      ...prev,
      xaxis: { categories },
      dataLabels: { enabled: showDataLabels },
    }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(categories), showDataLabels]);

  return (
    <Box>
      <ReactApexChart
        options={options}
        series={series}
        type="bar"
        height={height}
      />
    </Box>
  );
};

export default BarChart;