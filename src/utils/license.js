import License from '../../const/license'
import { getName } from '../../utils/license'

export function getList() {
  return Object.values(License).map(license => ({
    value: license,
    name: getName(license),
  }))
}
