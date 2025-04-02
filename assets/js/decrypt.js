// 解密行程資料
async function decryptItinerary(encryptedData, base64Password) {
    try {
        // 使用 SHA-256 產生 256 位元的 AES 金鑰
        const keyBuffer = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(base64Password));
        const key = await crypto.subtle.importKey(
            'raw',
            keyBuffer,
            { name: 'AES-CBC' },
            false,
            ['decrypt']
        );

        // 解析加密資料（格式：iv:encrypted）
        const [ivHex, encryptedHex] = encryptedData.split(':');
        
        // 將十六進制字串轉換為 Uint8Array
        const hexToUint8Array = (hex) => {
            const bytes = new Uint8Array(hex.length / 2);
            for (let i = 0; i < hex.length; i += 2) {
                bytes[i / 2] = parseInt(hex.substr(i, 2), 16);
            }
            return bytes;
        };
        
        const iv = hexToUint8Array(ivHex);
        const encrypted = hexToUint8Array(encryptedHex);

        // 解密資料
        const decryptedData = await crypto.subtle.decrypt(
            { name: 'AES-CBC', iv: iv },
            key,
            encrypted
        );
        // 將解密後的資料轉換為字串
        return new TextDecoder().decode(decryptedData);
    } catch (error) {
        console.error('解密失敗：', error);
        throw error;
    }
}

// 檢查使用者登入狀態
async function checkAuth(ITINERARY_DATA, token) {
    try {

        if (!token) {
            localStorage.removeItem('travel_auth');
            window.location.href = '/index.html';
            return;
        }
        console.log('token:', token);
        // 解密行程資料
        const itineraryString = await decryptItinerary(ITINERARY_DATA, token);
        
        // 將字串轉換為 JavaScript 物件
        // 由於字串可能包含反引號等非 JSON 語法，使用 Function 建構函式來安全地轉換
        try {
            const itineraryData = (new Function(`return ${itineraryString}`))();
            return itineraryData;
        } catch (parseError) {
            console.error('無法解析行程資料：', parseError);
            throw parseError;
        }
    } catch (error) {
        console.error('驗證失敗：', error);
        localStorage.removeItem('travel_auth');
        window.location.href = '/index.html';
    }
}

// 匯出函數
export {
    decryptItinerary,
    checkAuth
}; 