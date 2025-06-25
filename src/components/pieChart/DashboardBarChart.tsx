import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface ChartDataItem {
    name: string;
    SUCCESSFUL: number;
    DECLINED: number;
    amt?: number;
}

interface DashboardBarChartProps {
    data: ChartDataItem[];
    height?: number;
}

const DashboardBarChart: React.FC<DashboardBarChartProps> = ({ data, height = 100 }) => {
    return (
        <div style={{ width: '100%', height }} className="p-5 ">
            <ResponsiveContainer>
                <BarChart
                    data={data}
                    margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="SUCCESSFUL" fill="#16A34A" background={{ fill: '#eee' }} />
                    <Bar dataKey="DECLINED" fill="#DC2626" />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};

export default DashboardBarChart;
