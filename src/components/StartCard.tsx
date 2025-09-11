type Props = {
  title: string;
  value: number;
  created_at: string;
};

const StartCard = ({ title, value, created_at }: Props) => {
  return (
    <div className="bg-white shadow-md hover:shadow-lg transition p-5 rounded-xl border border-gray-200 animate-fade-in">
      <p className="text-sm text-gray-500">{title}</p>
      <h2 className="text-2xl font-extrabold text-blue-600 mt-2">
        {value.toLocaleString()}
      </h2>
      <p className="text-xs text-gray-400 mt-1">
        {new Date(created_at).toLocaleString()}
      </p>
    </div>
  );
};

export default StartCard;
