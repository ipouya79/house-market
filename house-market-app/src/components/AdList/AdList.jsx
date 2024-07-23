import React from "react";
import AdCard from "../AdCard/AdCard";

const AdList = ({ ads }) => {
  return (
    <div className="p-4 md:p-6 lg:p-8" dir="rtl">
      {ads.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {ads.map((ad) => (
            <AdCard key={ad.id} ad={ad} />
          ))}
        </div>
      ) : (
        <div className="flex items-center justify-center h-64">
          <p className="text-gray-500 dark:text-gray-400 text-lg font-medium">
            درحال حاضر آگهی برای نمایش وجود ندارد
          </p>
        </div>
      )}
    </div>
  );
};

export default AdList;
