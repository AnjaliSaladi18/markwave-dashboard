const DotLoader = () => {
  return (
    <div className="flex items-center justify-center">
      <div className="relative w-6 h-6 animate-spin">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-[#00878a] dark:bg-[#4dd0d0] rounded-full top-1/2 left-1/2"
            style={{
              transform: `rotate(${i * 45}deg) translate(0, -12px)`
            }}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default DotLoader;
