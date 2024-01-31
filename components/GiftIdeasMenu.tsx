import React from "react";
import { motion } from "framer-motion";

interface GiftIdeasMenuProps {
  isOpen: boolean;
  giftIdeas: string[];
}

const GiftIdeasMenu: React.FC<GiftIdeasMenuProps> = ({ isOpen, giftIdeas }) => {
  return (
    <motion.div
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: isOpen ? 0 : -20, opacity: isOpen ? 1 : 0 }}
      transition={{ duration: 0.3 }}
      className="gift-ideas-menu"
    >
      <ul>
        {giftIdeas.map((idea, index) => (
          <li
            className="px-12 text-base text-black dark:text-white opacity-60"
            key={index}
          >
            {idea}
          </li>
        ))}
      </ul>
    </motion.div>
  );
};

export default GiftIdeasMenu;