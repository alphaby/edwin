let config: Record<string, any> = {};

export default () => {
  return config;
};

export function setConfig(configValue: any): void {
  config = { ...config, ...configValue };
}
