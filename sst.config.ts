/// <reference path="./.sst/platform/config.d.ts" />

export default $config({
  app(input) {
    return {
      name: "my-monorepo-app",
      home: "aws",
      removal: input.stage === "production" ? "retain" : "remove",
    };
  },
  async run() {
    // 'bastion: true' adds a secure jump box for external access/debugging if needed.
    const vpc = new sst.aws.Vpc("MyVpc", { bastion: true });

    const appDatabase = new sst.aws.Postgres("AppDatabase", {
      vpc,
      proxy: true,
      scaling: {
        min: "0.5 ACU",
      },
      dev: {
        command: "docker compose up",
        host: "localhost",
        port: 5432,
        username: "postgres",
        password: "mysecretpassword",
        database: "appdb",
      },
    });

    const fileBucket = new sst.aws.Bucket("FileBucket");

    const cluster = new sst.aws.Cluster("MyCluster", { vpc });

    const nestService = new sst.aws.Service("NestService", {
      cluster,
      vpc,
      image: {
        context: "packages/backend",
        dockerfile: "Dockerfile",
      },
      ports: [{ listen: "80/http", forward: "3000/http" }],
      link: [fileBucket, appDatabase],
      environment: {
        S3_BUCKET_NAME: fileBucket.name,
      },
      dev: {
        command: "npm run start:dev",
      },
    });

    const reactApp = new sst.aws.React("ReactApp", {
      path: "packages/frontend",
      buildCommand: "npm run build",
      buildOutput: "dist",
      environment: {
        VITE_APP_API_URL: nestService.url,
      },
    });

    return {
      NestApiUrl: nestService.url,
      ReactAppUrl: reactApp.url,
      DatabaseHost: appDatabase.host,
    };
  },
});
