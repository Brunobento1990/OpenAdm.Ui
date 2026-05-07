import * as Sentry from '@sentry/nextjs'

Sentry.init({
  dsn: 'https://cce804b2f2884882a700adeacb7ac31b@app.glitchtip.com/23126',
  tracesSampleRate: 0.01,
  autoSessionTracking: false
})
