import Redis from 'ioredis';

// Localhostta çalıştığımız için bu kadarı yeterli 
// sunucuda çalışıyor olsaydık sunucu özelliklerini eklememiz gerekemektedir.
const redis = new Redis();

export default redis;