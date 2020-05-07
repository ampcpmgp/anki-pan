import { default as Lang } from '../../const/lang'

// 参考: https://so-zou.jp/web-app/tech/data/code/language.htm
export function getName(lang) {
  switch (lang) {
    case Lang.JA_JP:
      return '日本語'
    case Lang.EN_US:
      return '英語(US)'
    case Lang.DE_DE:
      return 'ドイツ語'
    case Lang.EN_GB:
      return '英語(GB)'
    case Lang.ES_ES:
      return 'スペイン語'
    case Lang.ES_US:
      return 'スペイン語(US)'
    case Lang.FR_FR:
      return 'フランス語'
    case Lang.HI_IN:
      return 'ヒンディー語'
    case Lang.ID_ID:
      return 'インドネシア語'
    case Lang.IT_IT:
      return 'イタリア語'
    case Lang.KO_KR:
      return '韓国語'
    case Lang.NL_NL:
      return 'オランダ語'
    case Lang.PL_PL:
      return 'ポーランド語'
    case Lang.PT_BR:
      return 'ポルトガル語'
    case Lang.RU_RU:
      return 'ロシア語'
    case Lang.ZH_CN:
      return '中国語(CN)'
    case Lang.ZH_HK:
      return '中国語(HK)'
    case Lang.ZH_TW:
      return '中国語(TW)'
    default:
      console.error('Not Found')
  }
}

export function getList() {
  return Object.values(Lang).map(value => ({
    value,
    name: getName(value),
  }))
}
