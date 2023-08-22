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

  const today = new Date().toISOString().substr(0, 10);
  const isPastDay = day.date < today;
  const isFutureDay = day.date > today;

  return (
    <motion.li
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className={`text-lg md:text-xl p-3 mb-2 border rounded-2xl ${
        day.date === today
          ? "bg-blue-800 bg-opacity-10 text-white border-blue-500"
          : isPastDay
          ? "bg-gray-300 bg-opacity-40 dark:bg-opacity-10 text-gray-600"
          : isFutureDay
          ? "bg-yellow-200 bg-opacity-40 text-gray-700"
          : "border-gray-100 border-opacity-5"
      }`}
      onClick={handleClick}
    >
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between">
        <div className="mb-2 md:mb-0 md:mr-4">
          <span className="text-2xl">{day.emoji}</span>
        </div>
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between w-full">
          <div>
            <span className="text-xl dark:text-white text-black font-semibold">
              {day.name}
            </span>
            <span className="text-sm dark:text-gray-300 text-gray-500 md:text-base opacity-50 ml-2">
              {formatDate(day.date)}
            </span>
          </div>
          {isPastDay && (
            <span className="text-sm dark:text-gray-300 text-gray-500">
              Geçti
            </span>
          )}
          {isFutureDay && (
            <span className="text-sm dark:text-gray-200 text-gray-400">
              Yakında
            </span>
          )}
          {day.date === today && (
            <button
              className="mt-2 md:mt-0 text-xs dark:text-blue-300 text-blue-500 cursor-pointer"
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