import { useState, useEffect } from "react";
import type { ApexOptions } from "apexcharts";
import ReactApexChart from "react-apexcharts";
import { Box } from "@mui/material";

type LineSeries = { name: string; data: number[] }[];

type Props = {
  height: number;
  series: LineSeries;
  categories: string[];
};

const LineChart = ({ height, series, categories }: Props) => {
  const [options, setOptions] = useState<ApexOptions>({
    chart: {
      type: "line",
      toolbar: {
        show: false,
      },
    },
    xaxis: {
      categories,
    },
    stroke: {
      curve: "smooth",
    },
    colors: ["#4CAF50", "#2196F3", "#F44336"],
    dataLabels: {
      enabled: false,
    },
  });

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setOptions((prev) => ({
      ...prev,
      xaxis: { categories },
    }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(categories)]);

  return (
    <Box>
      <ReactApexChart
        options={options}
        series={series}
        type="line"
        height={height}
      />
    </Box>
  );
};

export default LineChart;