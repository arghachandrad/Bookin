// eslint-disable-next-line
export default (func) => (req, res, next) =>
  Promise.resolve(func(req, res, next)).catch(next)
