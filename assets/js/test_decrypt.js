// 測試解密功能
async function testDecrypt() {
    try {
        // 從 localStorage 取得 token
        const token = localStorage.getItem('token');
        if (!token) {
            console.error('找不到 token');
            return;
        }

        // 解密行程資料
        const decryptedData = await decryptItinerary(ITINERARY_DATA, token);
        console.log('解密成功：', decryptedData);
    } catch (error) {
        console.error('解密失敗：', error);
    }
}

// 執行測試
testDecrypt(); 