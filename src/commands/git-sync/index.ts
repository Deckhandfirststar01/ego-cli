/**
 * This file is part of the ego-cli distribution.
 * Copyright (c) e.GO Digital GmbH, Aachen, Germany (https://www.e-go-digital.com/)
 *
 * ego-cli is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Lesser General Public License as
 * published by the Free Software Foundation, version 3.
 *
 * ego-cli is distributed in the hope that it will be useful, but
 * WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU
 * Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public License
 * along with this program. If not, see <http://www.gnu.org/licenses/>.
 */

import * as _ from 'lodash';
import { CommandBase, CommandExecuteContext } from '../../contracts';
import { getGitRemotes } from '../../git';
import { spawn, withSpinner, writeLine } from '../../util';


/**
 * Git-Sync command.
 */
export class EgoCommand extends CommandBase {
    /** @inheritdoc */
    public readonly description = 'Syncs the current branch with all remotes.';

    /** @inheritdoc */
    public async execute(ctx: CommandExecuteContext): Promise<void> {
        let remotes: string[];
        withSpinner('Loading remotes ...', (spinner) => {
            remotes = getGitRemotes();
            spinner.text = remotes.length + ' remote(s) found';
        });

        for (let i = 0; i < remotes.length; i++) {
            const R = remotes[i];

            withSpinner(`Syncing with '${R}' (${i + 1} / ${remotes.length}) ...`, (spinner) => {
                spinner.text = `Pulling from '${R}' (${i + 1} / ${remotes.length}) ...`;
                spawn('git', ['pull', R], {
                    stdio: null,
                });

                spinner.text = `Pushing to '${R}' (${i + 1} / ${remotes.length}) ...`
                spawn('git', ['push', R], {
                    stdio: null,
                });

                spinner.text = `Synced with '${R}' (${i + 1} / ${remotes.length})`;
            });
        }

        withSpinner('Finishing ...', (spinner) => {
            spinner.text = 'Done';
        });
    }

    /** @inheritdoc */
    public async showHelp(): Promise<void> {
        writeLine('Example:    ego git-sync');
    }
}
