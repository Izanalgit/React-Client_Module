import crypto from 'crypto-browserify';
import { Buffer } from 'buffer';


// Encrypt Message with PUBLIC Key
function encryptMessageWithPublicKey(message, publicKey) {
    
    const bufferMessage = Buffer.from(message, 'utf8');
    const encryptedMessage = crypto.publicEncrypt(publicKey, bufferMessage);
    
    return encryptedMessage.toString('base64');
}

// Decrypt PRIVATE Key with provisional pass
function decryptPrivateKey(encryptedPrivateKey, password, ivHex, salt) {
    
    const encryptionKey = crypto.pbkdf2Sync(password, salt, 100000, 32, 'sha256');
    const decipher = crypto.createDecipheriv('aes-256-cbc', encryptionKey, Buffer.from(ivHex, 'hex'));

    let decryptedKey = decipher.update(encryptedPrivateKey, 'hex', 'utf8');
    decryptedKey += decipher.final('utf8');

    return decryptedKey;
}

// Decrypt Message with PRIVATE Key
function decryptMessageWithPrivateKey(encryptedMessage, privateKey) {
    
    const bufferMessage = Buffer.from(encryptedMessage, 'base64');
    const decryptedMessage = crypto.privateDecrypt(privateKey, bufferMessage);
    
    return decryptedMessage.toString('utf8');
}

export {
    encryptMessageWithPublicKey,
    decryptPrivateKey,
    decryptMessageWithPrivateKey
}