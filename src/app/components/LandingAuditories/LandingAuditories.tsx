import { useRouter } from "next/navigation";
import React from "react";

export const LandingAuditories = () => {
  const router = useRouter();
  return (
    <div id="auditories">
      <h2 className="font-bold text-white text-center text-2xl">Кому наш продукт подойдет идеально?</h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 h-fit p-10 text-xl">
        <div className="bg-white rounded">
          <p className="p-5">
            <strong>1. Тем кто хочет, чтобы клиенты возвращались снова и снова, но нет времени на сложные маркетинговые схемы.</strong> <br />
            Если каждый клиент важен для вашего бизнеса, но они возвращаются реже, чем хотелось бы, то программа лояльности сможет их стимулировать к повторным покупкам, а вы, помимо клиентов, будите
            получать ценную информацию о них.
          </p>
        </div>
        <div className="bg-white rounded">
          <p className="p-5">
            <strong>2. Тем кто ищет способ быстро собирать и анализировать данные о клиентах.</strong> <br />
            Если вам важно знать, какие клиенты покупают чаще, что они выбирают и как взаимодействуют с вашим бизнесом, наш сервис даст вам всю нужную информацию в несколько кликов.
          </p>
        </div>
        <div className="bg-white rounded">
          <p className="p-5">
            <strong>3. Тем кому нужно лучше понимать, что действительно работает в вашем бизнесе.</strong> <br />
            Если вы устали от догадок и хотите принимать решения на основе точных данных, аналитика нашего сервиса позволит вам увидеть четкую картину — и исправить слабые стороны, прежде чем они
            начнут тормозить ваш рост.
          </p>
        </div>
        <div className="bg-white rounded">
          <p className="p-5">
            <strong>4. Тем кто хочет, чтобы управление клиентами и аналитика занимали минимум времени.</strong>
            Если вы хотите сосредоточиться на основном бизнесе, а не на разборе данных и статистики, наш сервис автоматизирует рутинные задачи и позволит вам развиваться, не отвлекаясь на мелочи.
          </p>
        </div>
        <div className="bg-white rounded">
          <p className="p-5">
            <strong>Итого:</strong> <br />
            Поэтому просто попробуйте зарегистрироваться и попробовать наш продукт, это бесплатно и очень легко, кнопка справа.
            <br />
            <button
              className={`bg-black text-white font-bold rounded-md py-1.5 px-2.5 cursor-pointer transition-colors duration-700 ease-in-out hover:bg-white hover:text-gray-800 mt-5`}
              onClick={() => router.push("/register")}>
              Зарегистрироваться
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};
