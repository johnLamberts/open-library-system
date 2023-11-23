import { useTheme } from "@/context/ThemeProvider";
import { Line, LineChart, ResponsiveContainer } from "recharts";

const data = [
  {
    revenue: 10400,
    subscription: 240,
  },
  {
    revenue: 14405,
    subscription: 300,
  },
  {
    revenue: 9400,
    subscription: 200,
  },
  {
    revenue: 8200,
    subscription: 278,
  },
  {
    revenue: 7000,
    subscription: 189,
  },
  {
    revenue: 9600,
    subscription: 239,
  },
  {
    revenue: 11244,
    subscription: 278,
  },
  {
    revenue: 26475,
    subscription: 189,
  },
];

export default function OverviewLine() {
  const { theme: mode } = useTheme();
  return (
    <>
      <div className="text-2xl font-bold">$15,231.89</div>
      <p className="text-xs text-muted-foreground">+20.1% from last month</p>
      <div className="h-[80px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{
              top: 5,
              right: 10,
              left: 10,
              bottom: 0,
            }}
          >
            <Line
              type="monotone"
              strokeWidth={2}
              dataKey="revenue"
              activeDot={{
                r: 6,
                style: { fill: "var(--theme-primary)", opacity: 0.25 },
              }}
              //   style={
              //     {
              //       stroke: "var(--theme-primary)",
              //       "--theme-primary": `hsl(${
              //         theme?.cssVars[mode === "dark" ? "dark" : "light"].primary
              //       })`,
              //     } as React.CSSProperties
              //   }
              stroke={`${mode === "dark" ? "#fff" : "#000"}`}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </>
  );
}
