// API/src/setup.ts
import alias from 'module-alias'
import { resolve } from 'path'
import 'reflect-metadata'

alias.addAlias('API', resolve(__dirname))
