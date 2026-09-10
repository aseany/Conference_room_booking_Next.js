// このファイルが サーバー側でだけ実行される ことを明示し、クライアントコンポーネントから誤って import されたら、ビルド時にエラーで止める ためのパッケージ
import 'server-only'
// Supabase の公式SDKパッケージから createClient という関数を取り出し
import { createClient } from '@supabase/supabase-js'

export const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_ANON_KEY!,
)
