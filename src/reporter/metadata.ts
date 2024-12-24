import { spawnSync } from 'node:child_process';
import { randomUUID } from 'node:crypto';

const GIT_OPERATIONS_TIMEOUT_MS = 1500;

interface Metadata {
  'revision.id': string;
  'revision.author': string;
  'revision.email': string;
  'revision.subject': string;
  'revision.timestamp': number;
}

function gitStatus(
  directory: string = process.cwd(),
  options: {
    timeout?: number;
  } = { timeout: GIT_OPERATIONS_TIMEOUT_MS },
): Metadata | undefined {
  const separator = `:${randomUUID().slice(0, 4)}:`;
  const { status, stdout } = spawnSync(
    'git',
    [
      'show',
      '-s',
      `--format=%H${separator}%s${separator}%an${separator}%ae${separator}%ct`,
      'HEAD',
    ],
    { stdio: 'pipe', cwd: directory, timeout: options?.timeout },
  );
  if (status) {
    return;
  }
  const showOutput = stdout.toString().trim();
  const [id, subject, author, email, rawTimestamp] = showOutput.split(separator);
  let timestamp: number = Number.parseInt(rawTimestamp, 10);
  timestamp = Number.isInteger(timestamp) ? timestamp * 1000 : 0;

  return {
    'revision.id': id,
    'revision.author': author,
    'revision.email': email,
    'revision.subject': subject,
    'revision.timestamp': timestamp,
  };
}

export { gitStatus };
