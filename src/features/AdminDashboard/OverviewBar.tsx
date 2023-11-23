import { useTheme } from "@/context/ThemeProvider";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";

const data = [
  {
    name: "Jan",
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "Feb",
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "Mar",
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "Apr",
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "May",
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "Jun",
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "Jul",
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "Aug",
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "Sep",
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "Oct",
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "Nov",
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "Dec",
    total: Math.floor(Math.random() * 5000) + 1000,
  },
];

export default function OverviewBar() {
  const { theme: mode } = useTheme();
  return (
    <>
      <ResponsiveContainer width={"100%"} height={350}>
        <BarChart data={data}>
          <XAxis
            dataKey={"name"}
            stroke="#888888"
            fontSize={12}
            tickLine={false}
            axisLine={false}
          />

          <YAxis
            stroke="#888888"
            fontSize={12}
            tickLine={false}
            axisLine={false}
            tickFormatter={(value) => `$${value}`}
          />

          {/* <div className="bg-red-700"> */}
          <Bar
            dataKey={"total"}
            // style={
            //   {
            //     //     fill: "var(--theme-primary)",
            //     fill: `${mode === "dark" ? "#000" : "#fff"}`,
            //     opacity: 1,
            //     //     backgroundColor: "var(--)"
            //     //     "--foreground": `hsl(${mode === "dark" ? "dark" : "light"})`,
            //   } as React.CSSProperties
            // }
            fill={`${mode === "dark" ? "#fff" : "#000"}`}
            opacity={`0.75`}
          />
          {/* </div> */}
        </BarChart>
      </ResponsiveContainer>
    </>
  );
}
