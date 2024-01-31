"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

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

const Hero: React.FC = () => {
  const specialDays: SpecialDay[] = [
    {
      emoji: "⚡",
      name: "Testing Day",
      date: "2024-01-31",
      giftIdeas: [
        "Computer Parts (CPU, GPU, RAM, etc.)",
      ],
    },
  ];

  const excludedGiftDays = [
    "İstiklâl Marşı'nın Kabulü",
    "Çanakkale Zaferi ve Şehitleri Anma Günü",
    "23 Nisan Ulusal Egemenlik ve Çoçuk Bayramı",
    "Emek ve dayanışma Günü",
    "Atatürk'ü Anma ve Gençlik ve Spor Bayram",
    "29 Ekim Cumhuriyet Bayramı",
    "Atatürk'ü anma günü ve Atatürk haftası",
    "30 Ağustos Zafer Bayramı",
    "Arefe",
    "Ramazan Bayramı 1. Gün",
    "Ramazan Bayramı 2. Gün",
    "Ramazan Bayramı 3. Gün",
    "Kurban Bayramı 1. Gün",
    "Kurban Bayramı 2. Gün",
    "Kurban Bayramı 3. Gün",
    "Kurban Bayramı 4. Gün",
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