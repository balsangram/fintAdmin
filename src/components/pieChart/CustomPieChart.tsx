import React from 'react';
import { PieChart, Pie, Cell } from 'recharts';

interface PieDataItem {
  name: string;
  value: number;
}

interface CustomPieChartProps {
  data: PieDataItem[];
  colors?: string[];
  width?: number;
  height?: number;
  innerRadius?: number;
  outerRadius?: number;
  layout?: 'horizontal' | 'double'; // optional for layout type
}

const CustomPieChart: React.FC<CustomPieChartProps> = ({
  data,
  // colors = ['#0088FE', '#FF8042', '#00C49F', '#FFBB28',],
  colors = [
  '#0088FE', // Blue
  '#00C49F', // Teal
  '#FFBB28', // Yellow
  '#FF8042', // Orange
  '#A28EFF', // Purple
  '#FF5E7E', // Pinkish Red
  '#00D8A7', // Mint Green
  '#FF6E40', // Coral
  '#36CFC9', // Cyan
  '#9E9E9E', // Gray
],

  width = 300,
  height = 350,
  innerRadius = 60,
  outerRadius = 80,
  layout = 'horizontal',
}) => {
  return (
    <PieChart width={width} height={height}>
      <Pie
        data={data}
        // cx={layout === 'horizontal' ? 200 : }
        cy={height / 2}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        paddingAngle={5}
        dataKey="value"
        label
      >
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
        ))}
      </Pie>

      {layout === 'double' && (
        <Pie
          data={data}
          cx={width - 200}
          cy={height / 2}
          startAngle={180}
          endAngle={0}
          innerRadius={innerRadius}
          outerRadius={outerRadius}
          paddingAngle={5}
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-double-${index}`} fill={colors[index % colors.length]} />
          ))}
        </Pie>
      )}
    </PieChart>
  );
};

export default CustomPieChart;
