import React from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

export default function LineChartByState({ data }) {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="state" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="cases" stroke="#8884d8" />
        <Line type="monotone" dataKey="active" stroke="#82ca9d" />
        <Line type="monotone" dataKey="deaths" stroke="#ff6b6b" />
      </LineChart>
    </ResponsiveContainer>
  );
}
