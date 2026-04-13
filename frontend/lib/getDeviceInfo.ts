import { UAParser } from "ua-parser-js";

export const getDeviceInfo = () => {
  const parser = new UAParser();
  const result = parser.getResult();

  const deviceName =
    result.device.vendor && result.device.model
      ? `${result.device.vendor} ${result.device.model}`
      : result.device.type === "mobile"
        ? `${result.os.name} Mobile`
        : `${result.os.name} Desktop`;

  return {
    deviceName,
    browserName: result.browser.name,
    browserVersion: result.browser.version,
    os: result.os.name,
    osVersion: result.os.version,
    deviceType: result.device.type || "desktop",
  };
};
