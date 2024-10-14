interface RepeatRate {
  repeatClientCount: number;
  totalClientCount: number;
}
const RepeatRate: React.FC<RepeatRate> = ({
  repeatClientCount,
  totalClientCount,
}) => {
  const percentActiveClient = (
    (repeatClientCount / totalClientCount) *
    100
  ).toFixed(2);
  return (
    <div className="flex flex-col space-y-4">
      <section className="bg-white border border-gray-200 rounded-lg p-4">
        <h3 className="text-lg font-semibold">Количество вернувшихся</h3>
        <p className="mt-2">
          <strong>Всего клиентов:</strong> {totalClientCount}
        </p>
        <p>
          <strong>Всего вернувшихся:</strong> {repeatClientCount}
        </p>
        <p>
          <strong>Процент вернувшихся:</strong> {percentActiveClient}%
        </p>
      </section>

      <section className="bg-white border border-gray-200 rounded-lg p-4">
        {/* Здесь будет визуализация данных в будущем */}
      </section>
    </div>
  );
};

export default RepeatRate;
