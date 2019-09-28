export function getIntegrationTestApiUri(): string {
  const port = process.env.PORT || 3000;
  return `http://localhost:${port}/api`;
}
