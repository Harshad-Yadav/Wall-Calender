const SpiralBinding = () => {
  const rings = Array.from({ length: 14 });
  return (
    <div className="flex justify-center gap-3 py-2">
      {rings.map((_, i) => (
        <div
          key={i}
          className="w-3 h-3 rounded-full spiral-color opacity-60"
        />
      ))}
    </div>
  );
};

export default SpiralBinding;
