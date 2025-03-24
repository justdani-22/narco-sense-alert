
import { useRef, useEffect } from 'react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  TooltipProps
} from 'recharts';
import { format } from 'date-fns';
import { DataPoint } from '@/hooks/useSimulatedData';
import { cn } from "@/lib/utils";

interface DataChartProps {
  title: string;
  data: DataPoint[];
  color: string;
  unit: string;
  min?: number;
  max?: number;
  className?: string;
  highlightRange?: [number, number];
}

const CustomTooltip = ({ active, payload, label }: TooltipProps<number, string>) => {
  if (active && payload && payload.length) {
    return (
      <div className="glass-card rounded-lg p-3 shadow-md text-sm">
        <p className="font-medium">{format(new Date(label), 'HH:mm')}</p>
        <p className="text-primary font-semibold">
          {payload[0].value?.toFixed(1)} {payload[0].payload.unit}
        </p>
      </div>
    );
  }

  return null;
};

const DataChart = ({ 
  title, 
  data, 
  color, 
  unit,
  min, 
  max,
  className = "",
  highlightRange
}: DataChartProps) => {
  const chartContainerRef = useRef<HTMLDivElement>(null);
  
  // Format data for recharts
  const formattedData = data.map(point => ({
    time: point.timestamp,
    value: point.value,
    unit
  }));
  
  return (
    <div className={cn("glass-card rounded-2xl p-5 animate-fade-in", className)}>
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">{title}</h3>
        {data.length > 0 && (
          <span className="text-2xl font-bold text-primary">
            {data[data.length - 1].value.toFixed(1)}
            <span className="text-sm font-medium ml-1">{unit}</span>
          </span>
        )}
      </div>
      
      <div ref={chartContainerRef} className="w-full h-40 md:h-48">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={formattedData}
            margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.2} />
            <XAxis 
              dataKey="time" 
              scale="time"
              type="number" 
              domain={['auto', 'auto']}
              tickFormatter={(timeStr) => format(new Date(timeStr), 'HH:mm')}
              tick={{ fontSize: 12 }}
              stroke="#94a3b8"
              tickMargin={5}
            />
            <YAxis 
              domain={[min ?? 'auto', max ?? 'auto']}
              tick={{ fontSize: 12 }}
              stroke="#94a3b8"
              tickMargin={5}
            />
            <Tooltip content={<CustomTooltip />} />
            <defs>
              <linearGradient id={`color-${title}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={color} stopOpacity={0.2}/>
                <stop offset="95%" stopColor={color} stopOpacity={0}/>
              </linearGradient>
            </defs>
            <Line
              type="monotone"
              dataKey="value"
              stroke={color}
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 6, strokeWidth: 0 }}
              fill={`url(#color-${title})`}
              animationDuration={1500}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default DataChart;
