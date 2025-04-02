import crypto from 'crypto';

// 解密函數
function decrypt(encryptedText, key) {
    try {
        const [ivHex, encryptedHex] = encryptedText.split(':');
        const iv = Buffer.from(ivHex, 'hex');
        const encrypted = Buffer.from(encryptedHex, 'hex');
        const decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(key), iv);
        let decrypted = decipher.update(encrypted);
        decrypted = Buffer.concat([decrypted, decipher.final()]);
        return decrypted.toString('utf8');
    } catch (error) {
        throw new Error(`解密過程發生錯誤：${error.message}`);
    }
}

// 生成解密金鑰
function generateKey(base64Password) {
    try {
        // 直接使用 Base64 token 生成金鑰
        return crypto.createHash('sha256').update(base64Password).digest();
    } catch (error) {
        throw new Error(`金鑰生成失敗：${error.message}`);
    }
}

// 解密行程資料
function decryptItinerary(encryptedData, base64Password) {
    try {
        if (!encryptedData) {
            throw new Error('加密資料不能為空');
        }
        if (!base64Password) {
            throw new Error('Base64 密碼不能為空');
        }

        const key = generateKey(base64Password);
        const decryptedData = decrypt(encryptedData, key);
        
        // 嘗試解析 JSON 以驗證解密結果
        try {
            JSON.parse(decryptedData);
            return decryptedData;
        } catch (error) {
            throw new Error('解密結果不是有效的 JSON 格式');
        }
    } catch (error) {
        throw new Error(`行程解密失敗：${error.message}`);
    }
}

// 匯出解密函數
export {
    decrypt,
    generateKey,
    decryptItinerary
};

// 使用範例：
// const decryptedData = decryptItinerary(ITINERARY_DATA, 'eXBlcnRyYXZlbDIwMjU=');
// console.log(JSON.parse(decryptedData)); 