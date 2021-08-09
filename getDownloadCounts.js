const axios = require('axios');
const camelcase = require('camelcase');

const url = (userId, repository) =>
  `https://api.github.com/repos/${userId}/${repository}/releases`;

const extract = (keys, object) => {
  const ret = {};
  for (const key of keys) {
    ret[camelcase(key)] = object[key];
  }
  return ret;
};

module.exports = async ({ userId, tagName, repository, name }) => {
  if (!userId && !repository) {
    throw new Error('userId and repository must be given.');
  }

  const resp = (await axios.get(url(userId, repository))).data;
  const extracted = resp.map((info) => {
    info.assets = info.assets.map((fileInfo) => 
      extract(['name', 'download_count'], fileInfo)
    );

    return extract(['name', 'assets', 'tag_name'], info);
  });

  if (tagName) {
    return extracted.filter((info) => info.tagName === tagName);
  }

  if (name) {
    return extracted.filter((info) => info.name === name);
  }

  return extracted;
};
