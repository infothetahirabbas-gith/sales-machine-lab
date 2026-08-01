import {
  Radar, RadarChart, PolarGrid, PolarAngleAxis,
  PieChart, Pie, Cell, ResponsiveContainer, Tooltip,
} from "recharts";

/**
 * Recharts is ~470 kB raw. It is only needed once an audit report exists, so
 * this module is loaded lazily from the audit route rather than shipped in the
 * route's initial chunk.
 */
type Props =
  | { kind: "radar"; data: Array<{ metric: string; value: number }> }
  | { kind: "pie"; data: Array<{ name: string; value: number; color: string }> };

export default function AuditCharts(props: Props) {
  if (props.kind === "radar") {
    return (
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart data={props.data} outerRadius="75%">
          <PolarGrid stroke="oklch(0.9 0.01 250)" />
          <PolarAngleAxis dataKey="metric" tick={{ fill: "oklch(0.16 0.02 250)", fontSize: 10, fontWeight: 600 }} />
          <Radar dataKey="value" stroke="oklch(0.65 0.18 245)" fill="oklch(0.65 0.18 245)" fillOpacity={0.35} strokeWidth={2} />
          <Tooltip contentStyle={{ borderRadius: 8, fontSize: 12 }} />
        </RadarChart>
      </ResponsiveContainer>
    );
  }

  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie data={props.data} dataKey="value" nameKey="name" innerRadius={45} outerRadius={80} paddingAngle={3}>
          {props.data.map((d) => <Cell key={d.name} fill={d.color} />)}
        </Pie>
        <Tooltip contentStyle={{ borderRadius: 8, fontSize: 12 }} />
      </PieChart>
    </ResponsiveContainer>
  );
}
