import { defineConfig } from '@hey-api/openapi-ts';
import { ClientOptions } from '@hey-api/client-fetch';

export default defineConfig({
  input: `${process.env.TAX_RETURN_BASE_URL}/api-json`,
  output: 'src/clients/tax-return/gen',
  plugins: ['@hey-api/client-fetch'],
});

export const fetchConfig: ClientOptions = {
  baseUrl: process.env.TAX_RETURN_BASE_URL,
};
