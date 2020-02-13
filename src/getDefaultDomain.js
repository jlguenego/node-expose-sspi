module.exports = sspi => () => {
  const str = sspi.GetUserNameEx("NameSamCompatible");
  const domain = str.split("\\")[0];
  return domain;
};

