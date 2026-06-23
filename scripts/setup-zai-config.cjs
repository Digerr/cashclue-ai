/**
 * Generate .z-ai-config from environment variables at build/runtime.
 * This allows the z-ai-web-dev-sdk to be configured via Vercel env vars
 * instead of a committed file.
 *
 * Required env vars:
 *   Z_AI_BASE_URL   - e.g. https://api.z.ai/v1
 *   Z_AI_API_KEY    - your API key
 *   Z_AI_TOKEN      - JWT token (optional)
 *   Z_AI_CHAT_ID    - chat ID (optional)
 *   Z_AI_USER_ID    - user ID (optional)
 */
const fs = require('fs');
const path = require('path');

const config = {
  baseUrl: process.env.Z_AI_BASE_URL || '',
  apiKey: process.env.Z_AI_API_KEY || '',
  chatId: process.env.Z_AI_CHAT_ID || '',
  token: process.env.Z_AI_TOKEN || '',
  userId: process.env.Z_AI_USER_ID || '',
};

if (!config.baseUrl || !config.apiKey) {
  console.warn('⚠️  Z_AI_BASE_URL or Z_AI_API_KEY not set — .z-ai-config will be empty');
}

const targetPath = path.join(process.cwd(), '.z-ai-config');
fs.writeFileSync(targetPath, JSON.stringify(config, null, 2));
console.log(`✓ Wrote .z-ai-config to ${targetPath}`);
