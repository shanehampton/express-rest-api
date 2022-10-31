function getSort(req) {
  // by default, sort by most recently updated
  let sort = { updatedAt: "desc" };
  try {
    let sortDetails = req.query.sort;
    let sortDetailsSplit = sortDetails.split(":");
    let sortParam = sortDetailsSplit[0];
    let sortType = sortDetailsSplit[1];
    sort[sortParam] = sortType;
  } catch (err) {}
  return sort;
}

module.exports = getSort;
