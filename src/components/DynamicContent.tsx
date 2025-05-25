import { Suspense } from 'react';
import { cookies } from 'next/headers';

// データ取得をシミュレートする関数
async function fetchUserData() {
  // 動的関数を呼び出してSSGを防ぐ
  cookies();
  
  // 意図的に遅延を追加（7秒）
  await new Promise(resolve => setTimeout(resolve, 7000));
  
  const fetchTime = new Date().toLocaleString('ja-JP');
  
  return {
    user: {
      name: "田中太郎",
      email: "tanaka@example.com",
      joinedAt: new Date().toLocaleDateString('ja-JP'),
      status: "オンライン",
    },
    stats: {
      totalPosts: Math.floor(Math.random() * 1000) + 100,
      followers: Math.floor(Math.random() * 5000) + 500,
      following: Math.floor(Math.random() * 1000) + 100,
    },
    recentActivity: Array.from({ length: 10 }, (_, i) => ({
      id: i,
      action: `アクティビティ ${i + 1}`,
      timestamp: new Date(Date.now() - Math.random() * 86400000).toLocaleString('ja-JP'),
    })),
    fetchTime: fetchTime,
  };
}

async function UserProfile() {
  const data = await fetchUserData();

  return (
    <div className="bg-gradient-to-r from-purple-400 to-pink-400 p-8 rounded-lg shadow-lg text-white">
      <h2 className="text-3xl font-bold mb-6">動的ユーザー情報</h2>
      
      <div className="mb-4 p-3 bg-white/20 rounded-lg backdrop-blur-sm">
        <p className="text-sm opacity-90">
          🕐 データ取得時刻: {data.fetchTime}
        </p>
        <p className="text-xs opacity-75">
          ※ 3秒の遅延後にサーバーサイドで生成
        </p>
        <p className="text-yellow-200 text-xs font-semibold">
          ⏳ この部分のみ遅延表示（動的部分）
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white/20 p-6 rounded-lg backdrop-blur-sm">
          <h3 className="text-xl font-semibold mb-4">プロフィール</h3>
          <div className="space-y-2">
            <p><span className="font-medium">名前:</span> {data.user.name}</p>
            <p><span className="font-medium">メール:</span> {data.user.email}</p>
            <p><span className="font-medium">参加日:</span> {data.user.joinedAt}</p>
            <p><span className="font-medium">ステータス:</span> 
              <span className="inline-block ml-2 px-2 py-1 bg-green-500 rounded-full text-xs">
                {data.user.status}
              </span>
            </p>
          </div>
        </div>

        <div className="bg-white/20 p-6 rounded-lg backdrop-blur-sm">
          <h3 className="text-xl font-semibold mb-4">統計</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span>投稿数:</span>
              <span className="font-bold">{data.stats.totalPosts.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span>フォロワー:</span>
              <span className="font-bold">{data.stats.followers.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span>フォロー中:</span>
              <span className="font-bold">{data.stats.following.toLocaleString()}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 bg-white/20 p-6 rounded-lg backdrop-blur-sm">
        <h3 className="text-xl font-semibold mb-4">最近のアクティビティ</h3>
        <div className="space-y-2 max-h-40 overflow-y-auto">
          {data.recentActivity.map((activity) => (
            <div key={activity.id} className="flex justify-between items-center py-2 border-b border-white/20">
              <span>{activity.action}</span>
              <span className="text-sm opacity-75">{activity.timestamp}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function LoadingSkeleton() {
  return (
    <div className="bg-gray-200 p-8 rounded-lg shadow-lg animate-pulse">
      <div className="h-8 bg-gray-300 rounded w-1/3 mb-6"></div>
      
      <div className="mb-4 p-3 bg-gray-300 rounded-lg">
        <div className="h-4 bg-gray-400 rounded w-2/3 mb-2"></div>
        <div className="h-3 bg-gray-400 rounded w-1/2 mb-2"></div>
        <div className="h-3 bg-gray-400 rounded w-3/4"></div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gray-300 p-6 rounded-lg">
          <div className="h-6 bg-gray-400 rounded w-1/2 mb-4"></div>
          <div className="space-y-2">
            {Array.from({ length: 4 }, (_, i) => (
              <div key={i} className="h-4 bg-gray-400 rounded"></div>
            ))}
          </div>
        </div>

        <div className="bg-gray-300 p-6 rounded-lg">
          <div className="h-6 bg-gray-400 rounded w-1/2 mb-4"></div>
          <div className="space-y-3">
            {Array.from({ length: 3 }, (_, i) => (
              <div key={i} className="flex justify-between">
                <div className="h-4 bg-gray-400 rounded w-1/3"></div>
                <div className="h-4 bg-gray-400 rounded w-1/4"></div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-6 bg-gray-300 p-6 rounded-lg">
        <div className="h-6 bg-gray-400 rounded w-1/3 mb-4"></div>
        <div className="space-y-2">
          {Array.from({ length: 5 }, (_, i) => (
            <div key={i} className="h-4 bg-gray-400 rounded"></div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function DynamicContent() {
  return (
    <Suspense fallback={<LoadingSkeleton />}>
      <UserProfile />
    </Suspense>
  );
} 