// src/setupTests.js
import { expect, afterEach } from 'vitest'
import { cleanup } from '@testing-library/react'
import * as matchers from '@testing-library/jest-dom/matchers'

// Étendre Vitest avec les matchers de jest-dom
expect.extend(matchers)

// Nettoyer après chaque test
afterEach(() => {
  cleanup()
})