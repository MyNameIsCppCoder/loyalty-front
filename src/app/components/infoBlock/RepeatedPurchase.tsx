import ActiveClientsDonutChart from "../vizualization/DonatPieActiveClients";

export interface ActiveClients {
  totalClient: number;
  activeClient: number;
}

const ActiveClient: React.FC<ActiveClients> = ({
  totalClient,
  activeClient,
}) => {
  const percentActiveClient = ((activeClient / totalClient) * 100).toFixed(2);
  return (
    <div className="flex flex-col space-y-4">
      <section className="bg-white border border-gray-200 rounded-lg p-4">
        <h3 className="text-lg font-semibold">Активных клиентов за период</h3>
        <p className="mt-2">
          <strong>Всего клиентов:</strong> {totalClient}
        </p>
        <p>
          <strong>Всего активных:</strong> {activeClient}
        </p>
        <p>
          <strong>Процент активных:</strong> {percentActiveClient}%
        </p>
      </section>

      <section className="bg-white border border-gray-200 rounded-lg p-4">
        <ActiveClientsDonutChart
          totalClientCount={totalClient}
          activeClientCount={activeClient}
        />
      </section>
    </div>
  );
};

export default ActiveClient;
