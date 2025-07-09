'use server';

import { ADMIN_CONFIG } from '@/lib/config';

export async function authenticateAdmin(pin) {
  try {
    // Validate PIN
    if (!pin) {
      return {
        success: false,
        error: 'PIN is required'
      };
    }

    // Check if PIN matches
    if (pin === ADMIN_CONFIG.PIN) {
      return {
        success: true,
        message: 'Authentication successful'
      };
    } else {
      // Add small delay to prevent brute force attacks
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      return {
        success: false,
        error: 'Invalid PIN'
      };
    }
  } catch (error) {
    console.error('Admin auth error:', error);
    return {
      success: false,
      error: 'Authentication failed'
    };
  }
} 