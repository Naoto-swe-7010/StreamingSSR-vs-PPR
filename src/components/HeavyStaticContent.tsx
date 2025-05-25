export default function HeavyStaticContent() {
  // 非常に重い計算処理（リクエスト時に実行される）
  const heavyCalculation = () => {
    // リクエスト時の計算時間を記録
    const start = Date.now();
    let result = 0;
    let complexResult = 0;
    
    // 意図的に非常に重い計算を実行（リクエスト時に実行）
    // 基本的な数学計算
    for (let i = 0; i < 2500000; i++) { // 2500万回に増加
      result += Math.sqrt(i) + Math.sin(i) + Math.cos(i);
    }
    
    // 複雑な計算処理
    for (let i = 0; i < 500000; i++) { // 500万回の複雑な計算
      complexResult += Math.pow(i, 1.5) + Math.log(i + 1) + Math.tan(i / 1000);
    }
    
    // 文字列処理も追加（決定論的に変更）
    let stringResult = '';
    for (let i = 0; i < 10000; i++) {
      // Math.random()の代わりに決定論的な値を使用
      const deterministicValue = ((i * 1234567) % 1000).toString(36);
      stringResult += `item-${i}-${deterministicValue}-`;
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

  // 表示用の静的アイテム（500個に増加）
  const staticItems = Array.from({ length: 500 }, (_, i) => ({
    id: i,
    title: `重い静的アイテム ${i + 1}`,
    description: `これは非常に重い静的コンテンツのアイテム${i + 1}です。リクエスト時に処理されます。`,
    color: `hsl(${(i * 137.508) % 360}, 70%, 60%)`,
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
        <div className="mb-3 text-xs text-orange-700 bg-orange-100 p-2 rounded">
          <p><strong>実行された計算処理の詳細：</strong></p>
          <ul className="list-disc list-inside mt-1 space-y-1">
            <li><strong>基本計算：</strong> 平方根・正弦・余弦の組み合わせ (Math.sqrt + Math.sin + Math.cos) を2,500万回実行</li>
            <li><strong>複雑計算：</strong> 累乗・対数・正接の組み合わせ (Math.pow + Math.log + Math.tan) を500万回実行</li>
            <li><strong>文字列長：</strong> 決定論的な文字列生成処理を1万回実行して総文字数を計算</li>
          </ul>
        </div>
        <div className="grid grid-cols-2 gap-2 text-xs">
          <div>
            <p className="text-gray-700">基本計算結果: {calc.result.toLocaleString()}</p>
            <p className="text-gray-700">複雑計算結果: {calc.complexResult.toLocaleString()}</p>
          </div>
          <div>
            <p className="text-gray-700">文字列長計算結果: {calc.stringLength.toLocaleString()}</p>
            <p className="text-gray-700">総計算時間: {calc.duration}ms</p>
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