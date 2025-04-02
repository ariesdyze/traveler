# 行程更新注意事項

## 格式規範

### 1. 連結格式
- 如果連結已經在 `links` 陣列中定義，就不要在 `details` 中重複出現 `>>連結顯示名稱|連結url` 的格式
- 所有連結應該放在 `links` 陣列中，格式為：
```json
"links": [
    {"title": "連結顯示名稱", "url": "連結網址"}
]
```

### 2. 提醒事項格式
- 使用 `<div>` 元素包裝提醒事項
- 格式範例：
```html
<div class="bg-amber-100 p-2 rounded text-amber-700 text-sm font-bold mb-3">
【提醒事項內容】
</div>
```

### 3. 換行處理
- HTML 中的換行使用 `<br>` 而不是 `\n`
- 多行內容之間使用 `<br>` 分隔

### 4. 住宿資訊格式
```html
預訂金額💰<br>
- （2人）￥XX,XXX<br>
- （3人）￥XX,XXX<br>
<div class="bg-amber-100 p-2 rounded text-amber-700 text-sm font-bold mb-3">
【住宿資訊】<br>
- 入住：YYYY/M/D(週) HH:MM後<br>
- 退房：YYYY/M/D(週) HH:MM前<br>
- 住宿天數：X晚
</div>
```

## 更新步驟

1. 檢查天氣資訊
   - condition（天氣狀況）
   - temperature（溫度範圍）
   - rainProb（降雨機率）

2. 行程項目順序
   - 依照時間順序排列
   - 確保每個項目的 `time` 格式正確（起始時間-結束時間）

3. 交通資訊
   - 使用 `nextTransportation` 指定下一個地點的交通方式
   - 格式：`"交通方式 · 距離或時間"`
   - 例：`"開車 · 約45公里，1小時20分"`

4. 必要欄位檢查
   - id：唯一識別碼
   - time：時間範圍
   - title：標題
   - details：詳細資訊（如果有）
   - mapUrl：地圖連結（如果有）
   - businessHours：營業時間（如果有）
   - ticket：門票資訊（如果有）

## 特殊處理

1. 機場相關
   - 入境/出境資訊使用表情符號：🛬/🛫
   - 航班資訊使用特定格式和標籤顏色

2. 用餐地點
   - 需標註營業時間
   - 如果需要預約，在標題加註「（需預約）」

3. 景點資訊
   - 包含營業時間和門票價格（如果有）
   - 重要提醒使用黃色背景區塊標示

4. 交通工具圖示
   - 步行：`<i class="fas fa-walking"></i>`
   - 開車：`<i class="fas fa-car"></i>`
   - 地鐵：`<i class="fas fa-subway"></i>`
   - 巴士：`<i class="fas fa-bus"></i>`
   - 計程車：`<i class="fas fa-taxi"></i>` 