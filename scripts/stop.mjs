import { port, projectId, stopPath } from './preview-config.mjs';

try {
  const response = await fetch(`http://127.0.0.1:${port}${stopPath}`, {
    method: 'POST',
    headers: { 'X-Preview-Project': projectId },
    signal: AbortSignal.timeout(5000),
  });
  if (!response.ok) {
    throw new Error(`Server on port ${port} rejected the stop request (HTTP ${response.status}). Check the port and restart older preview servers with Ctrl+C.`);
  }
  console.log(await response.text());
} catch (error) {
  if (error.cause?.code === 'ECONNREFUSED') {
    console.log(`No preview server is running on port ${port}.`);
  } else {
    console.error(`Unable to stop preview: ${error.message}`);
    process.exitCode = 1;
  }
}
