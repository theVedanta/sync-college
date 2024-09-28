"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    Area,
    AreaChart,
    CartesianGrid,
    XAxis,
    YAxis,
    Tooltip,
} from "recharts";
import {
    ChartConfig,
    ChartContainer,
    // ChartLegend,
    // ChartLegendContent,
} from "@/components/ui/chart";

interface VitalsCardProps {
    title: string;
    subtitle: string;
    description: string;
    value: number;
    color: string;
}

const VitalsCard: React.FC<VitalsCardProps> = ({
    title,
    subtitle,
    // description,
    value,
    color,
}) => {
    const generateRandomData = (baseValue: number) => {
        const data = [];
        for (let i = 1; i <= 6; i++) {
            const randomValue = baseValue + Math.floor(Math.random() * 20) - 10;
            data.push({
                month: `Test ${i}`,
                value: randomValue,
            });
        }
        return data;
    };

    const chartData = generateRandomData(value);

    const chartConfig = {
        value: {
            label: title,
            color: color,
        },
    } satisfies ChartConfig;

    return (
        <Card className="w-full">
            <CardHeader>
                <CardTitle className="text-xl font-bold">{title}</CardTitle>
                <p className="text-sm text-muted-foreground">{subtitle}</p>
            </CardHeader>

            <CardContent>
                <ChartContainer
                    config={chartConfig}
                    className="h-[250px] w-full"
                >
                    <AreaChart
                        data={chartData}
                        margin={{
                            top: 10,
                            right: 30,
                            left: 0,
                            bottom: 0,
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                        <XAxis dataKey="month" stroke="#666" />
                        <YAxis stroke="#666" />
                        <Tooltip />
                        <Area
                            type="monotone"
                            dataKey="value"
                            stroke={color}
                            fill={color}
                            fillOpacity={0.3}
                        />

                        {/* <ChartLegend content={<ChartLegendContent />} /> */}
                    </AreaChart>
                </ChartContainer>

                {/* <div className="mt-6">
                    <p className="text-justify">{description}</p>
                </div> */}
            </CardContent>
        </Card>
    );
};

export default VitalsCard;
