import React from "react";
import { Transaction } from "../utils/api";
import {
  calculateMonthlySpending,
  calculateFinancialSummary,
} from "../utils/calculations";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

interface ChartsProps {
  transactions: Transaction[];
}

const COLORS = [
  "#0088FE",
  "#00C49F",
  "#FFBB28",
  "#FF8042",
  "#8884d8",
  "#82ca9d",
  "#ffc658",
];

const Charts: React.FC<ChartsProps> = ({ transactions }) => {
  if (transactions.length === 0) {
    return (
      <p className="text-center text-gray-500 mt-4">No chart data available.</p>
    );
  }

  const monthlySpendingData = calculateMonthlySpending(transactions);
  const { categorySpending } = calculateFinancialSummary(transactions);

  const pieChartData = Object.entries(categorySpending).map(
    ([category, amount]) => ({
      name: category,
      value: amount,
    }),
  );

  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-lg p-4 mt-4">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">
        Financial Charts
      </h2>

      <div className="mb-8">
        <h3 className="text-lg font-medium text-gray-700 mb-2">
          Monthly Expenses
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart
            data={monthlySpendingData}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="expenses" fill="#8884d8" name="Expenses" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div>
        <h3 className="text-lg font-medium text-gray-700 mb-2">
          Category Distribution (Expenses)
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={pieChartData}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
              label={({ name, percent }) =>
                `${name} ${((percent ?? 0) * 100).toFixed(0)}%`
              }
            >
              {pieChartData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Charts;
