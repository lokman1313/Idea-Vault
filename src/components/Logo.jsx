const Logo = () => {
  return (
    <div className="flex items-center gap-2 select-none">
      <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold">
        I
      </div>

      <h1 className="text-xl font-bold tracking-tight">
        Idea<span className="text-indigo-500">Vault</span>
      </h1>
    </div>
  );
};

export default Logo;