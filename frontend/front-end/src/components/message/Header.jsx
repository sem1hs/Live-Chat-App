function Header({ selected }) {
  return (
    <div className="bg-slate-600 px-4 py-2 mb-2 bg-opacity-50">
      <span className="label-text font-bold">
        To :{" "}
        <span className="text-gray-900 font-bold ml-1">
          {selected.fullName}
        </span>
      </span>
    </div>
  );
}

export default Header;
