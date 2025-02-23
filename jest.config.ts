import type { Config } from 'jest'
import nextJest from 'next/jest.js'

const createJestConfig = nextJest({
  dir: './',
})

const config: Config = {
  clearMocks: true,
  collectCoverage: true,
  coverageProvider: 'v8',
  moduleNameMapper: {
    '^@/components/(.*)$': '<rootDir>/components/$1',
    '^Utils/(.*)$': '<rootDir>/src/Utils/$1',
    '^Context/(.*)$': '<rootDir>/src/Context/$1',
    'react-leaflet': '<rootDir>/src/mocks/reactLeafletMock.ts',
    '^hooks/(.*)$': '<rootDir>/src/hooks/$1',
  },
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  testEnvironment: 'jsdom',
}

export default createJestConfig(config)
