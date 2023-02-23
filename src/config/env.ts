interface Env {
  ANIMEMO_API_URL: string
  GOOGLE_ID: string
  GOOGLE_SECRET: string
}

export const env = {
  ANIMEMO_API_URL: process.env.ANIMEMO_API_URL,
  GOOGLE_ID: process.env.GOOGLE_ID,
  GOOGLE_SECRET: process.env.GOOGLE_SECRET,
} as Env
