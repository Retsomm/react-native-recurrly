# Recurly — 訂閱管理 App

一款使用 React Native (Expo) 開發的訂閱管理應用程式，幫助使用者追蹤所有軟體訂閱的費用與續約日期。

## 功能特色

- **Google 登入** — 透過 Clerk SSO 完成 OAuth 驗證
- **訂閱儀表板** — 首頁顯示帳戶餘額、即將到期的續約項目與完整訂閱清單
- **新增訂閱** — 以 Modal 表單輸入名稱、金額、計費週期（月繳／年繳）與分類，並即時預覽服務圖示
- **搜尋與篩選** — 在訂閱清單頁依名稱或分類即時過濾
- **每月洞察** — 以長條圖呈現每週支出趨勢，並計算當月訂閱總費用
- **本地持久化** — 訂閱資料透過 `AsyncStorage` 儲存於裝置本機

## 技術棧

| 層級 | 技術 |
|------|------|
| 框架 | React Native 0.81 + Expo 54 |
| 語言 | TypeScript 5.9 |
| 路由 | Expo Router v6（file-based routing） |
| 樣式 | NativeWind v4（Tailwind CSS） |
| 認證 | Clerk (`@clerk/expo`) |
| 儲存 | AsyncStorage |
| 日期處理 | Day.js |
| 字型 | Plus Jakarta Sans |

## 專案結構

```
app/
  _layout.tsx              # Root layout，掛載 ClerkProvider & SubscriptionsProvider
  (auth)/
    sign-in.tsx            # Google 登入頁
    sign-up.tsx            # 註冊頁
  (tab)/
    _layout.tsx            # Bottom tab navigator
    index.tsx              # 首頁（儀表板）
    subscriptions.tsx      # 訂閱清單 + 搜尋
    insights.tsx           # 每月洞察
    settings.tsx           # 設定
  subscriptions/
    [id].tsx               # 訂閱詳情頁

components/
  SubscriptionCard.tsx     # 可展開的訂閱卡片
  UpcomingSubscriptionCard.tsx  # 即將到期卡片（橫向捲動）
  CreateSubscriptionModal.tsx   # 新增訂閱表單 Modal
  SubscriptionIcon.tsx     # 自動對應服務圖示
  ListHeading.tsx          # 清單標題元件

context/
  SubscriptionsContext.tsx # 訂閱全域狀態（含 AsyncStorage 讀寫）

lib/
  utils.ts                 # 工具函式（formatCurrency 等）
```

## 環境設定

1. 安裝依賴套件

   ```bash
   npm install
   ```

2. 建立 `.env` 檔案並填入 Clerk 金鑰

   ```env
   EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
   ```

3. 啟動開發伺服器

   ```bash
   npx expo start
   ```

接著可選擇以下方式執行：

- **iOS Simulator** — 按 `i`
- **Android Emulator** — 按 `a`
- **Expo Go** — 掃描 QR Code
- **Web** — 按 `w`

## 訂閱資料模型

```ts
interface Subscription {
  id: string;
  name: string;
  price: number;          // 以 USD 計價
  billing: string;        // 'Monthly' | 'Yearly'
  category?: string;      // 分類（Design / AI Tools / …）
  status?: string;        // 'active' | 'cancelled'
  startDate?: string;     // ISO 8601
  renewalDate?: string;   // ISO 8601
  currency?: string;
}
```

支援的分類：Design、Developer Tools、AI Tools、Productivity、Entertainment、Finance、Health、Other

## 開發指令

| 指令 | 說明 |
|------|------|
| `npx expo start` | 啟動 Metro bundler |
| `npx expo start --ios` | 直接開啟 iOS Simulator |
| `npx expo start --android` | 直接開啟 Android Emulator |
| `npx expo start --web` | 開啟瀏覽器版本 |
| `expo lint` | 執行 ESLint |
