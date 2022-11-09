#!/usr/bin/env node

import * as git from './git';
import { loadConfig } from './config';
import { error, log } from './log';

// eslint-disable-next-line @typescript-eslint/no-floating-promises
(async (): Promise<void> => {
  log('start');

  try {
    const config = await loadConfig();
    const gitRoot = git.getRoot(config.gitRoot);
    const branch = git.getBranchName(gitRoot);

    const ignored = new RegExp(config.ignoredBranchesPattern || '^$', 'i');

    if (ignored.test(branch)) {
      log('The branch is ignored by the configuration rule');
      return;
    }

    const ticket = git.getTicket(branch, config);

    if (ticket === null) {
      if (config.ignoreBranchesMissingTickets) {
        log('SKIP: The branch does not contain a ticket and is ignored by the configuration rule');
      } else {
        error('The ticket ID not found');
      }

      return;
    }

    log(`The ticket ID is: ${ticket}`);

    git.writeTicket(ticket, config);
  } catch (err: unknown) {
    if (typeof err === 'string') {
      error(err);
    } else {
      error(String(err));
    }
  }

  log('done');
})();
