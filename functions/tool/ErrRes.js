function ErrRes({res,error,errors,statusCode=400}){
  const errorsCur = errors? errors:[error];
  return res.json({error,errors}).status(statusCode);
}
module.exports = ErrRes