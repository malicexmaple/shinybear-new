import fs from 'fs';
import path from 'path';
import { log } from './vite';

interface AssetInfo {
  filename: string;
  size: number;
  lastModified: Date;
  isGif: boolean;
  isUsed: boolean;
}

export class AssetManager {
  private assetsPath: string;
  private maxMemoryUsage: number = 500 * 1024 * 1024; // 500MB threshold

  constructor() {
    this.assetsPath = path.resolve(process.cwd(), 'attached_assets');
  }

  async getAssetInfo(): Promise<AssetInfo[]> {
    try {
      const files = await fs.promises.readdir(this.assetsPath);
      const assets: AssetInfo[] = [];

      for (const file of files) {
        const filePath = path.join(this.assetsPath, file);
        const stats = await fs.promises.stat(filePath);
        
        if (stats.isFile()) {
          assets.push({
            filename: file,
            size: stats.size,
            lastModified: stats.mtime,
            isGif: file.toLowerCase().endsWith('.gif'),
            isUsed: false // This would need to be determined by checking storage
          });
        }
      }

      return assets.sort((a, b) => b.size - a.size);
    } catch (error) {
      log(`Error reading assets: ${error}`);
      return [];
    }
  }

  async getTotalAssetSize(): Promise<number> {
    const assets = await this.getAssetInfo();
    return assets.reduce((total, asset) => total + asset.size, 0);
  }

  async checkMemoryHealth(): Promise<{
    status: 'healthy' | 'warning' | 'critical';
    details: {
      processMemory: number;
      assetSize: number;
      totalMemory: number;
      recommendation?: string;
    };
  }> {
    const usage = process.memoryUsage();
    const assetSize = await this.getTotalAssetSize();
    const totalMemory = usage.heapUsed + usage.external;

    let status: 'healthy' | 'warning' | 'critical' = 'healthy';
    let recommendation: string | undefined;

    if (totalMemory > this.maxMemoryUsage) {
      status = 'critical';
      recommendation = 'Consider cleaning up unused assets or reducing GIF file sizes';
    } else if (totalMemory > this.maxMemoryUsage * 0.8) {
      status = 'warning';
      recommendation = 'Monitor memory usage closely, consider optimizing assets';
    }

    return {
      status,
      details: {
        processMemory: Math.round(totalMemory / 1024 / 1024),
        assetSize: Math.round(assetSize / 1024 / 1024),
        totalMemory: Math.round(totalMemory / 1024 / 1024),
        recommendation
      }
    };
  }

  async optimizeAssets(): Promise<{
    cleaned: number;
    spaceFreed: number;
    errors: string[];
  }> {
    const assets = await this.getAssetInfo();
    let cleaned = 0;
    let spaceFreed = 0;
    const errors: string[] = [];

    // Clean up duplicate files (files with same name but different timestamps)
    const duplicates = this.findDuplicates(assets);
    
    for (const duplicate of duplicates) {
      try {
        await fs.promises.unlink(path.join(this.assetsPath, duplicate.filename));
        cleaned++;
        spaceFreed += duplicate.size;
        log(`Removed duplicate: ${duplicate.filename}`);
      } catch (error) {
        errors.push(`Failed to remove ${duplicate.filename}: ${error}`);
      }
    }

    return { cleaned, spaceFreed, errors };
  }

  private findDuplicates(assets: AssetInfo[]): AssetInfo[] {
    const seen = new Set<string>();
    const duplicates: AssetInfo[] = [];

    for (const asset of assets) {
      // Extract base name without timestamp
      const baseName = asset.filename.replace(/_\d+\.(gif|png|jpg|jpeg)$/i, '');
      
      if (seen.has(baseName)) {
        duplicates.push(asset);
      } else {
        seen.add(baseName);
      }
    }

    return duplicates;
  }
}

export const assetManager = new AssetManager();