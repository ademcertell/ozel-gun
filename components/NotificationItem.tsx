import React from 'react';

interface SpecialDay {
  emoji: string;
  name: string;
  date: string;
}

interface NotificationItemProps {
  day: SpecialDay;
}

const months = [
  'Ocak',
  'Şubat',
  'Mart',
  'Nisan',
  'Mayıs',
  'Haziran',
  'Temmuz',
  'Ağustos',
  'Eylül',
  'Ekim',
  'Kasım',
  'Aralık',
];

const NotificationItem: React.FC<NotificationItemProps> = ({ day }) => {
  const formatDate = (date: string) => {
    const dateObj = new Date(date);
    const dayOfMonth = String(dateObj.getDate()).padStart(2, '0');
    const monthIndex = dateObj.getMonth();
    const year = dateObj.getFullYear();

    return `${dayOfMonth} ${months[monthIndex]} ${year}`;
  };

  const handleClick = () => {
    console.log('Bildirim tıklandı:', day);
  };

  const handleShareClick = () => {
    const shareText = `Bugün ${day.name}!`;
    const shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
      shareText
    )}&url=${encodeURIComponent(window.location.href)}`;

    window.open(shareUrl, '_blank');
  };

  return (
    <li
      className={`text-lg md:text-xl p-3 mb-2 border rounded-2xl ${
        day.date === new Date().toISOString().substr(0, 10)
          ? 'border-blue-500'
          : 'border-gray-100'
      }`}
      onClick={handleClick}
    >
      <div className='flex items-center justify-between'>
        <div>
          <span className=''>{day.emoji}</span>
          <span className='text-xl font-semibold'>{day.name}</span>
          <span className='text-sm md:text-base opacity-50 ml-2'>
            {formatDate(day.date)}
          </span>
        </div>
        {day.date === new Date().toISOString().substr(0, 10) && (
          <button
            className='text-xs text-blue-500 cursor-pointer'
            onClick={handleShareClick}
          >
            Paylaş
          </button>
        )}
      </div>
    </li>
  );
};

export default NotificationItem;