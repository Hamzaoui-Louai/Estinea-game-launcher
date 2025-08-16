var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
import { v as resolveAwsSdkSigV4Config, w as normalizeProvider, x as getSmithyContext, y as EndpointCache, A as awsEndpointFunctions, B as customEndpointFunctions, z as resolveEndpoint, D as toUtf8, F as fromUtf8, t as parseUrl, G as NoOpLogger, J as AwsSdkSigV4Signer, K as toBase64, L as fromBase64, M as emitWarningIfUnsupportedVersion, O as resolveDefaultsModeConfig, Q as emitWarningIfUnsupportedVersion$1, u as loadConfig, R as streamCollector, S as Hash, N as NodeHttpHandler, T as createDefaultUserAgentProvider, U as calculateBodyLength, V as NODE_APP_ID_CONFIG_OPTIONS, W as NODE_USE_FIPS_ENDPOINT_CONFIG_OPTIONS, X as NODE_USE_DUALSTACK_ENDPOINT_CONFIG_OPTIONS, Y as NODE_RETRY_MODE_CONFIG_OPTIONS, Z as DEFAULT_RETRY_MODE, _ as NODE_REGION_CONFIG_FILE_OPTIONS, $ as NODE_REGION_CONFIG_OPTIONS, a0 as NODE_MAX_ATTEMPT_CONFIG_OPTIONS, a1 as NODE_AUTH_SCHEME_PREFERENCE_OPTIONS, a2 as loadConfigsForDefaultMode, a3 as getAwsRegionExtensionConfiguration, a4 as getDefaultExtensionConfiguration, a5 as getHttpHandlerExtensionConfiguration, a6 as resolveAwsRegionExtensionConfiguration, a7 as resolveDefaultRuntimeConfig, a8 as resolveHttpHandlerRuntimeConfig, a9 as Client, aa as resolveUserAgentConfig, ab as resolveRetryConfig, ac as resolveRegionConfig, ad as resolveEndpointConfig, ae as resolveHostHeaderConfig, af as getUserAgentPlugin, ag as getRetryPlugin, ah as getContentLengthPlugin, ai as getHostHeaderPlugin, aj as getLoggerPlugin, ak as getRecursionDetectionPlugin, al as getHttpAuthSchemeEndpointRuleSetPlugin, am as DefaultIdentityProviderConfig, an as getHttpSigningPlugin, ao as ServiceException, ap as SENSITIVE_STRING, aE as parseXmlBody, aF as extendedEncodeURIComponent, H as HttpRequest, aG as parseXmlErrorBody, aw as withBaseException, ax as expectString, aH as strictParseInt32, ay as decorateServiceException, at as expectNonNull, aI as parseRfc3339DateTimeWithOffset, az as Command, aA as getSerdePlugin, aB as getEndpointPlugin, aD as createAggregatedClient, s as setCredentialFeature } from "./main-6LQ_pQZv.js";
import "os";
import "path";
import "crypto";
import { p as packageInfo } from "./package-BfxcYrET.js";
import "stream";
import "http2";
import { N as NoAuthSigner } from "./noAuth-DjsddSW4.js";
const defaultSTSHttpAuthSchemeParametersProvider = async (config, context, input) => {
  return {
    operation: getSmithyContext(context).operation,
    region: await normalizeProvider(config.region)() || (() => {
      throw new Error("expected `region` to be configured for `aws.auth#sigv4`");
    })()
  };
};
function createAwsAuthSigv4HttpAuthOption(authParameters) {
  return {
    schemeId: "aws.auth#sigv4",
    signingProperties: {
      name: "sts",
      region: authParameters.region
    },
    propertiesExtractor: (config, context) => ({
      signingProperties: {
        config,
        context
      }
    })
  };
}
function createSmithyApiNoAuthHttpAuthOption(authParameters) {
  return {
    schemeId: "smithy.api#noAuth"
  };
}
const defaultSTSHttpAuthSchemeProvider = (authParameters) => {
  const options = [];
  switch (authParameters.operation) {
    case "AssumeRoleWithWebIdentity": {
      options.push(createSmithyApiNoAuthHttpAuthOption());
      break;
    }
    default: {
      options.push(createAwsAuthSigv4HttpAuthOption(authParameters));
    }
  }
  return options;
};
const resolveStsAuthConfig = (input) => Object.assign(input, {
  stsClientCtor: STSClient
});
const resolveHttpAuthSchemeConfig = (config) => {
  const config_0 = resolveStsAuthConfig(config);
  const config_1 = resolveAwsSdkSigV4Config(config_0);
  return Object.assign(config_1, {
    authSchemePreference: normalizeProvider(config.authSchemePreference ?? [])
  });
};
const resolveClientEndpointParameters = (options) => {
  return Object.assign(options, {
    useDualstackEndpoint: options.useDualstackEndpoint ?? false,
    useFipsEndpoint: options.useFipsEndpoint ?? false,
    useGlobalEndpoint: options.useGlobalEndpoint ?? false,
    defaultSigningName: "sts"
  });
};
const commonParams = {
  UseGlobalEndpoint: { type: "builtInParams", name: "useGlobalEndpoint" },
  UseFIPS: { type: "builtInParams", name: "useFipsEndpoint" },
  Endpoint: { type: "builtInParams", name: "endpoint" },
  Region: { type: "builtInParams", name: "region" },
  UseDualStack: { type: "builtInParams", name: "useDualstackEndpoint" }
};
const F = "required", G = "type", H = "fn", I = "argv", J = "ref";
const a = false, b = true, c = "booleanEquals", d = "stringEquals", e = "sigv4", f = "sts", g = "us-east-1", h = "endpoint", i = "https://sts.{Region}.{PartitionResult#dnsSuffix}", j = "tree", k = "error", l = "getAttr", m = { [F]: false, [G]: "String" }, n = { [F]: true, "default": false, [G]: "Boolean" }, o = { [J]: "Endpoint" }, p = { [H]: "isSet", [I]: [{ [J]: "Region" }] }, q = { [J]: "Region" }, r = { [H]: "aws.partition", [I]: [q], "assign": "PartitionResult" }, s = { [J]: "UseFIPS" }, t = { [J]: "UseDualStack" }, u = { "url": "https://sts.amazonaws.com", "properties": { "authSchemes": [{ "name": e, "signingName": f, "signingRegion": g }] }, "headers": {} }, v = {}, w = { "conditions": [{ [H]: d, [I]: [q, "aws-global"] }], [h]: u, [G]: h }, x = { [H]: c, [I]: [s, true] }, y = { [H]: c, [I]: [t, true] }, z = { [H]: l, [I]: [{ [J]: "PartitionResult" }, "supportsFIPS"] }, A = { [J]: "PartitionResult" }, B = { [H]: c, [I]: [true, { [H]: l, [I]: [A, "supportsDualStack"] }] }, C = [{ [H]: "isSet", [I]: [o] }], D = [x], E = [y];
const _data = { parameters: { Region: m, UseDualStack: n, UseFIPS: n, Endpoint: m, UseGlobalEndpoint: n }, rules: [{ conditions: [{ [H]: c, [I]: [{ [J]: "UseGlobalEndpoint" }, b] }, { [H]: "not", [I]: C }, p, r, { [H]: c, [I]: [s, a] }, { [H]: c, [I]: [t, a] }], rules: [{ conditions: [{ [H]: d, [I]: [q, "ap-northeast-1"] }], endpoint: u, [G]: h }, { conditions: [{ [H]: d, [I]: [q, "ap-south-1"] }], endpoint: u, [G]: h }, { conditions: [{ [H]: d, [I]: [q, "ap-southeast-1"] }], endpoint: u, [G]: h }, { conditions: [{ [H]: d, [I]: [q, "ap-southeast-2"] }], endpoint: u, [G]: h }, w, { conditions: [{ [H]: d, [I]: [q, "ca-central-1"] }], endpoint: u, [G]: h }, { conditions: [{ [H]: d, [I]: [q, "eu-central-1"] }], endpoint: u, [G]: h }, { conditions: [{ [H]: d, [I]: [q, "eu-north-1"] }], endpoint: u, [G]: h }, { conditions: [{ [H]: d, [I]: [q, "eu-west-1"] }], endpoint: u, [G]: h }, { conditions: [{ [H]: d, [I]: [q, "eu-west-2"] }], endpoint: u, [G]: h }, { conditions: [{ [H]: d, [I]: [q, "eu-west-3"] }], endpoint: u, [G]: h }, { conditions: [{ [H]: d, [I]: [q, "sa-east-1"] }], endpoint: u, [G]: h }, { conditions: [{ [H]: d, [I]: [q, g] }], endpoint: u, [G]: h }, { conditions: [{ [H]: d, [I]: [q, "us-east-2"] }], endpoint: u, [G]: h }, { conditions: [{ [H]: d, [I]: [q, "us-west-1"] }], endpoint: u, [G]: h }, { conditions: [{ [H]: d, [I]: [q, "us-west-2"] }], endpoint: u, [G]: h }, { endpoint: { url: i, properties: { authSchemes: [{ name: e, signingName: f, signingRegion: "{Region}" }] }, headers: v }, [G]: h }], [G]: j }, { conditions: C, rules: [{ conditions: D, error: "Invalid Configuration: FIPS and custom endpoint are not supported", [G]: k }, { conditions: E, error: "Invalid Configuration: Dualstack and custom endpoint are not supported", [G]: k }, { endpoint: { url: o, properties: v, headers: v }, [G]: h }], [G]: j }, { conditions: [p], rules: [{ conditions: [r], rules: [{ conditions: [x, y], rules: [{ conditions: [{ [H]: c, [I]: [b, z] }, B], rules: [{ endpoint: { url: "https://sts-fips.{Region}.{PartitionResult#dualStackDnsSuffix}", properties: v, headers: v }, [G]: h }], [G]: j }, { error: "FIPS and DualStack are enabled, but this partition does not support one or both", [G]: k }], [G]: j }, { conditions: D, rules: [{ conditions: [{ [H]: c, [I]: [z, b] }], rules: [{ conditions: [{ [H]: d, [I]: [{ [H]: l, [I]: [A, "name"] }, "aws-us-gov"] }], endpoint: { url: "https://sts.{Region}.amazonaws.com", properties: v, headers: v }, [G]: h }, { endpoint: { url: "https://sts-fips.{Region}.{PartitionResult#dnsSuffix}", properties: v, headers: v }, [G]: h }], [G]: j }, { error: "FIPS is enabled but this partition does not support FIPS", [G]: k }], [G]: j }, { conditions: E, rules: [{ conditions: [B], rules: [{ endpoint: { url: "https://sts.{Region}.{PartitionResult#dualStackDnsSuffix}", properties: v, headers: v }, [G]: h }], [G]: j }, { error: "DualStack is enabled but this partition does not support DualStack", [G]: k }], [G]: j }, w, { endpoint: { url: i, properties: v, headers: v }, [G]: h }], [G]: j }], [G]: j }, { error: "Invalid Configuration: Missing Region", [G]: k }] };
const ruleSet = _data;
const cache = new EndpointCache({
  size: 50,
  params: ["Endpoint", "Region", "UseDualStack", "UseFIPS", "UseGlobalEndpoint"]
});
const defaultEndpointResolver = (endpointParams, context = {}) => {
  return cache.get(endpointParams, () => resolveEndpoint(ruleSet, {
    endpointParams,
    logger: context.logger
  }));
};
customEndpointFunctions.aws = awsEndpointFunctions;
const getRuntimeConfig$1 = (config) => {
  return {
    apiVersion: "2011-06-15",
    base64Decoder: (config == null ? void 0 : config.base64Decoder) ?? fromBase64,
    base64Encoder: (config == null ? void 0 : config.base64Encoder) ?? toBase64,
    disableHostPrefix: (config == null ? void 0 : config.disableHostPrefix) ?? false,
    endpointProvider: (config == null ? void 0 : config.endpointProvider) ?? defaultEndpointResolver,
    extensions: (config == null ? void 0 : config.extensions) ?? [],
    httpAuthSchemeProvider: (config == null ? void 0 : config.httpAuthSchemeProvider) ?? defaultSTSHttpAuthSchemeProvider,
    httpAuthSchemes: (config == null ? void 0 : config.httpAuthSchemes) ?? [
      {
        schemeId: "aws.auth#sigv4",
        identityProvider: (ipc) => ipc.getIdentityProvider("aws.auth#sigv4"),
        signer: new AwsSdkSigV4Signer()
      },
      {
        schemeId: "smithy.api#noAuth",
        identityProvider: (ipc) => ipc.getIdentityProvider("smithy.api#noAuth") || (async () => ({})),
        signer: new NoAuthSigner()
      }
    ],
    logger: (config == null ? void 0 : config.logger) ?? new NoOpLogger(),
    serviceId: (config == null ? void 0 : config.serviceId) ?? "STS",
    urlParser: (config == null ? void 0 : config.urlParser) ?? parseUrl,
    utf8Decoder: (config == null ? void 0 : config.utf8Decoder) ?? fromUtf8,
    utf8Encoder: (config == null ? void 0 : config.utf8Encoder) ?? toUtf8
  };
};
const getRuntimeConfig = (config) => {
  emitWarningIfUnsupportedVersion(process.version);
  const defaultsMode = resolveDefaultsModeConfig(config);
  const defaultConfigProvider = () => defaultsMode().then(loadConfigsForDefaultMode);
  const clientSharedValues = getRuntimeConfig$1(config);
  emitWarningIfUnsupportedVersion$1(process.version);
  const loaderConfig = {
    profile: config == null ? void 0 : config.profile,
    logger: clientSharedValues.logger
  };
  return {
    ...clientSharedValues,
    ...config,
    runtime: "node",
    defaultsMode,
    authSchemePreference: (config == null ? void 0 : config.authSchemePreference) ?? loadConfig(NODE_AUTH_SCHEME_PREFERENCE_OPTIONS, loaderConfig),
    bodyLengthChecker: (config == null ? void 0 : config.bodyLengthChecker) ?? calculateBodyLength,
    defaultUserAgentProvider: (config == null ? void 0 : config.defaultUserAgentProvider) ?? createDefaultUserAgentProvider({ serviceId: clientSharedValues.serviceId, clientVersion: packageInfo.version }),
    httpAuthSchemes: (config == null ? void 0 : config.httpAuthSchemes) ?? [
      {
        schemeId: "aws.auth#sigv4",
        identityProvider: (ipc) => ipc.getIdentityProvider("aws.auth#sigv4") || (async (idProps) => await config.credentialDefaultProvider((idProps == null ? void 0 : idProps.__config) || {})()),
        signer: new AwsSdkSigV4Signer()
      },
      {
        schemeId: "smithy.api#noAuth",
        identityProvider: (ipc) => ipc.getIdentityProvider("smithy.api#noAuth") || (async () => ({})),
        signer: new NoAuthSigner()
      }
    ],
    maxAttempts: (config == null ? void 0 : config.maxAttempts) ?? loadConfig(NODE_MAX_ATTEMPT_CONFIG_OPTIONS, config),
    region: (config == null ? void 0 : config.region) ?? loadConfig(NODE_REGION_CONFIG_OPTIONS, { ...NODE_REGION_CONFIG_FILE_OPTIONS, ...loaderConfig }),
    requestHandler: NodeHttpHandler.create((config == null ? void 0 : config.requestHandler) ?? defaultConfigProvider),
    retryMode: (config == null ? void 0 : config.retryMode) ?? loadConfig({
      ...NODE_RETRY_MODE_CONFIG_OPTIONS,
      default: async () => (await defaultConfigProvider()).retryMode || DEFAULT_RETRY_MODE
    }, config),
    sha256: (config == null ? void 0 : config.sha256) ?? Hash.bind(null, "sha256"),
    streamCollector: (config == null ? void 0 : config.streamCollector) ?? streamCollector,
    useDualstackEndpoint: (config == null ? void 0 : config.useDualstackEndpoint) ?? loadConfig(NODE_USE_DUALSTACK_ENDPOINT_CONFIG_OPTIONS, loaderConfig),
    useFipsEndpoint: (config == null ? void 0 : config.useFipsEndpoint) ?? loadConfig(NODE_USE_FIPS_ENDPOINT_CONFIG_OPTIONS, loaderConfig),
    userAgentAppId: (config == null ? void 0 : config.userAgentAppId) ?? loadConfig(NODE_APP_ID_CONFIG_OPTIONS, loaderConfig)
  };
};
const getHttpAuthExtensionConfiguration = (runtimeConfig) => {
  const _httpAuthSchemes = runtimeConfig.httpAuthSchemes;
  let _httpAuthSchemeProvider = runtimeConfig.httpAuthSchemeProvider;
  let _credentials = runtimeConfig.credentials;
  return {
    setHttpAuthScheme(httpAuthScheme) {
      const index = _httpAuthSchemes.findIndex((scheme) => scheme.schemeId === httpAuthScheme.schemeId);
      if (index === -1) {
        _httpAuthSchemes.push(httpAuthScheme);
      } else {
        _httpAuthSchemes.splice(index, 1, httpAuthScheme);
      }
    },
    httpAuthSchemes() {
      return _httpAuthSchemes;
    },
    setHttpAuthSchemeProvider(httpAuthSchemeProvider) {
      _httpAuthSchemeProvider = httpAuthSchemeProvider;
    },
    httpAuthSchemeProvider() {
      return _httpAuthSchemeProvider;
    },
    setCredentials(credentials) {
      _credentials = credentials;
    },
    credentials() {
      return _credentials;
    }
  };
};
const resolveHttpAuthRuntimeConfig = (config) => {
  return {
    httpAuthSchemes: config.httpAuthSchemes(),
    httpAuthSchemeProvider: config.httpAuthSchemeProvider(),
    credentials: config.credentials()
  };
};
const resolveRuntimeExtensions = (runtimeConfig, extensions) => {
  const extensionConfiguration = Object.assign(getAwsRegionExtensionConfiguration(runtimeConfig), getDefaultExtensionConfiguration(runtimeConfig), getHttpHandlerExtensionConfiguration(runtimeConfig), getHttpAuthExtensionConfiguration(runtimeConfig));
  extensions.forEach((extension) => extension.configure(extensionConfiguration));
  return Object.assign(runtimeConfig, resolveAwsRegionExtensionConfiguration(extensionConfiguration), resolveDefaultRuntimeConfig(extensionConfiguration), resolveHttpHandlerRuntimeConfig(extensionConfiguration), resolveHttpAuthRuntimeConfig(extensionConfiguration));
};
class STSClient extends Client {
  constructor(...[configuration]) {
    const _config_0 = getRuntimeConfig(configuration || {});
    super(_config_0);
    __publicField(this, "config");
    this.initConfig = _config_0;
    const _config_1 = resolveClientEndpointParameters(_config_0);
    const _config_2 = resolveUserAgentConfig(_config_1);
    const _config_3 = resolveRetryConfig(_config_2);
    const _config_4 = resolveRegionConfig(_config_3);
    const _config_5 = resolveHostHeaderConfig(_config_4);
    const _config_6 = resolveEndpointConfig(_config_5);
    const _config_7 = resolveHttpAuthSchemeConfig(_config_6);
    const _config_8 = resolveRuntimeExtensions(_config_7, (configuration == null ? void 0 : configuration.extensions) || []);
    this.config = _config_8;
    this.middlewareStack.use(getUserAgentPlugin(this.config));
    this.middlewareStack.use(getRetryPlugin(this.config));
    this.middlewareStack.use(getContentLengthPlugin(this.config));
    this.middlewareStack.use(getHostHeaderPlugin(this.config));
    this.middlewareStack.use(getLoggerPlugin(this.config));
    this.middlewareStack.use(getRecursionDetectionPlugin(this.config));
    this.middlewareStack.use(getHttpAuthSchemeEndpointRuleSetPlugin(this.config, {
      httpAuthSchemeParametersProvider: defaultSTSHttpAuthSchemeParametersProvider,
      identityProviderConfigProvider: async (config) => new DefaultIdentityProviderConfig({
        "aws.auth#sigv4": config.credentials
      })
    }));
    this.middlewareStack.use(getHttpSigningPlugin(this.config));
  }
  destroy() {
    super.destroy();
  }
}
class STSServiceException extends ServiceException {
  constructor(options) {
    super(options);
    Object.setPrototypeOf(this, STSServiceException.prototype);
  }
}
const CredentialsFilterSensitiveLog = (obj) => ({
  ...obj,
  ...obj.SecretAccessKey && { SecretAccessKey: SENSITIVE_STRING }
});
const AssumeRoleResponseFilterSensitiveLog = (obj) => ({
  ...obj,
  ...obj.Credentials && { Credentials: CredentialsFilterSensitiveLog(obj.Credentials) }
});
class ExpiredTokenException extends STSServiceException {
  constructor(opts) {
    super({
      name: "ExpiredTokenException",
      $fault: "client",
      ...opts
    });
    __publicField(this, "name", "ExpiredTokenException");
    __publicField(this, "$fault", "client");
    Object.setPrototypeOf(this, ExpiredTokenException.prototype);
  }
}
class MalformedPolicyDocumentException extends STSServiceException {
  constructor(opts) {
    super({
      name: "MalformedPolicyDocumentException",
      $fault: "client",
      ...opts
    });
    __publicField(this, "name", "MalformedPolicyDocumentException");
    __publicField(this, "$fault", "client");
    Object.setPrototypeOf(this, MalformedPolicyDocumentException.prototype);
  }
}
class PackedPolicyTooLargeException extends STSServiceException {
  constructor(opts) {
    super({
      name: "PackedPolicyTooLargeException",
      $fault: "client",
      ...opts
    });
    __publicField(this, "name", "PackedPolicyTooLargeException");
    __publicField(this, "$fault", "client");
    Object.setPrototypeOf(this, PackedPolicyTooLargeException.prototype);
  }
}
class RegionDisabledException extends STSServiceException {
  constructor(opts) {
    super({
      name: "RegionDisabledException",
      $fault: "client",
      ...opts
    });
    __publicField(this, "name", "RegionDisabledException");
    __publicField(this, "$fault", "client");
    Object.setPrototypeOf(this, RegionDisabledException.prototype);
  }
}
class IDPRejectedClaimException extends STSServiceException {
  constructor(opts) {
    super({
      name: "IDPRejectedClaimException",
      $fault: "client",
      ...opts
    });
    __publicField(this, "name", "IDPRejectedClaimException");
    __publicField(this, "$fault", "client");
    Object.setPrototypeOf(this, IDPRejectedClaimException.prototype);
  }
}
class InvalidIdentityTokenException extends STSServiceException {
  constructor(opts) {
    super({
      name: "InvalidIdentityTokenException",
      $fault: "client",
      ...opts
    });
    __publicField(this, "name", "InvalidIdentityTokenException");
    __publicField(this, "$fault", "client");
    Object.setPrototypeOf(this, InvalidIdentityTokenException.prototype);
  }
}
const AssumeRoleWithWebIdentityRequestFilterSensitiveLog = (obj) => ({
  ...obj,
  ...obj.WebIdentityToken && { WebIdentityToken: SENSITIVE_STRING }
});
const AssumeRoleWithWebIdentityResponseFilterSensitiveLog = (obj) => ({
  ...obj,
  ...obj.Credentials && { Credentials: CredentialsFilterSensitiveLog(obj.Credentials) }
});
class IDPCommunicationErrorException extends STSServiceException {
  constructor(opts) {
    super({
      name: "IDPCommunicationErrorException",
      $fault: "client",
      ...opts
    });
    __publicField(this, "name", "IDPCommunicationErrorException");
    __publicField(this, "$fault", "client");
    Object.setPrototypeOf(this, IDPCommunicationErrorException.prototype);
  }
}
const se_AssumeRoleCommand = async (input, context) => {
  const headers = SHARED_HEADERS;
  let body;
  body = buildFormUrlencodedString({
    ...se_AssumeRoleRequest(input),
    [_A]: _AR,
    [_V]: _
  });
  return buildHttpRpcRequest(context, headers, "/", void 0, body);
};
const se_AssumeRoleWithWebIdentityCommand = async (input, context) => {
  const headers = SHARED_HEADERS;
  let body;
  body = buildFormUrlencodedString({
    ...se_AssumeRoleWithWebIdentityRequest(input),
    [_A]: _ARWWI,
    [_V]: _
  });
  return buildHttpRpcRequest(context, headers, "/", void 0, body);
};
const de_AssumeRoleCommand = async (output, context) => {
  if (output.statusCode >= 300) {
    return de_CommandError(output, context);
  }
  const data = await parseXmlBody(output.body, context);
  let contents = {};
  contents = de_AssumeRoleResponse(data.AssumeRoleResult);
  const response = {
    $metadata: deserializeMetadata(output),
    ...contents
  };
  return response;
};
const de_AssumeRoleWithWebIdentityCommand = async (output, context) => {
  if (output.statusCode >= 300) {
    return de_CommandError(output, context);
  }
  const data = await parseXmlBody(output.body, context);
  let contents = {};
  contents = de_AssumeRoleWithWebIdentityResponse(data.AssumeRoleWithWebIdentityResult);
  const response = {
    $metadata: deserializeMetadata(output),
    ...contents
  };
  return response;
};
const de_CommandError = async (output, context) => {
  const parsedOutput = {
    ...output,
    body: await parseXmlErrorBody(output.body, context)
  };
  const errorCode = loadQueryErrorCode(output, parsedOutput.body);
  switch (errorCode) {
    case "ExpiredTokenException":
    case "com.amazonaws.sts#ExpiredTokenException":
      throw await de_ExpiredTokenExceptionRes(parsedOutput);
    case "MalformedPolicyDocument":
    case "com.amazonaws.sts#MalformedPolicyDocumentException":
      throw await de_MalformedPolicyDocumentExceptionRes(parsedOutput);
    case "PackedPolicyTooLarge":
    case "com.amazonaws.sts#PackedPolicyTooLargeException":
      throw await de_PackedPolicyTooLargeExceptionRes(parsedOutput);
    case "RegionDisabledException":
    case "com.amazonaws.sts#RegionDisabledException":
      throw await de_RegionDisabledExceptionRes(parsedOutput);
    case "IDPCommunicationError":
    case "com.amazonaws.sts#IDPCommunicationErrorException":
      throw await de_IDPCommunicationErrorExceptionRes(parsedOutput);
    case "IDPRejectedClaim":
    case "com.amazonaws.sts#IDPRejectedClaimException":
      throw await de_IDPRejectedClaimExceptionRes(parsedOutput);
    case "InvalidIdentityToken":
    case "com.amazonaws.sts#InvalidIdentityTokenException":
      throw await de_InvalidIdentityTokenExceptionRes(parsedOutput);
    default:
      const parsedBody = parsedOutput.body;
      return throwDefaultError({
        output,
        parsedBody: parsedBody.Error,
        errorCode
      });
  }
};
const de_ExpiredTokenExceptionRes = async (parsedOutput, context) => {
  const body = parsedOutput.body;
  const deserialized = de_ExpiredTokenException(body.Error);
  const exception = new ExpiredTokenException({
    $metadata: deserializeMetadata(parsedOutput),
    ...deserialized
  });
  return decorateServiceException(exception, body);
};
const de_IDPCommunicationErrorExceptionRes = async (parsedOutput, context) => {
  const body = parsedOutput.body;
  const deserialized = de_IDPCommunicationErrorException(body.Error);
  const exception = new IDPCommunicationErrorException({
    $metadata: deserializeMetadata(parsedOutput),
    ...deserialized
  });
  return decorateServiceException(exception, body);
};
const de_IDPRejectedClaimExceptionRes = async (parsedOutput, context) => {
  const body = parsedOutput.body;
  const deserialized = de_IDPRejectedClaimException(body.Error);
  const exception = new IDPRejectedClaimException({
    $metadata: deserializeMetadata(parsedOutput),
    ...deserialized
  });
  return decorateServiceException(exception, body);
};
const de_InvalidIdentityTokenExceptionRes = async (parsedOutput, context) => {
  const body = parsedOutput.body;
  const deserialized = de_InvalidIdentityTokenException(body.Error);
  const exception = new InvalidIdentityTokenException({
    $metadata: deserializeMetadata(parsedOutput),
    ...deserialized
  });
  return decorateServiceException(exception, body);
};
const de_MalformedPolicyDocumentExceptionRes = async (parsedOutput, context) => {
  const body = parsedOutput.body;
  const deserialized = de_MalformedPolicyDocumentException(body.Error);
  const exception = new MalformedPolicyDocumentException({
    $metadata: deserializeMetadata(parsedOutput),
    ...deserialized
  });
  return decorateServiceException(exception, body);
};
const de_PackedPolicyTooLargeExceptionRes = async (parsedOutput, context) => {
  const body = parsedOutput.body;
  const deserialized = de_PackedPolicyTooLargeException(body.Error);
  const exception = new PackedPolicyTooLargeException({
    $metadata: deserializeMetadata(parsedOutput),
    ...deserialized
  });
  return decorateServiceException(exception, body);
};
const de_RegionDisabledExceptionRes = async (parsedOutput, context) => {
  const body = parsedOutput.body;
  const deserialized = de_RegionDisabledException(body.Error);
  const exception = new RegionDisabledException({
    $metadata: deserializeMetadata(parsedOutput),
    ...deserialized
  });
  return decorateServiceException(exception, body);
};
const se_AssumeRoleRequest = (input, context) => {
  var _a2, _b, _c, _d;
  const entries = {};
  if (input[_RA] != null) {
    entries[_RA] = input[_RA];
  }
  if (input[_RSN] != null) {
    entries[_RSN] = input[_RSN];
  }
  if (input[_PA] != null) {
    const memberEntries = se_policyDescriptorListType(input[_PA]);
    if (((_a2 = input[_PA]) == null ? void 0 : _a2.length) === 0) {
      entries.PolicyArns = [];
    }
    Object.entries(memberEntries).forEach(([key, value]) => {
      const loc = `PolicyArns.${key}`;
      entries[loc] = value;
    });
  }
  if (input[_P] != null) {
    entries[_P] = input[_P];
  }
  if (input[_DS] != null) {
    entries[_DS] = input[_DS];
  }
  if (input[_T] != null) {
    const memberEntries = se_tagListType(input[_T]);
    if (((_b = input[_T]) == null ? void 0 : _b.length) === 0) {
      entries.Tags = [];
    }
    Object.entries(memberEntries).forEach(([key, value]) => {
      const loc = `Tags.${key}`;
      entries[loc] = value;
    });
  }
  if (input[_TTK] != null) {
    const memberEntries = se_tagKeyListType(input[_TTK]);
    if (((_c = input[_TTK]) == null ? void 0 : _c.length) === 0) {
      entries.TransitiveTagKeys = [];
    }
    Object.entries(memberEntries).forEach(([key, value]) => {
      const loc = `TransitiveTagKeys.${key}`;
      entries[loc] = value;
    });
  }
  if (input[_EI] != null) {
    entries[_EI] = input[_EI];
  }
  if (input[_SN] != null) {
    entries[_SN] = input[_SN];
  }
  if (input[_TC] != null) {
    entries[_TC] = input[_TC];
  }
  if (input[_SI] != null) {
    entries[_SI] = input[_SI];
  }
  if (input[_PC] != null) {
    const memberEntries = se_ProvidedContextsListType(input[_PC]);
    if (((_d = input[_PC]) == null ? void 0 : _d.length) === 0) {
      entries.ProvidedContexts = [];
    }
    Object.entries(memberEntries).forEach(([key, value]) => {
      const loc = `ProvidedContexts.${key}`;
      entries[loc] = value;
    });
  }
  return entries;
};
const se_AssumeRoleWithWebIdentityRequest = (input, context) => {
  var _a2;
  const entries = {};
  if (input[_RA] != null) {
    entries[_RA] = input[_RA];
  }
  if (input[_RSN] != null) {
    entries[_RSN] = input[_RSN];
  }
  if (input[_WIT] != null) {
    entries[_WIT] = input[_WIT];
  }
  if (input[_PI] != null) {
    entries[_PI] = input[_PI];
  }
  if (input[_PA] != null) {
    const memberEntries = se_policyDescriptorListType(input[_PA]);
    if (((_a2 = input[_PA]) == null ? void 0 : _a2.length) === 0) {
      entries.PolicyArns = [];
    }
    Object.entries(memberEntries).forEach(([key, value]) => {
      const loc = `PolicyArns.${key}`;
      entries[loc] = value;
    });
  }
  if (input[_P] != null) {
    entries[_P] = input[_P];
  }
  if (input[_DS] != null) {
    entries[_DS] = input[_DS];
  }
  return entries;
};
const se_policyDescriptorListType = (input, context) => {
  const entries = {};
  let counter = 1;
  for (const entry of input) {
    if (entry === null) {
      continue;
    }
    const memberEntries = se_PolicyDescriptorType(entry);
    Object.entries(memberEntries).forEach(([key, value]) => {
      entries[`member.${counter}.${key}`] = value;
    });
    counter++;
  }
  return entries;
};
const se_PolicyDescriptorType = (input, context) => {
  const entries = {};
  if (input[_a] != null) {
    entries[_a] = input[_a];
  }
  return entries;
};
const se_ProvidedContext = (input, context) => {
  const entries = {};
  if (input[_PAr] != null) {
    entries[_PAr] = input[_PAr];
  }
  if (input[_CA] != null) {
    entries[_CA] = input[_CA];
  }
  return entries;
};
const se_ProvidedContextsListType = (input, context) => {
  const entries = {};
  let counter = 1;
  for (const entry of input) {
    if (entry === null) {
      continue;
    }
    const memberEntries = se_ProvidedContext(entry);
    Object.entries(memberEntries).forEach(([key, value]) => {
      entries[`member.${counter}.${key}`] = value;
    });
    counter++;
  }
  return entries;
};
const se_Tag = (input, context) => {
  const entries = {};
  if (input[_K] != null) {
    entries[_K] = input[_K];
  }
  if (input[_Va] != null) {
    entries[_Va] = input[_Va];
  }
  return entries;
};
const se_tagKeyListType = (input, context) => {
  const entries = {};
  let counter = 1;
  for (const entry of input) {
    if (entry === null) {
      continue;
    }
    entries[`member.${counter}`] = entry;
    counter++;
  }
  return entries;
};
const se_tagListType = (input, context) => {
  const entries = {};
  let counter = 1;
  for (const entry of input) {
    if (entry === null) {
      continue;
    }
    const memberEntries = se_Tag(entry);
    Object.entries(memberEntries).forEach(([key, value]) => {
      entries[`member.${counter}.${key}`] = value;
    });
    counter++;
  }
  return entries;
};
const de_AssumedRoleUser = (output, context) => {
  const contents = {};
  if (output[_ARI] != null) {
    contents[_ARI] = expectString(output[_ARI]);
  }
  if (output[_Ar] != null) {
    contents[_Ar] = expectString(output[_Ar]);
  }
  return contents;
};
const de_AssumeRoleResponse = (output, context) => {
  const contents = {};
  if (output[_C] != null) {
    contents[_C] = de_Credentials(output[_C]);
  }
  if (output[_ARU] != null) {
    contents[_ARU] = de_AssumedRoleUser(output[_ARU]);
  }
  if (output[_PPS] != null) {
    contents[_PPS] = strictParseInt32(output[_PPS]);
  }
  if (output[_SI] != null) {
    contents[_SI] = expectString(output[_SI]);
  }
  return contents;
};
const de_AssumeRoleWithWebIdentityResponse = (output, context) => {
  const contents = {};
  if (output[_C] != null) {
    contents[_C] = de_Credentials(output[_C]);
  }
  if (output[_SFWIT] != null) {
    contents[_SFWIT] = expectString(output[_SFWIT]);
  }
  if (output[_ARU] != null) {
    contents[_ARU] = de_AssumedRoleUser(output[_ARU]);
  }
  if (output[_PPS] != null) {
    contents[_PPS] = strictParseInt32(output[_PPS]);
  }
  if (output[_Pr] != null) {
    contents[_Pr] = expectString(output[_Pr]);
  }
  if (output[_Au] != null) {
    contents[_Au] = expectString(output[_Au]);
  }
  if (output[_SI] != null) {
    contents[_SI] = expectString(output[_SI]);
  }
  return contents;
};
const de_Credentials = (output, context) => {
  const contents = {};
  if (output[_AKI] != null) {
    contents[_AKI] = expectString(output[_AKI]);
  }
  if (output[_SAK] != null) {
    contents[_SAK] = expectString(output[_SAK]);
  }
  if (output[_ST] != null) {
    contents[_ST] = expectString(output[_ST]);
  }
  if (output[_E] != null) {
    contents[_E] = expectNonNull(parseRfc3339DateTimeWithOffset(output[_E]));
  }
  return contents;
};
const de_ExpiredTokenException = (output, context) => {
  const contents = {};
  if (output[_m] != null) {
    contents[_m] = expectString(output[_m]);
  }
  return contents;
};
const de_IDPCommunicationErrorException = (output, context) => {
  const contents = {};
  if (output[_m] != null) {
    contents[_m] = expectString(output[_m]);
  }
  return contents;
};
const de_IDPRejectedClaimException = (output, context) => {
  const contents = {};
  if (output[_m] != null) {
    contents[_m] = expectString(output[_m]);
  }
  return contents;
};
const de_InvalidIdentityTokenException = (output, context) => {
  const contents = {};
  if (output[_m] != null) {
    contents[_m] = expectString(output[_m]);
  }
  return contents;
};
const de_MalformedPolicyDocumentException = (output, context) => {
  const contents = {};
  if (output[_m] != null) {
    contents[_m] = expectString(output[_m]);
  }
  return contents;
};
const de_PackedPolicyTooLargeException = (output, context) => {
  const contents = {};
  if (output[_m] != null) {
    contents[_m] = expectString(output[_m]);
  }
  return contents;
};
const de_RegionDisabledException = (output, context) => {
  const contents = {};
  if (output[_m] != null) {
    contents[_m] = expectString(output[_m]);
  }
  return contents;
};
const deserializeMetadata = (output) => ({
  httpStatusCode: output.statusCode,
  requestId: output.headers["x-amzn-requestid"] ?? output.headers["x-amzn-request-id"] ?? output.headers["x-amz-request-id"],
  extendedRequestId: output.headers["x-amz-id-2"],
  cfId: output.headers["x-amz-cf-id"]
});
const throwDefaultError = withBaseException(STSServiceException);
const buildHttpRpcRequest = async (context, headers, path, resolvedHostname, body) => {
  const { hostname, protocol = "https", port, path: basePath } = await context.endpoint();
  const contents = {
    protocol,
    hostname,
    port,
    method: "POST",
    path: basePath.endsWith("/") ? basePath.slice(0, -1) + path : basePath + path,
    headers
  };
  if (body !== void 0) {
    contents.body = body;
  }
  return new HttpRequest(contents);
};
const SHARED_HEADERS = {
  "content-type": "application/x-www-form-urlencoded"
};
const _ = "2011-06-15";
const _A = "Action";
const _AKI = "AccessKeyId";
const _AR = "AssumeRole";
const _ARI = "AssumedRoleId";
const _ARU = "AssumedRoleUser";
const _ARWWI = "AssumeRoleWithWebIdentity";
const _Ar = "Arn";
const _Au = "Audience";
const _C = "Credentials";
const _CA = "ContextAssertion";
const _DS = "DurationSeconds";
const _E = "Expiration";
const _EI = "ExternalId";
const _K = "Key";
const _P = "Policy";
const _PA = "PolicyArns";
const _PAr = "ProviderArn";
const _PC = "ProvidedContexts";
const _PI = "ProviderId";
const _PPS = "PackedPolicySize";
const _Pr = "Provider";
const _RA = "RoleArn";
const _RSN = "RoleSessionName";
const _SAK = "SecretAccessKey";
const _SFWIT = "SubjectFromWebIdentityToken";
const _SI = "SourceIdentity";
const _SN = "SerialNumber";
const _ST = "SessionToken";
const _T = "Tags";
const _TC = "TokenCode";
const _TTK = "TransitiveTagKeys";
const _V = "Version";
const _Va = "Value";
const _WIT = "WebIdentityToken";
const _a = "arn";
const _m = "message";
const buildFormUrlencodedString = (formEntries) => Object.entries(formEntries).map(([key, value]) => extendedEncodeURIComponent(key) + "=" + extendedEncodeURIComponent(value)).join("&");
const loadQueryErrorCode = (output, data) => {
  var _a2;
  if (((_a2 = data.Error) == null ? void 0 : _a2.Code) !== void 0) {
    return data.Error.Code;
  }
  if (output.statusCode == 404) {
    return "NotFound";
  }
};
class AssumeRoleCommand extends Command.classBuilder().ep(commonParams).m(function(Command2, cs, config, o2) {
  return [
    getSerdePlugin(config, this.serialize, this.deserialize),
    getEndpointPlugin(config, Command2.getEndpointParameterInstructions())
  ];
}).s("AWSSecurityTokenServiceV20110615", "AssumeRole", {}).n("STSClient", "AssumeRoleCommand").f(void 0, AssumeRoleResponseFilterSensitiveLog).ser(se_AssumeRoleCommand).de(de_AssumeRoleCommand).build() {
}
class AssumeRoleWithWebIdentityCommand extends Command.classBuilder().ep(commonParams).m(function(Command2, cs, config, o2) {
  return [
    getSerdePlugin(config, this.serialize, this.deserialize),
    getEndpointPlugin(config, Command2.getEndpointParameterInstructions())
  ];
}).s("AWSSecurityTokenServiceV20110615", "AssumeRoleWithWebIdentity", {}).n("STSClient", "AssumeRoleWithWebIdentityCommand").f(AssumeRoleWithWebIdentityRequestFilterSensitiveLog, AssumeRoleWithWebIdentityResponseFilterSensitiveLog).ser(se_AssumeRoleWithWebIdentityCommand).de(de_AssumeRoleWithWebIdentityCommand).build() {
}
const commands = {
  AssumeRoleCommand,
  AssumeRoleWithWebIdentityCommand
};
class STS extends STSClient {
}
createAggregatedClient(commands, STS);
const ASSUME_ROLE_DEFAULT_REGION = "us-east-1";
const getAccountIdFromAssumedRoleUser = (assumedRoleUser) => {
  if (typeof (assumedRoleUser == null ? void 0 : assumedRoleUser.Arn) === "string") {
    const arnComponents = assumedRoleUser.Arn.split(":");
    if (arnComponents.length > 4 && arnComponents[4] !== "") {
      return arnComponents[4];
    }
  }
  return void 0;
};
const resolveRegion = async (_region, _parentRegion, credentialProviderLogger) => {
  var _a2;
  const region = typeof _region === "function" ? await _region() : _region;
  const parentRegion = typeof _parentRegion === "function" ? await _parentRegion() : _parentRegion;
  (_a2 = credentialProviderLogger == null ? void 0 : credentialProviderLogger.debug) == null ? void 0 : _a2.call(credentialProviderLogger, "@aws-sdk/client-sts::resolveRegion", "accepting first of:", `${region} (provider)`, `${parentRegion} (parent client)`, `${ASSUME_ROLE_DEFAULT_REGION} (STS default)`);
  return region ?? parentRegion ?? ASSUME_ROLE_DEFAULT_REGION;
};
const getDefaultRoleAssumer$1 = (stsOptions, STSClient2) => {
  let stsClient;
  let closureSourceCreds;
  return async (sourceCreds, params) => {
    var _a2, _b, _c, _d;
    closureSourceCreds = sourceCreds;
    if (!stsClient) {
      const { logger = (_a2 = stsOptions == null ? void 0 : stsOptions.parentClientConfig) == null ? void 0 : _a2.logger, region, requestHandler = (_b = stsOptions == null ? void 0 : stsOptions.parentClientConfig) == null ? void 0 : _b.requestHandler, credentialProviderLogger } = stsOptions;
      const resolvedRegion = await resolveRegion(region, (_c = stsOptions == null ? void 0 : stsOptions.parentClientConfig) == null ? void 0 : _c.region, credentialProviderLogger);
      const isCompatibleRequestHandler = !isH2(requestHandler);
      stsClient = new STSClient2({
        profile: (_d = stsOptions == null ? void 0 : stsOptions.parentClientConfig) == null ? void 0 : _d.profile,
        credentialDefaultProvider: () => async () => closureSourceCreds,
        region: resolvedRegion,
        requestHandler: isCompatibleRequestHandler ? requestHandler : void 0,
        logger
      });
    }
    const { Credentials, AssumedRoleUser } = await stsClient.send(new AssumeRoleCommand(params));
    if (!Credentials || !Credentials.AccessKeyId || !Credentials.SecretAccessKey) {
      throw new Error(`Invalid response from STS.assumeRole call with role ${params.RoleArn}`);
    }
    const accountId = getAccountIdFromAssumedRoleUser(AssumedRoleUser);
    const credentials = {
      accessKeyId: Credentials.AccessKeyId,
      secretAccessKey: Credentials.SecretAccessKey,
      sessionToken: Credentials.SessionToken,
      expiration: Credentials.Expiration,
      ...Credentials.CredentialScope && { credentialScope: Credentials.CredentialScope },
      ...accountId && { accountId }
    };
    setCredentialFeature(credentials, "CREDENTIALS_STS_ASSUME_ROLE", "i");
    return credentials;
  };
};
const getDefaultRoleAssumerWithWebIdentity$1 = (stsOptions, STSClient2) => {
  let stsClient;
  return async (params) => {
    var _a2, _b, _c, _d;
    if (!stsClient) {
      const { logger = (_a2 = stsOptions == null ? void 0 : stsOptions.parentClientConfig) == null ? void 0 : _a2.logger, region, requestHandler = (_b = stsOptions == null ? void 0 : stsOptions.parentClientConfig) == null ? void 0 : _b.requestHandler, credentialProviderLogger } = stsOptions;
      const resolvedRegion = await resolveRegion(region, (_c = stsOptions == null ? void 0 : stsOptions.parentClientConfig) == null ? void 0 : _c.region, credentialProviderLogger);
      const isCompatibleRequestHandler = !isH2(requestHandler);
      stsClient = new STSClient2({
        profile: (_d = stsOptions == null ? void 0 : stsOptions.parentClientConfig) == null ? void 0 : _d.profile,
        region: resolvedRegion,
        requestHandler: isCompatibleRequestHandler ? requestHandler : void 0,
        logger
      });
    }
    const { Credentials, AssumedRoleUser } = await stsClient.send(new AssumeRoleWithWebIdentityCommand(params));
    if (!Credentials || !Credentials.AccessKeyId || !Credentials.SecretAccessKey) {
      throw new Error(`Invalid response from STS.assumeRoleWithWebIdentity call with role ${params.RoleArn}`);
    }
    const accountId = getAccountIdFromAssumedRoleUser(AssumedRoleUser);
    const credentials = {
      accessKeyId: Credentials.AccessKeyId,
      secretAccessKey: Credentials.SecretAccessKey,
      sessionToken: Credentials.SessionToken,
      expiration: Credentials.Expiration,
      ...Credentials.CredentialScope && { credentialScope: Credentials.CredentialScope },
      ...accountId && { accountId }
    };
    if (accountId) {
      setCredentialFeature(credentials, "RESOLVED_ACCOUNT_ID", "T");
    }
    setCredentialFeature(credentials, "CREDENTIALS_STS_ASSUME_ROLE_WEB_ID", "k");
    return credentials;
  };
};
const isH2 = (requestHandler) => {
  var _a2;
  return ((_a2 = requestHandler == null ? void 0 : requestHandler.metadata) == null ? void 0 : _a2.handlerProtocol) === "h2";
};
const getCustomizableStsClientCtor = (baseCtor, customizations) => {
  if (!customizations)
    return baseCtor;
  else
    return class CustomizableSTSClient extends baseCtor {
      constructor(config) {
        super(config);
        for (const customization of customizations) {
          this.middlewareStack.use(customization);
        }
      }
    };
};
const getDefaultRoleAssumer = (stsOptions = {}, stsPlugins) => getDefaultRoleAssumer$1(stsOptions, getCustomizableStsClientCtor(STSClient, stsPlugins));
const getDefaultRoleAssumerWithWebIdentity = (stsOptions = {}, stsPlugins) => getDefaultRoleAssumerWithWebIdentity$1(stsOptions, getCustomizableStsClientCtor(STSClient, stsPlugins));
export {
  Command as $Command,
  AssumeRoleCommand,
  AssumeRoleResponseFilterSensitiveLog,
  AssumeRoleWithWebIdentityCommand,
  AssumeRoleWithWebIdentityRequestFilterSensitiveLog,
  AssumeRoleWithWebIdentityResponseFilterSensitiveLog,
  CredentialsFilterSensitiveLog,
  ExpiredTokenException,
  IDPCommunicationErrorException,
  IDPRejectedClaimException,
  InvalidIdentityTokenException,
  MalformedPolicyDocumentException,
  PackedPolicyTooLargeException,
  RegionDisabledException,
  STS,
  STSClient,
  STSServiceException,
  Client as __Client,
  getDefaultRoleAssumer,
  getDefaultRoleAssumerWithWebIdentity
};
