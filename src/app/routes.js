import shortener from './shortener/routes'
import errors from './errors/routes'
import stats from './stats/routes'

export default [...stats, ...shortener, ...errors]
