import React from "react";

export const LandingFooter = () => {
  return (
    <div className="w-full text-white flex justify-between">
      <div className="m-5 text-xs">
        <p>
          <strong>Юридическая информация: </strong>
        </p>
        <p>
          ИП Ковалева К.С. <br />
          ИНН: 263622239185 <br />
          ОГРНИП: 309263509300103 <br />
          Адрес: г.Ставрополь, почтовый индекс 355004 <br />
          Почта: businesstools-info@yandex.ru <br />
          Пользовательское соглашение:
          <a href="/user-accepted" className="text-blue-300">
            здесь
          </a>
          <br />
        </p>
      </div>
      <div>
        По любым вопросам, предложениям, <br />
        дополнениям будем рады вам ответить на почте: <br />
        <a href="mailto:businesstools-info@yandex.ru" className="text-blue-300">
          businesstools-info@yandex.ru
        </a>
      </div>
    </div>
  );
};
