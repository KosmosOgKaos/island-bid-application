/// <reference path="./.sst/platform/config.d.ts" />
export default $config({
  app(input) {
    return {
      name: 'island-bid-backend-application',
      removal: input?.stage === 'production' ? 'retain' : 'remove',
      protect: ['production'].includes(input?.stage),
      home: 'aws',
    };
  },

  async run() {
    const vpc = new sst.aws.Vpc('BidTaxApplicationVpc');
    const cluster = new sst.aws.Cluster('BidTaxApplicationCluster', { vpc });

    const TAX_RETURN_BASE_URL = process.env.TAX_RETURN_BASE_URL ?? '';
    const NATIONAL_REGISTRY_BASE_URL = process.env.TAX_RETURN_BASE_URL ?? '';

    new sst.aws.Service('BidTaxApplicationService', {
      cluster,
      containers: [
        {
          name: 'backend',
          image: {
            dockerfile: 'Dockerfile',
            args: {
              TAX_RETURN_BASE_URL_ARG: TAX_RETURN_BASE_URL,
              NATIONAL_REGISTRY_BASE_URL_ARG: NATIONAL_REGISTRY_BASE_URL,
            },
          },
          environment: {
            TAX_RETURN_BASE_URL,
            NATIONAL_REGISTRY_BASE_URL,
          },
        },
      ],
      loadBalancer: {
        rules: [
          { listen: '80/http', forward: '3000/http', container: 'backend' },
        ],
      },
      dev: {
        command: 'yarn start:dev',
      },
    });
  },
});
