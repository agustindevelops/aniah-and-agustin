const Christmas = ({ children }) => {
  return (
    <div className="bg-blue-100 bg-opacity-10 shadow-lg rounded-lg overflow-hidden border border-blue-200">
      <div className="bg-gradient-to-t from-blue-100 to-blue-300 bg-opacity-10 p-4">
        {children}
      </div>
    </div>
  );
};

export default Christmas;
