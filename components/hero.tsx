"use client";

import React, { useEffect, useState } from "react";

import NotificationItem from "./DayItems";
import TodayDate from "./TodayDate";
import NotificationSound from "./NotificationSound";

interface SpecialDay {
  emoji: string;
  name: string;
  date: string;
}

const Hero: React.FC = () => {
  const specialDays: SpecialDay[] = [
    { emoji: "🎄", name: "Yılbaşı", date: "2023-08-21" },
    { emoji: "❣️", name: "Sevgililer Günü", date: "2023-08-22" },
    { emoji: "🤱", name: "Anneler Günü", date: "2024-05-14" },
  ];

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };
  
  const closeModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    if ("Notification" in window && Notification.permission !== "granted") {
      Notification.requestPermission();
    }
  }, []);

  useEffect(() => {
    checkSpecialDays();
    setInterval(checkSpecialDays, 1000 * 60 * 60 * 24);
  });

  const checkSpecialDays = () => {
    const today = new Date().toISOString().substr(0, 10);

    specialDays.forEach((day) => {
      if (day.date === today) {
        sendNotification(day);
      }
    });
  };


  const sendNotification = (day: SpecialDay) => {
    if (
      typeof Notification !== "undefined" &&
      Notification.permission === "granted"
    ) {
      const notification = new Notification("Özel Gün Bildirimi", {
        body: `${day.name} - ${day.date}`,
        vibrate: [200, 100, 200],
      });

      notification.onclick = () => {
        console.log("Bildirim tıklandı:", day);
      };
    }
  };

  return (
    <div className="px-4 py-8 mx-auto max-w-screen-md">
      <NotificationSound />
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl dark:text-white text-black font-bold">Özel Gün Takip</h1>
        <TodayDate/>
      </div>
      <hr className="border-gray-300 border-1 mb-6 dark:opacity-10 opacity-40" />
      <div>
        <ul>
          {specialDays.map((day, index) => (
            <NotificationItem key={index} day={day} />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Hero;
