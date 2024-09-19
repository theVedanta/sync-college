import { Progress } from "@/components/ui/progress";

interface ProgressCircleProps {
    value: number;
    color: string;
}

const ProgressCircle: React.FC<ProgressCircleProps> = ({ value, color }) => {
    return (
        <div className="relative mx-auto mb-4 h-32 w-32">
            <div className="absolute inset-0">
                <Progress
                    value={value}
                    className={`h-full w-full rounded-full bg-${color}-500`}
                />
            </div>
            <div className="absolute inset-2 flex items-center justify-center rounded-full bg-white">
                <span className={`text-${color}-600 text-3xl font-bold`}>
                    {value}%
                </span>
            </div>
        </div>
    );
};

export default ProgressCircle;
