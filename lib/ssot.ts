/**
 * SSOT (Single Source of Truth) JSON Management
 */

import fs from 'fs/promises';
import path from 'path';
import { SSOT } from './types';

let cachedSSOT: SSOT | null = null;
let lastSyncTime: Date | null = null;

const SSOT_FILE_PATH = process.env.SSOT_FILE_PATH || './public/JVTO_SSOT_v4_0_CLEAN.json';
const SYNC_INTERVAL = parseInt(process.env.SSOT_SYNC_INTERVAL || '86400000'); // 24 hours

/**
 * Load SSOT JSON from file system
 */
export async function loadSSOT(): Promise<SSOT> {
  try {
    const now = new Date();

    // Return cached if still valid
    if (cachedSSOT && lastSyncTime) {
      const timeSinceSync = now.getTime() - lastSyncTime.getTime();
      if (timeSinceSync < SYNC_INTERVAL) {
        return cachedSSOT;
      }
    }

    // Load from file
    const filePath = path.resolve(process.cwd(), SSOT_FILE_PATH);
    const fileContent = await fs.readFile(filePath, 'utf-8');
    const ssot = JSON.parse(fileContent);

    // Validate SSOT structure
    if (!ssot.version) {
      throw new Error('Invalid SSOT format: missing version');
    }

    cachedSSOT = ssot;
    lastSyncTime = now;

    console.log(`SSOT loaded successfully at ${now.toISOString()}`);
    return ssot;
  } catch (error) {
    console.error('Error loading SSOT:', error);

    // Return cached version if load fails
    if (cachedSSOT) {
      console.warn('Using cached SSOT due to load error');
      return cachedSSOT;
    }

    throw new Error(`Failed to load SSOT: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

/**
 * Get specific section from SSOT
 */
export async function getSSSTSection(section: string): Promise<any> {
  const ssot = await loadSSOT();
  return ssot[section] || null;
}

/**
 * Validate data against SSOT schema
 */
export async function validateAgainstSSO(
  data: any,
  schema: string
): Promise<boolean> {
  try {
    const ssot = await loadSSOT();
    const schemaDefinition = ssot.schemas?.[schema];

    if (!schemaDefinition) {
      console.warn(`Schema not found: ${schema}`);
      return false;
    }

    // Basic validation - can be extended
    for (const field of schemaDefinition.required || []) {
      if (!(field in data)) {
        return false;
      }
    }

    return true;
  } catch (error) {
    console.error('Validation error:', error);
    return false;
  }
}

/**
 * Get sync status
 */
export function getSSSTStatus() {
  return {
    loaded: cachedSSOT !== null,
    lastSync: lastSyncTime?.toISOString() || null,
    cacheValid: lastSyncTime ? new Date().getTime() - lastSyncTime.getTime() < SYNC_INTERVAL : false,
  };
}

/**
 * Force reload SSOT
 */
export async function reloadSSO(): Promise<SSOT> {
  cachedSSOT = null;
  lastSyncTime = null;
  return loadSSOT();
}
