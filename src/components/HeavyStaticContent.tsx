export default function HeavyStaticContent() {
  // 重い計算処理をシミュレート（サーバーサイドでのみ実行）
  const heavyCalculation = () => {
    const start = Date.now();
    let result = 0;
    // 意図的に重い計算を実行
    for (let i = 0; i < 10000000; i++) {
      result += Math.sqrt(i) + Math.sin(i) + Math.cos(i);
    }
    const end = Date.now();
    return { result: Math.round(result), duration: end - start };
  };

  const calc = heavyCalculation();

  // 大量のスタイル付きコンポーネント
  const staticItems = Array.from({ length: 1000 }, (_, i) => ({
    id: i,
    title: `静的アイテム ${i + 1}`,
    description: `これは重い静的コンテンツのアイテム${i + 1}です。このコンテンツは事前にレンダリングされます。`,
    color: `hsl(${(i * 137.508) % 360}, 70%, 60%)`,
  }));

  return (
    <div className="bg-white p-8 rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">重い静的コンテンツ</h2>
      
      <div className="mb-6 p-4 bg-blue-50 rounded-lg">
        <h3 className="text-xl font-semibold mb-2 text-blue-800">計算結果</h3>
        <p className="text-gray-700">
          計算結果: {calc.result.toLocaleString()}
        </p>
        <p className="text-gray-700">
          計算時間: {calc.duration}ms
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {staticItems.map((item) => (
          <div
            key={item.id}
            className="p-4 rounded-lg shadow-md transition-transform hover:scale-105"
            style={{ backgroundColor: item.color + '20', borderLeft: `4px solid ${item.color}` }}
          >
            <h4 className="font-semibold text-gray-800 mb-2">{item.title}</h4>
            <p className="text-sm text-gray-600">{item.description}</p>
            <div className="mt-2 flex items-center justify-between">
              <span className="text-xs text-gray-500">ID: {item.id}</span>
              <div 
                className="w-4 h-4 rounded-full"
                style={{ backgroundColor: item.color }}
              ></div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 p-4 bg-gray-50 rounded-lg">
        <h3 className="text-xl font-semibold mb-4 text-gray-800">追加の重いコンテンツ</h3>
        <div className="grid grid-cols-4 gap-2">
          {Array.from({ length: 500 }, (_, i) => (
            <div
              key={i}
              className="h-8 rounded"
              style={{
                backgroundColor: `hsl(${(i * 73) % 360}, 50%, 70%)`,
              }}
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
} 