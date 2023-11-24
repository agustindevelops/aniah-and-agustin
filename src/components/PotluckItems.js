const PotluckItemList = ({ potluckItems }) => {
  return (
    <div className="min-w-2xl max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold text-center mb-6">Potluck Items</h2>
      <ul className="divide-y divide-gray-200">
        {potluckItems.map((item, index) => (
          <li key={index} className="py-4 flex justify-between items-center">
            <div>
              <p className="text-lg text-gray-900">{item.item}</p>
              <p className="text-sm text-gray-600">{item.name}</p>
            </div>
            <span className="inline-block px-3 py-1 text-sm font-semibold text-gray-800 bg-gray-200 rounded-full">
              {item.category}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PotluckItemList;
