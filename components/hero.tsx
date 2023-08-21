"use client";

import React, { useEffect } from "react";

import NotificationItem from "../components/NotificationItem";
import TodayDate from "./TodayDate";

interface SpecialDay {
  emoji: string;
  name: string;
  date: string;
}

const Hero: React.FC = () => {
  const specialDays: SpecialDay[] = [
    { emoji: "🎄", name: "Yılbaşı", date: "2023-08-21" },
    { emoji: "❣️", name: "Sevgililer Günü", date: "2024-02-14" },
    { emoji: "💓🤱", name: "Anneler Günü", date: "2024-05-14" },
  ];

  const notificationSound = new Audio("/notification.mp3");

  useEffect(() => {
    checkSpecialDays();
  }, []);

  const checkSpecialDays = () => {
    const today = new Date().toISOString().substr(0, 10);

    specialDays.forEach((day) => {
      if (day.date === today) {
        sendNotification(day);
        playNotificationSound();
      }
    });
  };

  const playNotificationSound = () => {
    notificationSound.play();
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
    <div className="px-4 py-2 mt-5">
      <div className="flex mx-ayto max-w-screen-md items-center">
        <h1 className="text-xl font-bold">Özel Gün Takip</h1>
        <span>
          <TodayDate className="ml-4 text-sm opacity-50" />
        </span>
      </div>
      <hr className="border-gray-300 border-1 w-full mt-4" />
      <div className="pt-5">
        <ul>
          {specialDays.map((day, index) => (
            <NotificationItem key={index} day={day}/>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Hero;
