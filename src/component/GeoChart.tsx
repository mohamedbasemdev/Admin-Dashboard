import { Box } from "@mui/material";
import ApexMaps from "react-apexmaps";
import "apexmaps/apexmaps.css";

type GeoDataPoint = { name: string; value: number };

type Props = {
  height: number;
  show: boolean;
  data: GeoDataPoint[];
};

const GeoChart = ({ height, show, data }: Props) => {
  return (
    <Box>
      <ApexMaps
        options={{
          geo: {
            map: "world/countries@110m",
            view: {
              fit: [-180, -58, 180, 84],
              padding: 10,
            },
            sphere: {
              show: true,
              fill: "transparent",
              stroke: "transparent",
            },
          },
          legend: {
            title: "Country Value",
            align: "center",
            style: "gradient",
            marker: true,
            show,
          },
          dataLabels: {
            enabled: true,
            minFeatureArea: 700,
            formatter: ({ name }) => name ?? "",
            style: {
              fontSize: 10,
              fontWeight: 600,
              halo: true,
              haloWidth: 2.6,
            },
          },
        }}
        series={[
          {
            type: "choropleth",
            name: "Value",
            joinBy: "name",
            data,
            scale: { palette: "blues", classes: 5 },
          },
        ]}
        onFeatureClick={({ key }) => console.log(key)}
        height={height}
      />
    </Box>
  );
};

export default GeoChart;