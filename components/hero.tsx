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
      emoji: "🍭",
      name: "Ramazan Bayramı",
      date: "2024-03-11",
      giftIdeas: [],
    },
    {
      emoji: "🧒🏻",
      name: "Ulusal Egemenlik Çocuk Bayramı",
      date: "2024-04-23",
      giftIdeas: ["Çay veya kahve çeşitleri.", "Çikolata"],
    },
    {
      emoji: "✊🏻",
      name: "Emek ve Dayanışma Günü",
      date: "2024-05-1",
      giftIdeas: [],
    },
    {
      emoji: "❤️",
      name: "Atatürk'ü Anma, Gençlik ve Spor Bayramı",
      date: "2024-05-19",
      giftIdeas: [],
    },
    {
      emoji: "🐑",
      name: "Kurban Bayramı",
      date: "2024-07-28",
      giftIdeas: [],
    },
    {
      emoji: "🎉",
      name: "Zafer Bayramı",
      date: "2024-08-30",
      giftIdeas: [],
    },
    {
      emoji: "🎉",
      name: "Cumhuriyet Bayramı",
      date: "2024-10-29",
      giftIdeas: [],
    },
    {
      emoji: "💖",
      name: "Sevgililer Günü",
      date: "2024-02-14",
      giftIdeas: ["Çiçek", "Saat", "Kolye", "Yüzük", "Parfüm", "Pırlanta"],
    },
  ];

  const excludedGiftDays = [
    "Emek ve Dayanışma Günü",
    "Atatürk'ü Anma, Gençlik ve Spor Bayramı",
    "Kurban Bayramı",
    "Zafer Bayramı",
    "Cumhuriyet Bayramı",
    "Ramazan Bayramı",
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

    if (!userLanguage.startsWith("tr")) {
      document.documentElement.lang = "en";
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