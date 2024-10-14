import React from "react";

interface MeanLtvProps {
  meanLtv: number;
}

const MeanLtv: React.FC<MeanLtvProps> = ({ meanLtv }) => {
  return (
    <div className="flex flex-col space-y-4">
      <section className="bg-white border border-gray-200 rounded-lg p-4">
        <h3 className="text-lg font-semibold">LTV: {meanLtv}</h3>
      </section>

      <section className="bg-white border border-gray-200 rounded-lg p-4">
        {/* Здесь будет визуализация данных в будущем */}
      </section>
    </div>
  );
};

export default MeanLtv;
