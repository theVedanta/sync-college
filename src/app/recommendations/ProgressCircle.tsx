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
                    className={`h-full w-full rounded-full ${
                        color === "orange"
                            ? "bg-orange-500"
                            : color === "green"
                              ? "bg-green-500"
                              : color === "red"
                                ? "bg-red-500"
                                : color === "blue"
                                  ? "bg-blue-500"
                                  : "bg-gray-500" // default color
                    }`}
                />
            </div>
            <div className="absolute inset-2 flex items-center justify-center rounded-full bg-white">
                <span
                    className={`text-3xl font-bold ${
                        color === "orange"
                            ? "text-orange-600"
                            : color === "green"
                              ? "text-green-600"
                              : color === "red"
                                ? "text-red-600"
                                : color === "blue"
                                  ? "text-blue-600"
                                  : "text-gray-600" // default color
                    }`}
                >
                    {value}%
                </span>
            </div>
        </div>
    );
};

export default ProgressCircle;
