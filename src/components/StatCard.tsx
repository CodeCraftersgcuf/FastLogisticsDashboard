import React from "react";

interface StatCardProps {
  title: string;
  value: string;
  description: string;
  icon: string;
  bgIcon: string;
  bgCard: string;
  textColor: string;
  statChangeColor: string;
}

const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  description,
  icon,
  bgIcon,
  bgCard,
  textColor,
  statChangeColor,
}) => {
  return (
    <div className={`flex w-full max-w-[280px] rounded-lg overflow-hidden shadow-md ${bgCard}`}>
      {/* Left Icon Section */}
      <div className={`flex items-center justify-center w-1/4 bg-opacity-20 p-4 ${bgIcon}`}>
        <img src={icon} alt={title} className="w-10 h-10" />
      </div>

      {/* Right Text Section */}
      <div className={`p-4 flex-1 text-${textColor}`}>
        <h3 className=" font-medium">{title}</h3>
        <p className="text-2xl font-bold">{value}</p>
        <span className={`text-[11px] font-medium ${statChangeColor}`}>{description}</span>
      </div>
    </div>
  );
};

export default StatCard;
