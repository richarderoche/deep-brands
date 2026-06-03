import { defineCliConfig } from 'sanity/cli'

const projectId = process.env.SANITY_STUDIO_PROJECT_ID || '<your project ID>'
const dataset = process.env.SANITY_STUDIO_DATASET || 'production'

export default defineCliConfig({
  api: {
    projectId: projectId,
    dataset: dataset,
  },
  studioHost: process.env.SANITY_STUDIO_STUDIO_HOST || '',
  deployment: { appId: 'cqb4y0xfcvajz6z3jyt1orgj', autoUpdates: false },
  typegen: {
    path: './src/**/*.{ts,tsx,js,jsx}',
    schema: '../sanity.schema.json',
    generates: './sanity.types.ts',
    overloadClientMethods: true,
  },
})
