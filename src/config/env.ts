interface Env {
  BFF_PROTOCOL?: string
  BFF_BASE_DOMAIN?: string
  BE_PROTOCOL?: string
  BE_BASE_DOMAIN?: string
}

export const env = {
  BFF_PROTOCOL: process.env.BFF_PROTOCOL || 'http',
  BFF_BASE_DOMAIN: process.env.BFF_BASE_DOMAIN || 'localhost:3000',
  BE_PROTOCOL: process.env.BE_PROTOCOL || 'http',
  BE_BASE_DOMAIN: process.env.BE_BASE_DOMAIN || 'localhost:8080',
} as Env
