// src/app/components/dateFilter/DateFilter.tsx

"use client";
import { useRef, useState } from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { setDate } from 'date-fns';

interface DateFilterProps {
  setData: (data: {
    daysGone?: number;
    startDate?: string;
    endDate?: string;
  }) => void;
}

const DateFilter: React.FC<DateFilterProps> = ({ setData }) => {
  const [daysGone, setDaysGone] = useState<number | undefined>(undefined);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  let refStart = useRef<any | null>(null);
  let refEnd = useRef<any | null>(null);
  let refGone = useRef<HTMLInputElement | null>(null);
  const handleUpdate = () => {
    setData({
      daysGone,
      startDate: startDate
        ? startDate.toISOString().split("T")[0]
        : undefined,
      endDate: endDate ? endDate.toISOString().split("T")[0] : undefined,
    });
  };

  const handleReset = () => {
      // Сбрасываем состояния полей
      setDaysGone(undefined);
      setStartDate(null);
      setEndDate(null);

      // Обновляем данные
      setData({
        daysGone: undefined,
        startDate: undefined,
        endDate: undefined,
      });
  }

  return (
    <div className="bg-white shadow-md rounded p-6 mb-6">
      <h1 className="text-2xl font-semibold mb-4 text-center">Статистика</h1>
      <h2 className="text-2xl font-semibold mb-4 text-center">Фильтр по дате</h2>
      <div className="flex items-center gap-4 justify-around">
        {/* Поле для ввода daysGone */}
        <div>
          <label className="block text-gray-700 mb-2 w-fit">
            Количество дней назад
          </label>
          <input
            ref={refGone}
            type="number"
            value={daysGone !== undefined ? daysGone : ''}
            onChange={(e) => {
              const value = e.target.value;
              setDaysGone(value !== '' ? Number(value) : undefined);
            }}
            className="w-full px-3 py-2 border rounded"
            placeholder="Введите количество дней"
          />
        </div>

        {/* Выбор startDate */}
        <div>
          <label className="block text-gray-700 mb-2 w-fit">Дата начала</label>
          <DatePicker
            ref={refStart}
            selected={startDate}
            onChange={(date: Date | null) => setStartDate(date)}
            dateFormat="yyyy-MM-dd"
            className="w-full px-3 py-2 border rounded"
            placeholderText="Выберите дату начала"
          />
        </div>

        {/* Выбор endDate */}
        <div>
          <label className="block text-gray-700 mb-2 w-fit">Дата окончания</label>
          <DatePicker
            ref={refEnd}
            selected={endDate}
            onChange={(date: Date | null) => setEndDate(date)}
            dateFormat="yyyy-MM-dd"
            className="w-full px-3 py-2 border rounded"
            placeholderText="Выберите дату окончания"
          />
        </div>
        <div className="mt-6">
          <button
            onClick={handleUpdate}
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded"
          >
            Обновить
          </button>
        </div>
        <div className="mt-6">
          <button
            onClick={handleReset}
            className="bg-teal-500 hover:bg-teal-600 text-white font-semibold px-4 py-2 rounded"
          >
            Обнулить
          </button>
        </div>
      </div>
    </div>
  );
};

export default DateFilter;
