// src/app/components/InfoBlock.tsx

import {
	ActiveClients,
	ActivityDay,
	ChurnRate,
	Cohort,
	PurchaseFrequency as IOurchaseFrequency,
	LifetimeValue,
	RepeatPurchaseRate,
} from "@/types/metrics";
import React from "react";
import AOVComponent from "./AOVComponent";
import AverageLifetimeValue from "./AverageLTVComponent";
import ChurnRateComponent from "./ChurnRateComponent";
import CohortAnalysis from "./CohortAnalysis";
import CustomerActivityDays from "./CustomerActivityDay";
import CustomerLifetimeValueComponent from "./LTVComponent";
import { PurchaseFrequencyComponent } from "./PurchaseFrequencyComponent";
import ActiveClient from "./RepeatedPurchase";

interface InfoBlockProps {
	averagePurchaseFrequency: IOurchaseFrequency[];
	customerActivityDays: ActivityDay[];
	customerLifetimeValue: LifetimeValue[];
	churnRate: ChurnRate;
	repeatPurchaseRate: RepeatPurchaseRate;
	activeClientByMentionedDay: ActiveClients;
	averageOrderValueByAllClient: number;
	averageLifetimeValue: number;
	meanLtv: number;
	cohort: Cohort[];
}

const InfoBlock: React.FC<InfoBlockProps> = ({
	averagePurchaseFrequency,
	customerActivityDays,
	customerLifetimeValue,
	churnRate,
	repeatPurchaseRate,
	activeClientByMentionedDay,
	averageOrderValueByAllClient,
	averageLifetimeValue,
	meanLtv,
	cohort,
}) => {
	console.log({
		averagePurchaseFrequency,
		customerActivityDays,
		customerLifetimeValue,
		churnRate,
		repeatPurchaseRate,
		activeClientByMentionedDay,
		averageOrderValueByAllClient,
		averageLifetimeValue,
		meanLtv,
		cohort,
	});
	return (
		<div>
			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 px-4">
				{/* Средняя частота покупок */}
				<div className="border border-gray-200 rounded-lg p-4 shadow-md">
					<PurchaseFrequencyComponent clients={averagePurchaseFrequency} />
				</div>

				{/* Активные дни клиента */}
				<div className="border border-gray-200 rounded-lg p-4 shadow-md">
					<CustomerActivityDays customerActivityDays={customerActivityDays} />
				</div>

				{/* Lifetime Value */}
				<div className="border border-gray-200 rounded-lg p-4 shadow-md">
					<CustomerLifetimeValueComponent
						customerLifetimeValue={customerLifetimeValue}
					/>
				</div>

				{/* Churn Rate */}
				<div className="border border-gray-200 rounded-lg p-4 shadow-md">
					<ChurnRateComponent
						totalClient={churnRate.totalClientCount}
						churnedClient={churnRate.churnedClientCount}
					/>
				</div>

				{/* Active users */}
				<div className="border border-gray-200 rounded-lg p-4 shadow-md">
					<ActiveClient
						activeClient={repeatPurchaseRate.repeatClientCount}
						totalClient={repeatPurchaseRate.totalClientCount}
					/>
				</div>

				{/* Средний чек */}
				<div className="border border-gray-200 rounded-lg p-4 shadow-md">
					<AOVComponent averageOrderValue={averageOrderValueByAllClient} />
				</div>

				{/* Новая Метрика: Average Lifetime Value */}
				<div className="border border-gray-200 rounded-lg p-4 shadow-md">
					<AverageLifetimeValue averageLifetimeValue={averageLifetimeValue} />
				</div>

				{/* Новая Метрика: Cohort Analysis */}
				<div className="border border-gray-200 rounded-lg p-4 shadow-md">
					<CohortAnalysis cohort={cohort} />
				</div>
			</div>
		</div>
	);
};

export default InfoBlock;
