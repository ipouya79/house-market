import { Link } from "react-router-dom";

const AdCard = ({ ad }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 ease-in-out h-48">
      <Link
        to={`/ad/${ad.id}`}
        className="block p-4 text-blue-500 dark:text-blue-300 hover:text-blue-700 dark:hover:text-blue-400"
      >
        <h3 className="text-right text-xl font-bold mb-3">{ad.title}</h3>
        <p className="text-right text-gray-600 dark:text-gray-400 text-sm mb-2">
          {ad.address}
        </p>
      </Link>
    </div>
  );
};

export default AdCard;
