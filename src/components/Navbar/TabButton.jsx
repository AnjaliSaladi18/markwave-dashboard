const TabButton = ({ title, activeTab, setActiveTab }) => {
  const isActive = activeTab === title;

  return (
    <button
      onClick={() => setActiveTab(title)}
      className={`px-6 py-2 rounded-md font-medium transition-all duration-300
        ${isActive ? "bg-[#00878a] text-white" : "bg-gray-200 text-gray-700"}`}
    >
      {title}
    </button>
  );
};

export default TabButton;
