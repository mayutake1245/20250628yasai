# 家庭菜園ガイド・交流サイト 🥕

初心者向けの家庭菜園ガイドと交流掲示板を備えた、匿名投稿可能なPWA対応のモダンWebアプリケーションです。野菜カテゴリー機能、統計機能、美しい野菜アイコンを備えたコミュニティプラットフォームです。

## 🌟 特徴

### 基本機能
- **投稿機能**: 名前、タイトル、カテゴリー、メッセージを投稿
- **野菜カテゴリー**: 11種類の野菜カテゴリーから選択
- **表示機能**: 投稿一覧の表示
- **編集機能**: 投稿内容の編集
- **削除機能**: 個別投稿の削除
- **ソート機能**: 日時順・名前順・カテゴリー順でソート
- **画像投稿**: 複数画像のアップロード・プレビュー機能

### 🆕 初心者向け家庭菜園ガイド
- **基本知識**: 日当たり、水やり、土づくり、温度管理の基本
- **トマトの育て方**: 種まきから収穫までの詳細な手順
- **にんじんの育て方**: 土づくりが重要な根菜類の育て方
- **レタスの育て方**: 涼しい時期に育てる葉物野菜の育て方
- **コツ・注意点**: 初心者におすすめの野菜、害虫対策、天候対策、記録の付け方
- **タブ機能**: 各セクションをタブで切り替えて閲覧

### 野菜カテゴリー
- 🍅 **トマト** - 赤くて美味しいトマト
- 🥕 **にんじん** - オレンジ色のにんじん
- 🥬 **レタス** - 緑のレタス
- 🥒 **きゅうり** - 爽やかなきゅうり
- 🥦 **ブロッコリー** - 栄養豊富なブロッコリー
- 🫑 **ピーマン** - カラフルなピーマン
- 🧅 **たまねぎ** - 辛いたまねぎ
- 🥔 **じゃがいも** - 万能なじゃがいも
- 🥬 **小松菜** - 栄養豊富な葉物野菜
- 🌿 **ハーブ系** - バジル、ミント、ローズマリーなど
- 🌱 **その他** - その他の野菜

### 通知機能
- **通知確認**: 右上の通知ベルアイコンをクリック
- **未読通知**: 通知一覧で未読件数を確認

### デザイン
- **野菜テーマ**: 緑系のカラーパレット
- **野菜アイコン**: 各カテゴリーに野菜の絵文字
- **レスポンシブデザイン**: すべてのデバイスに対応
- **アニメーション**: 野菜の成長をイメージしたアニメーション
- **通知システム**: 野菜テーマの通知表示

### データ管理
- **Supabase**: PostgreSQLデータベース
- **画像ストレージ**: Supabase Storage
- **セキュリティ**: XSS攻撃防止、入力検証

## 🚀 使用方法

### 投稿の作成
1. **お名前**を入力（匿名可）
2. **タイトル**を入力
3. **カテゴリー**を選択（野菜を選ぶ）
4. **メッセージ**を入力
5. **画像**をアップロード（オプション、最大5枚、50MBまで）
6. **投稿する**ボタンをクリック

### 投稿の管理
- **編集**: 各投稿の「編集」ボタンをクリック
- **削除**: 各投稿の「削除」ボタンをクリック
- **ソート**: 「日時順」「名前順」「カテゴリー順」ボタンでソート

### 家庭菜園ガイドの活用
1. **基本知識タブ**: 家庭菜園の基本を学習
2. **野菜別タブ**: トマト、にんじん、レタスの育て方を確認
3. **コツ・注意点タブ**: 実践的なアドバイスを参考に
4. **ステップ表示**: 各野菜の育て方を段階的に学習

### 通知機能
- **通知確認**: 右上の通知ベルアイコンをクリック
- **未読通知**: 通知一覧で未読件数を確認

## 🛠️ 技術仕様

### フロントエンド
- **Next.js**: 14.2.30 (App Router)
- **TypeScript**: 5.x
- **Tailwind CSS**: 3.4.17
- **shadcn/ui**: モダンなUIコンポーネント
- **Zustand**: 状態管理
- **TanStack Query**: データフェッチング
- **React Hook Form + Zod**: フォーム管理・検証

### バックエンド
- **Supabase**: PostgreSQL + Storage + Auth
- **API Routes**: Next.js API Routes
- **リアルタイム**: Supabase Realtime

### 開発・デプロイ
- **パッケージ管理**: pnpm
- **デプロイ**: Vercel
- **CI/CD**: GitHub Actions
- **PWA**: オフライン対応・プッシュ通知

### 使用ライブラリ
- **Lucide React**: アイコン
- **Sonner**: トースト通知
- **React Hook Form**: フォーム管理
- **Zod**: スキーマ検証

### ブラウザ対応
- Chrome (推奨)
- Firefox
- Safari
- Edge

## 📁 プロジェクト構成

```
garden-guide-app/
├── app/                          # Next.js App Router
├── components/                   # UIコンポーネント
├── lib/                         # ユーティリティ・設定
├── hooks/                       # カスタムReactフック
├── stores/                      # Zustand状態管理
├── types/                       # TypeScript型定義
├── utils/                       # 汎用ユーティリティ関数
├── constants/                   # 定数定義
├── styles/                      # グローバルスタイル
├── public/                      # 静的ファイル
├── docs/                        # ドキュメント
├── tests/                       # テストファイル
├── .github/                     # GitHub Actions
├── package.json                 # 依存関係・スクリプト
├── next.config.js              # Next.js設定
├── tailwind.config.js          # Tailwind CSS設定
├── tsconfig.json               # TypeScript設定
└── README.md                   # このファイル
```

## 🎨 カスタマイズ

### 色の変更
`tailwind.config.js`の以下の変数を変更してカラーテーマをカスタマイズできます：

```javascript
// メインカラー
colors: {
  primary: {
    50: '#f0fdf4',
    500: '#22c55e',
    900: '#14532d',
  }
}
```

### 野菜カテゴリーの追加
`constants/categories.ts`に新しい野菜を追加：

```typescript
export const categories = [
  // 既存のカテゴリー...
  {
    id: 'eggplant',
    name: 'なす',
    emoji: '🍆',
    color: '#8B4513'
  },
  // 新しいカテゴリーを追加
];
```

### 統計機能の拡張
`components/stats/`に新しい統計コンポーネントを追加：

```typescript
// 例：月間投稿数
const monthlyPosts = posts.filter(post => {
  const postDate = new Date(post.created_at);
  const now = new Date();
  return postDate.getMonth() === now.getMonth() && 
         postDate.getFullYear() === now.getFullYear();
}).length;
```

## 🌐 デプロイ

このアプリケーションは以下の方法でデプロイできます：

1. **Vercel**: 推奨、自動デプロイ
2. **Netlify**: 静的サイトホスティング
3. **Supabase**: フルスタックプラットフォーム
4. **自前サーバー**: Docker + Nginx

## 📱 レスポンシブ対応

- **デスクトップ**: 1200px以上
- **タブレット**: 768px - 1199px
- **モバイル**: 767px以下

## 🔧 開発者向け

### ローカル開発
```bash
# 依存関係のインストール
pnpm install

# 開発サーバーの起動
pnpm dev

# ビルド
pnpm build

# 本番サーバーの起動
pnpm start
```

### 環境変数設定
`.env.local`ファイルを作成：

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

### データベース設定
Supabaseで以下のテーブルを作成：
- `categories` - カテゴリーテーブル
- `posts` - 投稿テーブル
- `favorites` - お気に入りテーブル
- `notifications` - 通知テーブル

### デバッグ
ブラウザの開発者ツールでコンソールを確認し、エラーがないかチェックしてください。

## 📄 ライセンス

このプロジェクトはMITライセンスの下で公開されています。

## 🤝 貢献

プルリクエストやイシューの報告を歓迎します！

## 🔮 今後の予定

- [ ] 野菜レシピ機能
- [ ] 野菜の育て方ガイド拡充
- [ ] ユーザー認証機能
- [ ] リアルタイムチャット
- [ ] 野菜クイズ機能
- [ ] 季節の野菜カレンダー

---

**家庭菜園ガイド・交流サイト** - 初心者から上級者まで楽しめる野菜コミュニティ 🥕 

# パッケージ追加コマンド例（開発者向け）
```bash
pnpm add next@14.2.30 react react-dom tailwindcss@3.4.17 @tanstack/react-query@5.80.7 zustand@5.0.5 @hookform/resolvers@3.3.4 react-hook-form@7.58.1 zod@3.25.67 lucide-react@0.517.0 sonner@2.0.5 shadcn/ui
pnpm add -D typescript@5.4.5
``` 