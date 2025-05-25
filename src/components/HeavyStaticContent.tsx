export default function HeavyStaticContent() {
  // 非常に重い計算処理（ビルド時に実行される）
  const heavyCalculation = () => {
    const start = Date.now();
    let result = 0;
    let complexResult = 0;
    
    // 意図的に非常に重い計算を実行（ビルド時に実行）
    // 基本的な数学計算
    for (let i = 0; i < 25000000; i++) { // 2500万回に増加
      result += Math.sqrt(i) + Math.sin(i) + Math.cos(i);
    }
    
    // 複雑な計算処理
    for (let i = 0; i < 5000000; i++) { // 500万回の複雑な計算
      complexResult += Math.pow(i, 1.5) + Math.log(i + 1) + Math.tan(i / 1000);
    }
    
    // 文字列処理も追加
    let stringResult = '';
    for (let i = 0; i < 100000; i++) {
      stringResult += `item-${i}-${Math.random().toString(36)}-`;
    }
    
    const end = Date.now();
    return { 
      result: Math.round(result), 
      complexResult: Math.round(complexResult),
      stringLength: stringResult.length,
      duration: end - start 
    };
  };

  const calc = heavyCalculation();
  // 動的な値（リクエスト時に決定）
  const renderTime = "リクエスト時に計算";

  // 表示用の静的アイテム（大幅に増加）
  const staticItems = Array.from({ length: 50 }, (_, i) => ({
    id: i,
    title: `重い静的アイテム ${i + 1}`,
    description: `これは非常に重い静的コンテンツのアイテム${i + 1}です。リクエスト時に処理されます。計算処理: ${Math.pow(i, 2)} + ${Math.sqrt(i * 100)}`,
    color: `hsl(${(i * 137.508) % 360}, 70%, 60%)`,
    complexity: Math.floor(Math.random() * 1000) + 500,
    metadata: {
      processTime: `${i * 0.1}ms`,
      priority: i % 5,
      category: ['システム', 'データ', 'UI', 'API', '計算'][i % 5],
    }
  }));

  // 追加の重い処理用データ
  const heavyGridItems = Array.from({ length: 500 }, (_, i) => ({
    id: i,
    value: Math.sin(i) * Math.cos(i) * Math.sqrt(i),
    color: `hsl(${(i * 73) % 360}, 50%, 70%)`,
  }));

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg max-h-screen overflow-y-auto">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">超重い静的コンテンツ</h2>
      
      <div className="mb-4 p-3 bg-orange-50 rounded-lg">
        <h3 className="text-lg font-semibold mb-2 text-orange-800">重い計算結果</h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          <div>
            <p className="text-gray-700">基本計算: {calc.result.toLocaleString()}</p>
            <p className="text-gray-700">複雑計算: {calc.complexResult.toLocaleString()}</p>
          </div>
          <div>
            <p className="text-gray-700">文字列長: {calc.stringLength.toLocaleString()}</p>
            <p className="text-gray-700">計算時間: {calc.duration}ms</p>
          </div>
        </div>
        <p className="text-gray-600 text-xs mt-2">
          環境: {renderTime}
        </p>
        <p className="text-red-600 text-xs font-semibold">
          ⏳ この重い計算も全て完了するまで待機（Streaming SSR）
        </p>
      </div>

      <div className="mb-4">
        <h3 className="text-lg font-semibold mb-2 text-gray-800">
          重い静的アイテム一覧 ({staticItems.length}個)
        </h3>
        <div className="grid grid-cols-1 gap-2 max-h-80 overflow-y-auto">
          {staticItems.map((item) => (
            <div
              key={item.id}
              className="p-2 rounded-lg shadow-sm transition-transform hover:scale-[1.02] text-xs"
              style={{ backgroundColor: item.color + '15', borderLeft: `3px solid ${item.color}` }}
            >
              <div className="flex justify-between items-start mb-1">
                <h4 className="font-semibold text-gray-800 text-xs">{item.title}</h4>
                <span className="text-xs text-gray-500">#{item.id}</span>
              </div>
              <p className="text-xs text-gray-600 mb-1">{item.description}</p>
              <div className="flex justify-between items-center">
                <div className="flex gap-2 text-xs">
                  <span className="px-1 py-0.5 bg-gray-200 rounded text-gray-700">
                    {item.metadata.category}
                  </span>
                  <span className="text-gray-500">複雑度: {item.complexity}</span>
                </div>
                <div 
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: item.color }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mb-4">
        <h3 className="text-lg font-semibold mb-2 text-gray-800">
          重い計算グリッド ({heavyGridItems.length}個)
        </h3>
        <div className="grid grid-cols-10 gap-1 max-h-32 overflow-y-auto">
          {heavyGridItems.map((item) => (
            <div
              key={item.id}
              className="h-6 rounded flex items-center justify-center text-xs font-mono"
              style={{
                backgroundColor: item.color,
                color: item.value > 0 ? '#000' : '#fff'
              }}
              title={`ID: ${item.id}, Value: ${item.value.toFixed(3)}`}
            >
              {item.id}
            </div>
          ))}
        </div>
      </div>

      <div className="p-3 bg-gray-50 rounded-lg">
        <h3 className="text-lg font-semibold mb-2 text-gray-800">処理統計</h3>
        <div className="grid grid-cols-3 gap-4 text-xs">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">
              {(calc.result / 1000000).toFixed(1)}M
            </div>
            <div className="text-gray-600">基本計算</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600">
              {staticItems.length}
            </div>
            <div className="text-gray-600">処理アイテム</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">
              {calc.duration}
            </div>
            <div className="text-gray-600">処理時間(ms)</div>
          </div>
        </div>
      </div>

      {/* 背景で更に重い計算処理を実行（非表示） */}
      <div className="hidden">
        {Array.from({ length: 10000 }, (_, i) => (
          <div key={i}>
            Heavy background calculation: {Math.sin(i) * Math.cos(i) * Math.sqrt(i)}
          </div>
        ))}
      </div>
    </div>
  );
} 