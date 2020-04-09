import License from '../../const/license'
import { getName } from '../../utils/license'

export function getList() {
  return Object.values(License).map(license => ({
    key: license,
    value: getName(license),
  }))
}
