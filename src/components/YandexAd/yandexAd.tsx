"use client";

import { useEffect } from "react";

const YandexAd = ({ blockId }: { blockId: string }) => {
  useEffect(() => {
    // Создаем глобальную переменную для колбэков Яндекс
    window.yandexContextAsyncCallbacks = window.yandexContextAsyncCallbacks || [];
    
    // Добавляем нашу рекламу в очередь
    window.yandexContextAsyncCallbacks.push(() => {
      if (window.Ya?.Context?.AdvManager) {
        window.Ya.Context.AdvManager.render({
          blockId: blockId,
          renderTo: `yandex-ad-${blockId}`,
          async: true
        });
      }
    });

    // Загружаем скрипт Яндекс рекламы если еще не загружен
    if (!document.querySelector('script[src*="an.yandex.ru/system/context.js"]')) {
      const script = document.createElement('script');
      script.src = 'https://an.yandex.ru/system/context.js';
      script.async = true;
      document.head.appendChild(script);
    }
  }, [blockId]);

  return (
    <div 
      id={`yandex-ad-${blockId}`} 
      style={{ 
        margin: '20px 0'
      }} 
    />
  );
};

export default YandexAd;