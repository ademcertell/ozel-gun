"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";

import NotificationItem from "./NotificationItem";
import TodayDate from "./Date";
import NotificationSound from "./NotificationSound";
import InstallBanner from "./InstallBanner";

interface SpecialDay {
  emoji: string | React.ReactNode;
  name: string;
  date: string;
  giftIdeas: string[];
}

interface RegionalHolidayListProps {
  region: string;
}

const Hero: React.FC = () => {
  const specialDays: SpecialDay[] = [
    {
      emoji: "💖",
      name: "Sevgililer Günü",
      date: "2024-02-14",
      giftIdeas: [
        "Çiçek",
        "Saat",
        "Kolye",
        "Yüzük",
        "Parfüm",
        "Pırlanta"
      ],
    },
  ];

    const excludedGiftDays = [
    "",
  ];

  useEffect(() => {
    if ("Notification" in window && Notification.permission !== "granted") {
      Notification.requestPermission();
    }
  }, []);

  useEffect(() => {
    checkSpecialDays();
    setInterval(checkSpecialDays, 1000 * 60 * 60 * 24);
  });

  useEffect(() => {
    const userLanguage = navigator.language;

    // Tarayıcı dilini kontrol et ve dil Türkçe değilse, sayfa içeriğini İngilizce olarak belirle
    if (!userLanguage.startsWith('tr')) {
      document.documentElement.lang = 'en'; // HTML etiketinin lang özelliğini ayarla
    }
  }, []);

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
        <Link
          href="https://github.com/sponsors/ademcertell"
          target="_blank"
          rel="noopener noreferrer"
          title="Bana destek ol :)"
          className="text-2xl dark:text-white text-black font-semibold"
        >
          Özel Gün Takip
        </Link>
        <TodayDate />
      </div>
      <hr className="border-gray-300 border-1 mb-6 dark:opacity-10 opacity-40" />
      <div>
        <ul>
          {specialDays.map((day, index) => (
            <NotificationItem
              key={index}
              day={day}
              showGiftButton={!excludedGiftDays.includes(day.name)}
            />
          ))}
        </ul>
      </div>
      <InstallBanner />
    </div>
  );
};

export default Hero;