module.exports = async ({core}) => {
  const tag = process.env.RELEASE_TAG;
  const out = {};

  core.info(`Release Tag: ${tag}`);

  // parse release tag into parts
  const regex = /^v([1-4])\.(\d+)\.(\d+)$/;
  const matched = tag.match(regex);

  if (matched === null || matched.length !== 4) {
    // cannot continue without a parsable version number
    const message = `Unable to parse "${tag}" into major, minor, and patch version numbers.`;
    core.setFailed(message);
  }
  else {
    // save parsed values
    out.version_project = parseInt(matched[1]);
    out.version_review  = parseInt(matched[2]);
    out.version_patch   = parseInt(matched[3]);
    out.version_number  = `v${out.version_project}.${out.version_review}.${out.version_patch}`;
  }

  // set and return results
  core.startGroup('Setting output...');
  for (const property in out) {
    // output and set result
    console.log(`${property}: ${out[property]}`);
    core.setOutput(property, out[property]);
  }
  core.endGroup();

  return out;
}