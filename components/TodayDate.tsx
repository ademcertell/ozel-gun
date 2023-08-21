import React from "react";

interface TodayDateProps {
  className?: string;
}

const TodayDate: React.FC<TodayDateProps> = ({ className }) => {
  const months = [
    "Ocak",
    "Şubat",
    "Mart",
    "Nisan",
    "Mayıs",
    "Haziran",
    "Temmuz",
    "Ağustos",
    "Eylül",
    "Ekim",
    "Kasım",
    "Aralık",
  ];

  const today = new Date();
  const day = String(today.getDate()).padStart(2, "0");
  const monthIndex = today.getMonth();
  const year = today.getFullYear();

  const formattedDate = `${day} ${months[monthIndex]} ${year}`;

  return (
    <p className={className}>
      {formattedDate}
    </p>
  );
};

export default TodayDate;
