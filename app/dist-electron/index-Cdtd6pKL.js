import { C as CredentialsProviderError, s as setCredentialFeature } from "./main-CngRFuOL.js";
import { readFileSync } from "fs";
const fromWebToken = (init) => async (awsIdentityProperties) => {
  var _a;
  (_a = init.logger) == null ? void 0 : _a.debug("@aws-sdk/credential-provider-web-identity - fromWebToken");
  const { roleArn, roleSessionName, webIdentityToken, providerId, policyArns, policy, durationSeconds } = init;
  let { roleAssumerWithWebIdentity } = init;
  if (!roleAssumerWithWebIdentity) {
    const { getDefaultRoleAssumerWithWebIdentity } = await import("./index-amka-4UQ.js");
    roleAssumerWithWebIdentity = getDefaultRoleAssumerWithWebIdentity({
      ...init.clientConfig,
      credentialProviderLogger: init.logger,
      parentClientConfig: {
        ...awsIdentityProperties == null ? void 0 : awsIdentityProperties.callerClientConfig,
        ...init.parentClientConfig
      }
    }, init.clientPlugins);
  }
  return roleAssumerWithWebIdentity({
    RoleArn: roleArn,
    RoleSessionName: roleSessionName ?? `aws-sdk-js-session-${Date.now()}`,
    WebIdentityToken: webIdentityToken,
    ProviderId: providerId,
    PolicyArns: policyArns,
    Policy: policy,
    DurationSeconds: durationSeconds
  });
};
const ENV_TOKEN_FILE = "AWS_WEB_IDENTITY_TOKEN_FILE";
const ENV_ROLE_ARN = "AWS_ROLE_ARN";
const ENV_ROLE_SESSION_NAME = "AWS_ROLE_SESSION_NAME";
const fromTokenFile = (init = {}) => async () => {
  var _a;
  (_a = init.logger) == null ? void 0 : _a.debug("@aws-sdk/credential-provider-web-identity - fromTokenFile");
  const webIdentityTokenFile = (init == null ? void 0 : init.webIdentityTokenFile) ?? process.env[ENV_TOKEN_FILE];
  const roleArn = (init == null ? void 0 : init.roleArn) ?? process.env[ENV_ROLE_ARN];
  const roleSessionName = (init == null ? void 0 : init.roleSessionName) ?? process.env[ENV_ROLE_SESSION_NAME];
  if (!webIdentityTokenFile || !roleArn) {
    throw new CredentialsProviderError("Web identity configuration not specified", {
      logger: init.logger
    });
  }
  const credentials = await fromWebToken({
    ...init,
    webIdentityToken: readFileSync(webIdentityTokenFile, { encoding: "ascii" }),
    roleArn,
    roleSessionName
  })();
  if (webIdentityTokenFile === process.env[ENV_TOKEN_FILE]) {
    setCredentialFeature(credentials, "CREDENTIALS_ENV_VARS_STS_WEB_ID_TOKEN", "h");
  }
  return credentials;
};
export {
  fromTokenFile,
  fromWebToken
};
