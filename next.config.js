const { withSentryConfig } = require('@sentry/nextjs')

/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path')

/** @type {import('next').NextConfig} */

// Remove this if you're not using Fullcalendar features

module.exports = {
  trailingSlash: true,
  reactStrictMode: false,
  turbopack: {
    resolveAlias: {
      apexcharts: './node_modules/apexcharts-clevision'
    }
  },
  webpack: config => {
    config.resolve.alias = {
      ...config.resolve.alias,
      apexcharts: path.resolve(__dirname, './node_modules/apexcharts-clevision')
    }

    return config
  }
}

module.exports = withSentryConfig(module.exports, {
  authToken: process.env.NEXT_PUBLIC_SENTRY_AUTH_TOKEN,
  org: 'Open adm',
  project: 'open-adm-admin',
  sentryUrl: 'https://app.glitchtip.com/'
})
