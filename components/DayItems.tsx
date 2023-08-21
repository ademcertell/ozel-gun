import React from "react";
import { motion } from "framer-motion";

interface SpecialDay {
  emoji: string;
  name: string;
  date: string;
}

interface NotificationItemProps {
  day: SpecialDay;
}

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

const NotificationItem: React.FC<NotificationItemProps> = ({ day }) => {
  const formatDate = (date: string) => {
    const dateObj = new Date(date);
    const dayOfMonth = String(dateObj.getDate()).padStart(2, "0");
    const monthIndex = dateObj.getMonth();
    const year = dateObj.getFullYear();

    return `${dayOfMonth} ${months[monthIndex]} ${year}`;
  };

  const handleClick = () => {
    console.log("Bildirim tıklandı:", day);
  };

  const handleShareClick = () => {
    const shareText = `Bugün ${day.name}!`;
    const shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
      shareText
    )}&url=${encodeURIComponent(window.location.href)}`;

    window.open(shareUrl, "_blank");
  };

  return (
    <motion.li
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className={`text-lg md:text-xl p-3 mb-2 border rounded-2xl ${
        day.date === new Date().toISOString().substr(0, 10)
          ? "border-blue-500"
          : "border-gray-100 border-opacity-5"
      }`}
      onClick={handleClick}
    >
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between">
        <div className="mb-2 md:mb-0 md:mr-4">
          <span>{day.emoji}</span>
        </div>
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between w-full">
          <div>
            <span className="text-xl dark:text-white text-black font-semibold">{day.name}</span>
            <span className="text-sm dark:text-gray-300 md:text-base opacity-50 ml-2">
              {formatDate(day.date)}
            </span>
          </div>
          {day.date === new Date().toISOString().substr(0, 10) && (
            <button
              className="mt-2 md:mt-0 text-xs text-blue-500 cursor-pointer"
              onClick={handleShareClick}
            >
              Paylaş
            </button>
          )}
        </div>
      </div>
    </motion.li>
  );
};

export default NotificationItem;
