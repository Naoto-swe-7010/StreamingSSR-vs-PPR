import { cookies } from 'next/headers';
import HeavyStaticContent from '@/components/HeavyStaticContent';
import DynamicContent from '@/components/DynamicContent';

// 強制的に動的レンダリングにする
export const dynamic = 'force-dynamic';

export default function HomePage() {
  // 動的レンダリングを強制するため
  cookies(); // 動的関数を呼び出してSSGを防ぐ
  const requestTime = new Date().toISOString();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* ヘッダー */}
      <header className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Next.js v14 Streaming SSRデモ
              </h1>
              <p className="text-gray-600 mt-1">
                従来のStreaming SSRの動作を体感
              </p>
              <p className="text-xs text-gray-500 mt-1">
                リクエスト時刻: {requestTime}
              </p>
            </div>
            <div className="bg-orange-100 px-4 py-2 rounded-lg">
              <span className="text-orange-800 font-semibold">Streaming SSR</span>
            </div>
          </div>
        </div>
      </header>

      {/* メインコンテンツ */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
          {/* 左カラム: 説明と動的コンテンツ */}
          <div className="space-y-8">
            {/* 説明セクション */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Streaming SSRの仕組み</h2>
              <div className="space-y-4">
                <div className="p-4 bg-blue-50 rounded-lg border-l-4 border-blue-500">
                  <h3 className="font-semibold text-blue-800 mb-2">静的部分（動的ユーザ情報以外）</h3>
                  <p className="text-blue-700 text-sm">
                    リクエスト時にサーバーでレンダリングされます。
                    重い計算処理があると、その分ユーザーは待機する必要があります。
                  </p>
                </div>
                <div className="p-4 bg-purple-50 rounded-lg border-l-4 border-purple-500">
                  <h3 className="font-semibold text-purple-800 mb-2">動的部分（動的ユーザ情報）</h3>
                  <p className="text-purple-700 text-sm">
                    リクエスト時にサーバーでレンダリングされ、
                    Suspenseでストリーミングされます。
                  </p>
                </div>
              </div>
            </div>

            {/* パフォーマンス情報 */}
            <div className="bg-red-50 p-4 rounded-lg border border-red-200">
              <h3 className="font-semibold text-red-800 mb-2">⚠️ パフォーマンスの制約</h3>
              <p className="text-red-700 text-sm">
                静的部分もリクエスト毎にサーバーサイドでレンダリングされるため、
                重い静的部分の処理が完了するまでページの表示が始まりません。<br />
                →静的部分がSSRの動きとなる。
              </p>
            </div>

            {/* 動的コンテンツ（上部に移動） */}
            <DynamicContent />
          </div>

          {/* 右カラム: 静的コンテンツ（コンパクト版） */}
          <div className="space-y-8">
            <div className="sticky top-8">
              <HeavyStaticContent />
            </div>
          </div>
        </div>
      </main>

      {/* フッター */}
      <footer className="bg-gray-800 text-white py-8 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p>&copy; 2024 Next.js v14 Streaming SSR Demo - パフォーマンス比較用</p>
        </div>
      </footer>
    </div>
  );
}
