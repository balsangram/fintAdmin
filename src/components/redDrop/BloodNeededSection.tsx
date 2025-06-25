import React from 'react';
import BloodDrop from './BloodDrop';

interface BloodLevel {
  group: string;
  level: number; // should be between 0–5
}

interface BloodNeededSectionProps {
  bloodLevels: BloodLevel[];
}

const BloodNeededSection: React.FC<BloodNeededSectionProps> = ({ bloodLevels }) => {
  return (
    <div className="flex  flex-col md:flex-row bg-white dark:bg-gray-900 rounded-lg shadow-lg overflow-hidden">
      <div className=" w-full bg-red-100 dark:bg-red-800 p-6 flex flex-col justify-center">
        <h1 className="text-2xl font-bold text-red-700 dark:text-white mb-8 mt-4 text-center">🩸 Blood Needed</h1>

        <div className="flex flex-wrap justify-center items-center gap-6 py-6 mb-4">
          {bloodLevels.map(({ group, level }) => (
            <div key={group} className="flex flex-col items-center">
              <BloodDrop level={level} />
              <span className="text-red-700 dark:text-white font-semibold mt-1">{group}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BloodNeededSection;
