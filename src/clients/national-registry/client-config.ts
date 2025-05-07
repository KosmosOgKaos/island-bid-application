import { defineConfig } from '@hey-api/openapi-ts';
import { ClientOptions } from '@hey-api/client-fetch';

export default defineConfig({
  input: `${process.env.NATIONAL_REGISTRY_BASE_URL}/api-json`,
  output: 'src/clients/national-registry/gen',
  plugins: ['@hey-api/client-fetch'],
});

export const fetchConfig: ClientOptions = {
  baseUrl: process.env.NATIONAL_REGISTRY_BASE_URL,
};
