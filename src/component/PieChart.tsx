import { Box, useMediaQuery } from "@mui/material";
import { useState, useEffect } from "react";
import ReactApexChart from "react-apexcharts";
import type { ApexOptions } from "apexcharts";

type Props = {
  series: number[];
  labels: string[];
};

const PieChart = ({ series, labels }: Props) => {
  const isMobile = useMediaQuery("(max-width: 600px)")
  const [state, setState] = useState<{
    series: number[];
    options: ApexOptions;
  }>({
    series,
    options: {
      chart: {
        width: 380,
        type: "donut",
      },
      plotOptions: {
        pie: {
          startAngle: -90,
          endAngle: 270,
        },
      },
      fill: {
        type: "gradient",
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200,
            },
            legend: {
              position: "bottom",
            },
          },
        },
      ],
      labels,
      dataLabels: {
        enabled: false,
      },
    },
  });

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setState((prev) => ({
      series,
      options: {
        ...prev.options,
        labels,
      },
    }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(series), JSON.stringify(labels)]);

  return (
    <Box>
      <ReactApexChart
        options={state.options}
        series={state.series}
        type="donut"
        width={isMobile? 350 : 480}
      />
    </Box>
  );
};

export default PieChart;