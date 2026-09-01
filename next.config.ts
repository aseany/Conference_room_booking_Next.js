// Next.jsアプリ全体のビルド・実行時の挙動を設定するファイルです。プロジェクトのルートに1つ置かれ、NextConfig 型のオブジェクトをデフォルトエクスポートします。
import path from "path";
import type { NextConfig } from "next";

// NextConfig は、Next.js が提供する TypeScript の型定義
const nextConfig: NextConfig = {
  // Turbopack開発元vercelのバンドラーに
  turbopack: {
    root: path.join(__dirname),
  },
  // ↓Next.js 16 系の新機能で、next dev 実行時に AI コーディングエージェント(Claude Code など)を検出すると、自動的に AGENTS.md や CLAUDE.md 。デフォルトは true。
  agentRules: false,
};

export default nextConfig;
