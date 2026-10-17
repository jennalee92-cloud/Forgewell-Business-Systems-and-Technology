import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { AssessmentPage } from './AssessmentPage'
import { NotFoundPage, ServiceDetailPage, ServicesOverviewPage } from './ServicePages'
import { servicesBySlug } from './service-data'

const pathname = window.location.pathname.replace(/\/+$/, '') || '/'
const serviceSlug = pathname.match(/^\/services\/([^/]+)$/)?.[1]
const service = serviceSlug ? servicesBySlug.get(serviceSlug) : undefined
const page = pathname === '/'
  ? <App />
  : pathname === '/services'
    ? <ServicesOverviewPage />
    : pathname === '/assessment'
      ? <AssessmentPage />
      : service
        ? <ServiceDetailPage service={service} />
        : <NotFoundPage />

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {page}
  </StrictMode>,
)
