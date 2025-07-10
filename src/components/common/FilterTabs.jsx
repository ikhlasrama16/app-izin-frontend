export default function FilterTabs({ options, selected, onChange }) {
  return (
    <div className="mb-4 flex flex-wrap gap-2">
      {options.map((opt) => (
        <button
          key={opt.value}
          onClick={() => onChange(opt.value)}
          className={`px-4 py-1 rounded-full border text-sm font-medium transition ${
            selected === opt.value
              ? "bg-blue-600 text-white"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}
